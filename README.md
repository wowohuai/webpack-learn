# webpack

webpack5 学习 demo

# pnpm workspace

## 1. 配置文件

pnpm-workspace.yaml

```yaml
- "packages/**"
```

## 2. 相关的命令

1. 安装全局共用的包

```sh
pnpm add webpack webpack-cli -w
```

2. 安装指定的包到指定的目录

```sh

#  1-loader 指的是 子package的name
pnpm add @babel/core @babel/preset-env loader-utils schema-utils -r --filter 1-loader
```

3. 安装同级目录的工具包

```sh
# utils 和 1-loader 指的是 子package的name
pnpm add utils -r --filter 1-loader
```
