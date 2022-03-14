module.exports = function (content, map, meta) {
  console.log("loader1");
  // 直接返回值  同步的loader
  // return content + "loader1"; // 1
  return content;
  // this.callback(null, content); // 2

  // 异步 推荐
  // const callback = this.async();
  // setTimeout(() => {
  //   callback(null, content);
  // }, 3000);
};
