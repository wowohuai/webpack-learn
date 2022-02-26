const babel = require("@babel/core");
const {validate} = require("schema-utils");
const schema = require("./options.json");

module.exports = function (content) {
  const options = this.getOptions() || {};
  validate(schema, options, {
    name: "babel-loader",
  });

  const callback = this.async();
  babel.transform(content, options, (err, {code, map}) => {
    callback(err, code, map);
  });
};
