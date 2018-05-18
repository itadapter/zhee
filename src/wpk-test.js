const path    = require('path');
const webpack = require('webpack');
const common  = require('./wpk-common');


const cfgZheeTest = {
  ...common.CFG_BASE,
  mode: "development", // https://stackoverflow.com/questions/49053215/webpack-4-how-to-configure-minimize?noredirect=1&lq=1
  entry: {
    zhee: "./zhee/index.js"
  },
  output: {
    ...common.CFG_OUT,
    path: path.resolve(__dirname, "./test/zhee/out"),
    filename: "zhee.js" // or [name].js
  }
};


module.exports = [ cfgZheeTest ];
