const CopyPlugin = require("./plugins/copy-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new CopyPlugin({
      from: "public",
      to: "static",
      ignore: ["**/index.html"],
    }),
  ],
};
