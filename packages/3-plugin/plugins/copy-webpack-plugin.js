const {validate} = require("schema-utils");
const schema = require("./options.json");
const globby = require("globby");
const path = require("path");
const fs = require("fs");

class CopyWebpackPlugin {
  constructor(options) {
    validate(schema, options, {
      name: CopyWebpackPlugin.name,
    });
    this.options = options || {
      from: process.cwd(),
      to: ".",
    };
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(
      CopyWebpackPlugin.name,
      (compilation) => {
        compilation.hooks.additionalAssets.tapAsync(
          CopyWebpackPlugin.name,
          async (cb) => {
            const {options, webpack} = compiler;
            // 将 from 的资源复制到 to中

            const {from, to = ".", ignore} = this.options;
            // 获取文件路径
            const paths = await globby(
              path.isAbsolute(from)
                ? from
                : path.resolve(options.context, from),
              {ignore}
            );
            // 获取文件内容
            const assets = [];
            for (const p of paths) {
              const data = fs.readFileSync(p);
              assets.push({
                source: new webpack.sources.RawSource(data),
                filename:
                  to !== "."
                    ? path.join(to, path.basename(p))
                    : path.basename(p),
              });
            }
            // 输出文件
            assets.forEach((asset) => {
              compilation.emitAsset(asset.filename, asset.source);
            });
            cb();
          }
        );
      }
    );
  }
}

module.exports = CopyWebpackPlugin;
