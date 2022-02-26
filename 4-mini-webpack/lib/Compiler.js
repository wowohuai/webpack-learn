const path = require("path");
const {getAst, getDeps, getTransformedCode} = require("./parser");

class Compiler {
  constructor(options) {
    this.options = options || {};
    this.modules = [];
    this.graph = new Map();
  }
  /**
   * 开始打包
   *
   * 1. 读取入口文件内容
   * 2. 解析成 ast 语法树
   */
  run() {
    const {entry} = this.options;
    this.build(entry);
    // 生成依赖图
    this.graph = this.modules.reduce((graph, module) => {
      graph.set(module.filePath, {
        code: module.code,
        deps: module.deps,
      });
      return graph;
    }, new Map());
    // console.log(this.graph);
  }
  build(filePath) {
    // 1. 入口文件 转换为 ast
    const ast = getAst(filePath);
    // 2. 收集依赖文件
    const deps = getDeps(ast, filePath);
    // 3. 代码转换
    const {code, map} = getTransformedCode(ast);
    const info = {
      deps,
      code,
      map,
      filePath,
    };
    this.modules.push(info);
    // 4. 递归构建依赖
    this.buildAll(deps.values());

    return info;
  }

  buildAll(filePathIterator) {
    for (const filePath of filePathIterator) {
      this.build(filePath);
    }
  }
  /**
   * 生成 bundle
   */
  generate() {
    // todo
  }
}

module.exports = Compiler;
