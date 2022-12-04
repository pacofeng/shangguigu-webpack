module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module', // ES 模块化
  },
  // 具体检查规则
  rules: { 'no-var': 2 }, // 不能使用 var 定义变量
  plugins: ['import'], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
