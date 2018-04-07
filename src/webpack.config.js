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
    waev: "./zhee/index.js"
  },
  output: {
    library: "zhee",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../../out/zhee"),
    filename: "zhee.js" // or [name.js]
  }
};


var cfgZheeBro = {
  ...cfgBase,
  entry: {
    waev: "./zhee-bro/index.js"
  },
  output: {
    library: "zheebro",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../../out/zhee-bro"),
    filename: "zhee-bro.js" // or [name.js]
  }
};

var cfgZheeZha = {
  ...cfgBase,
  entry: {
    waev: "./zhee-zha/index.js"
  },
  output: {
    library: "zheezha",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../../out/zhee-zha"),
    filename: "zhee-zha.js" // or [name.js]
  }
};


//Tell Webpack what to zhabify
module.exports = [ cfgZhee, cfgZheeBro, cfgZheeZha ];
