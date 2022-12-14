// Node.js的核心模块，专门用来处理文件路径
const path = require('path');
// nodejs核心模块，直接使用
const os = require('os');

const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// cpu核数
const threads = os.cpus().length;

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: './src/main.js',
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: 'static/js/[name].js', // 入口文件打包输出资源命名方式
    chunkFilename: 'static/js/[name].chunk.js', // 动态导入模块的输出资源命名方式
    assetModuleFilename: 'static/media/[name].[hash][ext]', // 图片、字体等通过type：asset处理处理的资源命名方式（注意用hash）
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  devtool: 'cheap-module-source-map',
  // 加载器
  module: {
    rules: [
      {
        // 只匹配上一个 loader, 剩下的就不匹配了
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: [
              'style-loader', // 会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容
              'css-loader', // 负责将 Css 文件编译成 Webpack 能识别的模块
            ],
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
          },
          {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 50 * 1024, // 小于50kb的图片会被base64处理， 优点：减少请求数量，缺点：体积变得更大
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: 'static/images/[hash:8][ext][query]',
            // },
          },
          {
            test: /\.(ttf|woff2?|map4|map3|avi)$/,
            type: 'asset/resource',
            // generator: {
            //   filename: 'static/media/[hash:8][ext][query]',
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, '../src'), // 也可以用包含，只处理src下的文件
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/.eslintcache'
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  // 开发服务器
  devServer: {
    host: 'localhost', // 启动服务器域名
    port: '3000', // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（默认为true，只能用于开发环境，生产环境不需要了）
  },
  // 模式
  mode: 'development', // 开发模式
};
