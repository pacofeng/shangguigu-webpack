const loaderUtils = require('loader-utils'); // https://www.npmjs.com/package/loader-utils

module.exports = function (content) {
  // 1. 根据文件内容生产一个hash值文件名
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content,
  });
  filename = `images/${filename}`;
  // 2. 将文件输出到dist
  this.emitFile(filename, content);
  // 3. 返回module.exports = '文件路径和文件名'
  return `module.exports = '${filename}'`;
};

// 该loader解决的是二进制的内容
// 图片是buffer数据
module.exports.raw = true;
