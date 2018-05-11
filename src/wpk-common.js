const cfgBase = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2017"] //es2017 for async/await / was es2015
        }
      }
    ]
  },
  resolve: {
    //root: path.resolve(__dirname, 'js'), 
    modules: ["js"],
    extensions: ["*", ".js"]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};

const cfgOutBase = {
  library: "zhee",
  libraryTarget: "umd",
  //https://github.com/webpack/webpack/issues/6522
  globalObject: "typeof self !== 'undefined' ? self : this",
};

module.exports = { CFG_BASE: cfgBase, CFG_OUT: cfgOutBase };