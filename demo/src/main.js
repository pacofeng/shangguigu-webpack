// 手动全部引入
// import "core-js";
// 手动按需引入
// import 'core-js/es/promise';
import count from './js/count';
import sum from './js/sum';
// 引入 Css 资源，Webpack才会对其打包
import './css/iconfont.css';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './styl/index.styl';

const result1 = count(2, 1);
console.log(result1);
console.log(sum(1, 2, 3, 4));

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./js/count.js');
  module.hot.accept('./js/sum.js');
}

document.getElementById('btn').onclick = function () {
  // eslint会对动态导入语法报错，需要修改eslint配置文件
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ './js/math.js')
    .then(({ mul }) => {
      console.log(mul(2, 5));
    })
    .catch((error) => {
      console.log('error: ', error);
    });
};

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log('hello promise');
});

// 添加includes代码
console.log([1, 2, 3].includes(2));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
