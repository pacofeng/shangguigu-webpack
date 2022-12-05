// 同步loader
// module.exports = function (content, map, meta) {
//   return content;
// };

// 定义同步loader的第二种方式：callback，更灵活，因为它允许传递多个参数
module.exports = function (content, map, meta) {
  console.log('this is from sync loader');
  // 第一个参数为error，代表是否有错误
  // 传递map，让source-map不中断
  // 传递meta，让下一个loader接收到其他参数
  this.callback(null, content, map, meta);
  return; // 当调用 callback() 函数时，总是返回 undefined
};
