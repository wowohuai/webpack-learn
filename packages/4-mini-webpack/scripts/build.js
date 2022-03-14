const webpack = require("../lib/webpack");
const config = require("../config/webpack.config");

const compiler = webpack(config);

// 开始打包
compiler.run();
