const Compiler = require("./Compiler");

module.exports = function webpack(config) {
  return new Compiler(config);
};
