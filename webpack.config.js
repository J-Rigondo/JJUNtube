const path = require('path');
const ExtractCSS = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const config = {
  // bottom up 방식
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractCSS.extract([
          //해당 부분만 추출
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader', //특정 플러그인들을 css에 대해 실행
            options: {
              plugins() {
                return [autoprefixer({ overrideBrowserslist: 'cover 99.5%' })];
              }
            }
          },
          {
            loader: 'sass-loader' //sass -> css
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js'
  },
  plugins: [new ExtractCSS('styles.css')]
};

module.exports = config;
