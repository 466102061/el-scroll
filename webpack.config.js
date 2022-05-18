const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const timeFormat = require("./src/utils/time.js")
const bannerPlugin = new webpack.BannerPlugin(
`@desc ${ pkg.description }
@version ${ pkg.version }
@author ${ pkg.author + ' ' + pkg.email }
@time ${ timeFormat("yyyy-MM-dd hh:mm:ss") }

@example
let scroller = new ElScroll('#J_scroll');

//events
scroller.on('scroll', ({ctx, dist, event})=>{
  console.log('scrolling and scrollY is ', dist);
});

scroller.on('beforeScrollEnd', ({ctx, dist, event})=>{
  console.log('before scrolling stops and scrollY is ', dist);
  //Returns a negative number that determines where the final scrolling stops.
  return dist;
});

scroller.on('scrollEnd', ({ctx, dist, event})=>{
  console.log('scrolling stops and scrollY is ', dist);
});

scroller.on('tap', ({ctx, event})=>{
  console.log('tap event', event);
});

scroller.on('longPress', ({ctx, event})=>{
  console.log('longPress event', event);
});

scroller.on('destroy', ()=>{
  console.log('destroy callback');
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