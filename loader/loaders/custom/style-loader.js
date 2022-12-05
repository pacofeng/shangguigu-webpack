const styleLoader = () => {};

/*
  方法1：直接使用style-loader，这样只能处理样式不能处理样式中引入的其他资源：
      use: ['./loaders/custom/style-loader']
  方法2：借助css-loader解决样式中的引入其他资源的问题：
      use: ['./loaders/custom/style-loader', 'css-loader']
      问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上
      这个操作不容易
  方法3：style-loader使用pitch loader
      remainingRequest: 剩下需要处理的loader
      /Users/Haipeng_F/Documents/github-repos/shangguigu-webpack/loader/node_modules/css-loader/dist/cjs.js!/Users/Haipeng_F/Documents/github-repos/shangguigu-webpack/loader/src/css/index.css
      这里是inline loader用法，代表后面还有一个css-loader等待处理
*/
styleLoader.pitch = function (remainingRequest) {
  /*
    1. 将remainingRequest中的绝对路径转化成相对路径，webpack才能处理
      希望得到：../../node_modules/css-loader/dist/cjs.js!./index.css

      所以：需要将绝对路径转化成相对路径
      要求：
        1. 必须是相对路径
        2. 相对路径必须以 ./ 或 ../ 开头
        3. 相对路径的路径分隔符必须是 / ，不能是 \
  */
  const relativeRequest = remainingRequest
    .split('!')
    .map((absolutePath) => {
      // 将路径转化为相对路径
      return this.utils.contextify(this.context, absolutePath);
    })
    .join('!');

  /*
    2. 引入css-loader处理后的资源
      !!${relativeRequest} 
        relativeRequest：../../node_modules/css-loader/dist/cjs.js!./index.css
        relativeRequest是inline loader用法，代表要处理的index.css资源, 使用css-loader处理
        !!代表禁用所有配置的loader，只使用inline loader。（也就是外面我们style-loader和css-loader）,它们被禁用了，只是用我们指定的inline loader，也就是css-loader

      import style from "!!${relativeRequest}"
        引入css-loader处理后的css文件
        为什么需要css-loader处理css文件，不是我们直接读取css文件使用呢？
        因为可能存在@import导入css语法，这些语法就要通过css-loader解析才能变成一个css文件，否则我们引入的css资源会缺少

    3. 创建style，将内容插入页面中生效
      const styleEl = document.createElement('style')
        动态创建style标签
      styleEl.innerHTML = style
        将style标签内容设置为处理后的css代码
      document.head.appendChild(styleEl)
        添加到head中生效
  */
  const script = `
    import style from "!!${relativeRequest}";
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  `;

  // style-loader是第一个loader, 由于return导致熔断，所以其他loader不执行了（不管是normal还是pitch）
  return script;
};

module.exports = styleLoader;
