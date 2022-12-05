module.exports = function (content) {
  // remove console.log
  return content.replace(/console\.log\(.*\);?/g, '');
};
