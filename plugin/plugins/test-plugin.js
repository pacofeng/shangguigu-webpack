class TestPlugin {
  constructor() {
    console.log('TestPlugin constructor()');
  }
  // 1. webpack加载webpack.config.js时，会new TestPlugin() ，执行插件 constructor 方法
  // 2. webpack创建 compiler 对象
  // 3. 遍历所有插件，调用插件的 apply 方法
  // 4. 执行剩下的编译流程， 促发各个hooks事件
  apply(compiler) {
    console.log('TestPlugin apply()');
  }
}

module.exports = TestPlugin;
