// 接收的content是buffer数据流，即二进制数据，适用于处理图片数据
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
};

module.exports.raw = true;
