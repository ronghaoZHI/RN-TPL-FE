# React Native 拆包功能说明

## 拆包方案介绍

该项目引入了 Metro 的 bundle 拆包方案，将应用分为两个主要部分：

1. **common.jsbundle** - 包含 React 相关基础库（如 react、react-dom、react-native）
2. **buz.jsbundle** - 包含业务代码

这种拆分可以有效减小业务包体积，提高应用加载速度和更新效率。基础库很少变动，而业务代码经常更新，拆分后只需要更新业务包。

## 打包命令

### iOS 平台

```bash
# 拆包打包iOS应用
npm run bundle:split:ios
```

执行后将在 `./dist` 目录下生成：
- `common.ios.jsbundle` - 基础库包
- `buz.ios.jsbundle` - 业务代码包
- `assets-ios` 目录 - 资源文件

### Android 平台

```bash
# 拆包打包Android应用
npm run bundle:split:android
```

执行后将在 `./dist` 目录下生成：
- `common.android.bundle` - 基础库包
- `buz.android.bundle` - 业务代码包
- `assets-android` 目录 - 资源文件

## 原生端集成

### iOS集成

在iOS项目中，需要修改`AppDelegate.m`文件，加载两个JS Bundle：

```objective-c
// 先加载common bundle
NSString *commonBundlePath = [[NSBundle mainBundle] pathForResource:@"common.ios" ofType:@"jsbundle"];
[bridge loadBundleAtURL:[NSURL URLWithString:commonBundlePath] onComplete:^(NSError *error) {
  if (!error) {
    // 再加载业务bundle
    NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"buz.ios" ofType:@"jsbundle"];
    [bridge loadBundleAtURL:[NSURL URLWithString:bundlePath] onComplete:nil];
  }
}];
```

### Android集成

在Android项目中，修改`MainApplication.java`：

```java
// 先加载common bundle
ReactInstanceManager.Builder builder = ReactInstanceManager.builder()
  .setJSBundleFile("assets://common.android.bundle");

// 加载业务bundle
reactContext.getCatalystInstance().loadScriptFromFile("assets://buz.android.bundle", null, false);
```

## 注意事项

1. 保持common包稳定，避免频繁修改
2. 确保基础依赖在common/index.js中正确导入
3. 打包后请测试应用确保功能正常
4. 原生端集成需根据实际项目结构调整 