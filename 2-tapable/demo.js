const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require("tapable");

class Demo {
  constructor() {
    this.hooks = {
      sync: new SyncHook(["arg1", "arg2"]), // 这里的参数的个数 表示函数执行的时候可传入的参数的个数
    };
  }
  callSync(arg1, arg2) {
    this.hooks.sync.call(arg1, arg2);
  }
}

const d = new Demo();

d.hooks.sync.tap("sync1", (arg1, arg2) => {
  console.log("sync1", arg1, arg2);
});
d.hooks.sync.tap("sync2", (arg1, arg2) => {
  console.log("sync2", arg1, arg2);
});

d.callSync("`sync 参数1`", "`sync 参数2`");
