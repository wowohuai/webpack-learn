// 这种情况  a 的tree shaking 失败
// 因为动态导入后无法判断会使用到 a 文件的哪些方法
import("./components/a");

import "./components/b";
