module.exports = {
  // 一个智能预设，允许您使用最新的 JavaScript
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 自动按需加载core-js的polyfill
        corejs: { version: '3', proposals: true },
      },
    ],
  ],
};
