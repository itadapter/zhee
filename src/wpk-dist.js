var path = require('path');
var webpack = require('webpack');
const common  = require('./wpk-common');

var cfgZhee = {
  ...common.CFG_BASE,
  entry: {
    zhee: "./zhee/index.js"
  },
  output: {
    ...common.CFG_OUT,
    path: path.resolve(__dirname, "../out/zhee"),
    filename: "zhee.js" // or [name].js
  }
};

/*
var cfgZheeBro = {
  ...common.CFG_BASE,
  entry: {
    zheebro: "./zhee-bro/index.js"
  },
  output: {
    ...common.CFG_OUT,
    path: path.resolve(__dirname, "../out/zhee-bro"),
    filename: "zhee-bro.js" // or [name].js
  }
};


var cfgZheeZha = {
  ...common.CFG_BASE,
  entry: {
    zhezha: "./zhee-zha/index.js"
  },
  output: {
    ...common.CFG_OUT,
    path: path.resolve(__dirname, "../out/zhee-zha"),
    filename: "zhee-zha.js" // or [name.js]
  }
};
*/

//Tell Webpack what to distributed
module.exports = [ cfgZhee, /*cfgZheeBro, cfgZheeZha */ ];
