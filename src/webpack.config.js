var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './js/main.js'
        //base: './js/base.js',
        //string: './js/string.js',
    },
    output: {
      library: "lenin",
      libraryTarget: "umd",
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
     //root: path.resolve(__dirname, 'js'), 
     modules: ['js'],
     extensions: ['*', '.js', '.jsx']
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};