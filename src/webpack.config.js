var path = require('path');
var webpack = require('webpack');

var cfgBase = {
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
    extensions: ['*', '.js']
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};


var cfgZhee = {
  ...cfgBase,
  entry: {
    zhee: "./zhee/index.js"
  },
  output: {
    library: "zhee",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../out/zhee"),
    filename: "zhee.js" // or [name.js]
  }
};



var cfgZheeBro = {
  ...cfgBase,
  entry: {
    zheebro: "./zhee-bro/index.js"
  },
  output: {
    library: "zhee",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../out/zhee-bro"),
    filename: "zhee-bro.js" // or [name.js]
  }
};

var cfgZheeZha = {
  ...cfgBase,
  entry: {
    zhezha: "./zhee-zha/index.js"
  },
  output: {
    library: "zhee",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../out/zhee-zha"),
    filename: "zhee-zha.js" // or [name.js]
  }
};


//Tell Webpack what to zhabify
module.exports = [ cfgZhee, cfgZheeZha ];
//module.exports = [ cfgZhee, cfgZheeBro, cfgZheeZha ];
