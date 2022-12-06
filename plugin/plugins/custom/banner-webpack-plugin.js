// 作用：production会自动去除注释，这个plugin是在production中给打包输出文件添加注释。

// 开发思路:

// 需要打包输出前添加注释：需要使用 compiler.hooks.emit 钩子, 它是打包输出前触发。
// 如何获取打包输出的资源？compilation.assets 可以获取所有即将输出的资源文件。
class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'BannerWebpackPlugin',
      (compilation, callback) => {
        // 1. 获取即将输出的资源compilation.assets
        // 2. 过滤只保留js和css，因为我们只在js和css上加作者注释
        const extensions = ['js', 'css'];
        // assets的key是路径：xxx/xxx/xxx.js，xxx/xxx/xxx.css
        const assetPaths = Object.keys(compilation.assets).filter((path) => {
          // 将路径切割['xxx/xxx/xxx', 'js'],['xxx/xxx/xxx', 'css'],
          const splitted = path.split('.');
          // 判断是否符合
          return extensions.includes(splitted[splitted.length - 1]);
        });

        // 3. 遍历保留的这些资源，添加注释
        assetPaths.forEach((assetPath) => {
          const asset = compilation.assets[assetPath];

          const source = `/*
* Author: ${this.options.author}
*/\n${asset.source()}`;

          // 覆盖原资源
          compilation.assets[assetPath] = {
            // 最终资源输出时，调用source方法，它的返回值就是资源的具体内容
            source() {
              return source;
            },
            // 资源大小
            size() {
              return source.length;
            },
          };
        });

        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
