import { add } from './math';
console.log('main');
console.log(add(1, 2));

document.getElementById('btn').onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import('./count.js')
    .then((res) => {
      console.log('loaded count.js', res.default);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
};
