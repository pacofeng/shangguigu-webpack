import count from './js/count';
import sum from './js/sum';
// 引入 Css 资源，Webpack才会对其打包
import './css/index.css';

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
