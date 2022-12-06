class TestPlugin {
  constructor() {
    console.log('TestPlugin constructor()');
  }
  // 1. webpack加载webpack.config.js时，会new TestPlugin()，执行插件 constructor 方法
  // 2. webpack创建 compiler 对象
  // 3. 遍历所有插件，调用插件的 apply 方法
  // 4. 执行剩下的编译流程， 促发各个hooks事件
  apply(compiler) {
    debugger;
    console.log('TestPlugin apply()');

    // 从文档可知, environment hook 是 SyncHook, 也就是同步钩子, 只能用tap注册
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('environment');
    });

    // 从文档可知, emit hook 是 AsyncSeriesHook, 也就是异步串行钩子, 可以用tap，tapAsync或者tapPromise注册
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      console.log('emit tap');
    });

    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('emit tapAsync 2000');
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit promise 1000');
          resolve();
        }, 1000);
      });
    });

    // 从文档可知, make hook 是 AsyncParallelHook, 也就是异步并行钩子，可以用tap，tapAsync或者tapPromise注册
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      // 需要在compilation触发之前注册才能使用
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('seal');
      });

      setTimeout(() => {
        console.log('make tapAsync 3000');
        callback();
      }, 3000);
    });

    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('make tapAsync 1000');
        callback();
      }, 1000);
    });
  }
}

module.exports = TestPlugin;
