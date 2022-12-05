console.log('this is main js');
console.log('this is main js 2');
console.log('this is main js 3');

const sum = [1, 2, 3].reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0)[0];
