const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const time = require("dayjs")().format("YYYY-M-D HH:mm:ss")
const bannerPlugin = new webpack.BannerPlugin(
`@desc ${ pkg.description }
@version ${ pkg.version }
@author ${ pkg.author + ' ' + pkg.email }
@time ${ time }

@example
let scroller = new ElScroll('#J_scroll');

//events
scroller.on('scroll', ({ctx, dist})=>{
  console.log('scrolling and scrollY is ', dist);
});

scroller.on('beforeScrollEnd', ({ctx, dist})=>{
  console.log('before scrolling stops and scrollY is ', dist);
  //Returns a negative number that determines where the final scrolling stops.
  return dist;
});

scroller.on('scrollEnd', ({ctx, dist})=>{
  console.log('scrolling stops and scrollY is ', dist);
});
`
)

module.exports = {
  mode : 'production',
  // target : ['web', 'es5'],
  entry : {
    'el-scroll' : path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget : 'umd',
    library : 'ElScroll'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins : [bannerPlugin]
}