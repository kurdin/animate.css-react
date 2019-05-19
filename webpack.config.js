var webpack = require('webpack');

module.exports = {
  output: {
    library: 'react16-animated.css',
    libraryTarget: 'umd'
  },

  externals: [
    {
      react: 'react',
      proptypes: 'proptypes',
      'object-assign': 'object-assign',
      'react16-transition-group': 'react16-transition-group'
    }
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: [['react', { imports: true }], 'syntax-jsx']
        }
      }
    ]
  },

  node: {
    Buffer: false
  }
};
