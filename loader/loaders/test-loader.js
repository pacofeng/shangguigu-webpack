/*
  loader就是一个函数
  当webpack解析资源时，会调用相应的loader去处理
  loader接收到文件的内容作为参数，再返回修改后的内容
    content - 文件内容
    map - Sourcemap
    meta - 别的loader传递的数据
*/

module.exports = function (content, map, meta) {
  console.log('this is from test loader: ', content);
  return content;
};
