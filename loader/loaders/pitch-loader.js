module.exports = function (content, map, meta) {
  return content;
};

// 从左到右执行 loader 链中的每个 loader 上的 pitch 方法
// 再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法
// 在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 。
module.exports.pitch = function () {
  console.log('pitch');
};
