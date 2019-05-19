/*eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: path.join(__dirname, 'index.js'),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: 'bundle.js',
    publicPath: '/__build__/'
  },

  resolve: {
    alias: {
      'react16-animate.css': path.join(
        __dirname,
        '..',
        process.env.NODE_ENV === 'production' ? 'build' : 'src',
        'Animate'
      )
    }
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            //   'env',
            //   {
            //     useBuiltIns: 'usage',
            //     debug: true,
            //     targets: {
            //       browsers: ['last 2 versions', 'not ie > 8', 'ie 11', 'ie 10', 'not android > 4', 'not edge > 10']
            //     }
            //   }
            // ],
            'es2015',
            'react',
            'stage-2'
          ],
          plugins: ['transform-decorators-legacy', 'transform-async-to-generator', 'syntax-jsx'],
          cacheDirectory: true
        }
      },
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
