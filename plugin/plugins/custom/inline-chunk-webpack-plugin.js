// 作用：webpack 打包生成的 runtime 文件太小了，额外发送请求性能不好，所以需要将其内联到 js 中，从而减少请求数量。
// 开发思路:
//  我们需要借助 html-webpack-plugin 来实现
//  在 html-webpack-plugin 输出 index.html 前将内联 runtime 注入进去
//  删除多余的 runtime 文件
//  如何操作 html-webpack-plugin?

const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlineChunkWebpackPlugin {
  constructor(runtimeNames) {
    this.runtimeNames = runtimeNames;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      'InlineChunkWebpackPlugin',
      (compilation) => {
        // 1. 获取HtmlWebpackPlugin的hooks
        const hooks = HtmlWebpackPlugin.getHooks(compilation);
        // 2. 注册alterAssetTagGroups到hooks
        hooks.alterAssetTagGroups.tap('InlineChunkWebpackPlugin', (assets) => {
          assets.headTags = this.getInlineTag(
            assets.headTags,
            compilation.assets
          );
          assets.bodyTags = this.getInlineTag(
            assets.bodyTags,
            compilation.assets
          );
        });

        // 3. 删除runtime文件
        hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
          Object.keys(compilation.assets).forEach((assetName) => {
            if (this.runtimeNames.some((test) => assetName.match(test))) {
              delete compilation.assets[assetName];
            }
          });
        });
      }
    );
  }

  // [
  //  {
  //   tagName: 'script',
  //   voidTag: false,
  //   meta: { plugin: 'html-webpack-plugin' },
  //   attributes: { defer: true, type: undefined, src: 'js/runtime~main.js' }
  //  }
  // ]

  // 改为

  // [
  //  {
  //   tagName: 'script',
  //   closeTag: true,
  //   innerHTML: runtime文件的内容
  //  }
  // ]

  getInlineTag(tags, assets) {
    return tags.map((tag) => {
      if (tag.tagName !== 'script') return tag;
      // 获取文件资源路径
      const scriptName = tag.attributes.src;

      if (!this.runtimeNames.some((name) => scriptName.match(name))) return tag;

      return {
        tagName: 'script',
        innerHTML: assets[scriptName].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
