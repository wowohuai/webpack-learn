const fs = require("fs");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const {transformFromAstSync} = require("@babel/core");
/**
 * 根据文件地址获取 ast
 * @param {*} entry
 * @returns
 */
function getAst(entry) {
  console.log("entry", entry);
  const filepath = fs.readFileSync(entry, "utf-8");
  return babelParser.parse(filepath, {
    sourceType: "module", // es module
  });
}

/**
 * 根据ast获取依赖
 * @param {*} ast
 * @param {*} dirname
 * @returns
 */
function getDeps(ast, filepath) {
  const deps = new Map();
  traverse(ast, {
    ImportDeclaration({node}) {
      const dirname = path.dirname(filepath);
      // 获取依赖文件的绝对路径
      const relativePath = node.source.value;
      const absolutePath = path.resolve(dirname, relativePath);
      deps.set(relativePath, absolutePath);
    },
  });
  return deps;
}
/**
 * 根据ast生成代码
 * @param {*} ast
 * @returns
 */
function getTransformedCode(ast) {
  return transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });
}

module.exports = {
  getAst,
  getDeps,
  getTransformedCode,
};
