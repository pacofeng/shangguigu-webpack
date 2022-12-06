// 作用：在 webpack 打包输出前将上次打包内容清空。

// 开发思路：

// 如何在打包输出前执行？需要使用 compiler.hooks.emit 钩子, 它是打包输出前触发。
// 如何清空上次打包内容？
// 获取打包输出目录：通过 compiler 对象。
// 通过文件操作清空内容：通过 compiler.outputFileSystem 操作文件。

class CleanWebpackPlugin {
  apply(compiler) {
    // 获取打包输出的目录
    const outputPath = compiler.options.output.path;
    // 获取操作文件的对象
    const fs = compiler.outputFileSystem;
    compiler.hooks.emit.tapAsync(
      'CleanWebpackPlugin',
      (compilation, callback) => {
        // 遍历去删除目录所有文件
        const err = this.removeFiles(fs, outputPath);
        callback(err);
      }
    );
  }

  removeFiles(fs, filePath) {
    try {
      // 1. 读取当前目录所有资源
      const files = fs.readdirSync(filePath);
      // 2. 遍历一个一个删除，判断是文件夹还是文件
      files.forEach((fileName) => {
        // 获取文件完整路径
        const fullPath = `${filePath}/${fileName}`;
        // 分析文件
        const fileStat = fs.statSync(fullPath);
        // 判断是否是文件夹
        if (fileStat.isDirectory()) {
          // 是文件夹需要递归遍历删除下面所有文件
          this.removeFiles(fs, fullPath);
        } else {
          // 不是文件夹就是文件，直接删除
          fs.unlinkSync(fullPath);
        }
      });

      // 最后删除当前目录
      fs.rmdirSync(filePath);
    } catch (e) {
      // 将产生的错误返回出去
      return e;
    }
  }
}

module.exports = CleanWebpackPlugin;
