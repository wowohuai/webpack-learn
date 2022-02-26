const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: path.resolve(__dirname, "loaders/loader1"),
        // 执行顺序是 倒序的
        // 前 后执行的loader 接收的是前一个loader的输出
        use: [
          "loader1",
          "loader2",
          "loader3",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
};
