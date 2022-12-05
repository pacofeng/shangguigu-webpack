const babel = require('@babel/core');
const schema = require('./schema.json');

module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(schema);

  babel.transform(content, options, function (error, result) {
    if (error) {
      callback(error);
    } else {
      callback(null, result.code);
    }
  });
};
