# 【今日幸运色】项目带你快速完成 Taro 小程序开发和微信小程序发布


扫码可查看小程序

![扫码可查看小程序](./mini-code.jpg)

::: tip 官方文档

- [taro 4.x](https://docs.taro.zone/docs/GETTING-STARTED)
- [taro-ui](https://taro-ui.jd.com/#/docs/quickstart)
  :::

## 项目开发步骤

::: tip 温馨提示

- Taro 项目基于 node，请确保已具备较新的 node 环境（`>=16.20.0`）。
- 由于 Taro 部分能力使用 Rust 开发，在 Windows 上，请确保安装了 `Microsoft Visual C++ Redistributable`。[点击查看](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)
- 在 macOS 或类 Unix 系统中，当你遇到 `permission denied` 错误时，通常是因为你没有足够的权限来执行某个操作：`sudo chown -R [用户名] [文件路径]`，例如 `sudo chown -R admin /Users/admin/Desktop/taro-applet/`
  :::

### 1. 项目初始化

#### 方式一

1. 需要使用 npm 或者 yarn 全局安装 `@tarojs/cli`
   ::: code-group

```bash [npm]
npm install -g @tarojs/cli
```

```bash [yarn]
yarn global add @tarojs/cli
```

```bash [pnpm]
pnpm install -g @tarojs/cli
```

:::

::: tip 温馨提示

- 因权限问题造成的安装失败，需要在命令前面加 `sudo`
- 可以使用 `npm info` 查看 Taro 版本信息：`npm info @tarojs/cli`
  :::

[Taro 版本信息截图](https://image-static.segmentfault.com/202/608/2026083916-6944c38d43842_fix732)

2. 初始化

```bash
taro init myApp
```

初始化时根据自己的需求进行选择，建议选择`CLI 内置默认模版`，因为其他模版可能会有demo报错的情况。
[初始化模版选择截图](https://image-static.segmentfault.com/654/757/65475729-69451c97f1b64_fix732)

#### 方式二

npm 5.2+ 也可在不全局安装的情况下使用 npx 创建模板项目，初始化如下：

```bash
npx @tarojs/cli init myApp
```

#### 项目目录结构

```
├── dist                        编译结果目录
|
├── config                      项目编译配置目录
|   ├── index.js                默认配置
|   ├── dev.js                  开发环境配置
|   └── prod.js                 生产环境配置
|
├── src                         源码目录
|   ├── pages                   页面文件目录
|   |   └── index               index 页面目录
|   |       ├── index.js        index 页面逻辑
|   |       ├── index.css       index 页面样式
|   |       └── index.config.js index 页面配置
|   |
|   ├── app.js                  项目入口文件
|   ├── app.css                 项目总通用样式
|   └── app.config.js           项目入口配置
|
├── project.config.json         微信小程序项目配置 project.config.json
├── project.tt.json             抖音小程序项目配置 project.tt.json
├── project.swan.json           百度小程序项目配置 project.swan.json
├── project.qq.json             QQ 小程序项目配置 project.qq.json
├── ascf.config.json            ASCF元服务项目配置 ascf.config.json
|
├── babel.config.js             Babel 配置
├── tsconfig.json               TypeScript 配置
├── .eslintrc                   ESLint 配置
|
└── package.json
```

#### 若安装依赖失败

在创建完项目之后，Taro 会默认开始安装项目所需要的依赖，但某些情况下可能会安装失败，这时候可以使用安装命令进行安装：

::: code-group

```bash [npm]
# 进入项目根目录
cd myApp

# 使用 npm 安装依赖
npm install
```

```bash [yarn]
# 进入项目根目录
cd myApp

# 使用 yarn 安装依赖
yarn
```

```bash [pnpm]
# 进入项目根目录
cd myApp

# 使用 pnpm 安装依赖
pnpm install
```

:::

### 2. 安装UI库和依赖

如果不使用 `taro-ui` 和 `微信工具` 可以跳过此步骤，如果需要开发其他小程序，需要装对应的工具。

::: code-group

```bash [npm]
npm install taro-ui @tarojs/plugin-platform-weapp
```

```bash [yarn]
yarn add taro-ui @tarojs/plugin-platform-weapp
```

```bash [pnpm]
pnpm install taro-ui @tarojs/plugin-platform-weapp
```

:::

### 3. 下载小程序开发者工具

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [百度开发者工具](https://smartprogram.baidu.com/docs/develop/devtools/history)
- [支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)
- [抖音小程序开发者工具](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/dev-tools/developer-instrument/download/developer-instrument-update-and-download)
- [QQ 小程序开发者工具](https://q.qq.com/wiki/tools/devtool/)
- [京东小程序开发者工具](https://mp-docs.jd.com/doc/miniapp/dev/reference/-1)

需要注意开发者工具的项目设置：

- 需要关闭 ES6 转 ES5 功能，开启可能报错
- 需要关闭上传代码时样式自动补全，开启可能报错
- 需要关闭代码压缩上传，开启可能报错

### 4. 启动项目: weapp

**`以微信小程序为例`**，编译命令如下：

```bash
# pnpm
$ pnpm dev:weapp
$ pnpm build:weapp

# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp

# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp

# npx 用户也可以使用
$ npx taro build --type weapp --watch
$ npx taro build --type weapp

# watch 同时开启压缩
$ set NODE_ENV=production && taro build --type weapp --watch # CMD
$ NODE_ENV=production taro build --type weapp --watch # Bash
```

### 5. 开发调试: weapp

1. 在微信开发者工具中导入项目

2. 选择项目目录 dist 文件夹

3. 开启真机调试功能

4. 使用预览功能测试

导入 dist 文件夹后，就已经可以调试了；但你如果想使用真机调试，需要配置`AppID(小程序ID)`，如下：

::: code-group

```json [project.config.json]
{
  "miniprogramRoot": "./dist",
  "projectname": "taro-applet",
  "description": "基于taro的小程序模版",
  "appid": "touristappid", // [!code focus] [!code --]
  "appid": "AppID", // [!code focus] [!code ++]
  "setting": {
    "urlCheck": true,
    "es6": false,
    "enhance": false,
    "compileHotReLoad": false,
    "postcss": false,
    "minified": false
  },
  "compileType": "miniprogram"
}
```

:::

把 `touristappid` 替换成你自己的 `AppID`。

## 项目说明

### Git 地址

- [Github 地址](https://github.com/wynectar/taro-applet)
- [Gitee 地址](https://gitee.com/wynectar/taro-applet)

### 效果截图

- [主页](https://image-static.segmentfault.com/121/813/1218138471-694a70e7a5e92_fix732)
- [查看详情](https://image-static.segmentfault.com/216/375/2163751951-694a70c68e1f6_fix732)
- [我的记录](https://image-static.segmentfault.com/838/227/83822716-694a711aee240_fix732)
- [颜色测试](https://image-static.segmentfault.com/263/710/2637109241-694a71357f2b6_fix732)
- [搭配指南](https://image-static.segmentfault.com/237/582/2375820615-694a71542b4f8_fix732)

## 小程序发布流程

1. 获取AppID(小程序ID) ：[进入微信公众平台](https://mp.weixin.qq.com/)，有账户登陆查询，无账号注册获取

[微信公众平台截图](https://image-static.segmentfault.com/258/291/2582919528-694a0106b7e07_fix732)

2. 把 `project.config.json` 中的 `touristappid` 替换成你自己的 `AppID`

3. 确认真机调试是否有问题

4. 点击上传，添加版本信息

[上传信息截图截图](https://image-static.segmentfault.com/114/905/1149055094-694a6aae73691_fix732)

5. 保证自己的小程序信息填写完整

6. 小程序：`管理 -> 版本管理中` -> `选择提交审核` -> `提交审核通过后选择发布`

> 如果微信小程序未认证，则不能 `被搜索` 和 `被分享`，只能通过下载小程序码扫码查看。
