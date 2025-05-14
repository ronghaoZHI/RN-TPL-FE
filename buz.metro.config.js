// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// 启用拆包功能
config.resolver.enablePackageExports = true;
config.transformer.allowOptionalDependencies = true;

// 定义基础库包含的模块
const basicModules = [
  'node_modules/react/',
  'node_modules/react-native/'
];

// 配置拆包
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: require('metro/src/lib/createModuleIdFactory'),
  // 修改过滤逻辑，确保基础库不被打包到业务包中
  processModuleFilter: (module) => {
    // 检查是否是基础库模块, 如果包含基础库模块，则不打包
    return !basicModules.some(name => {
      return module.path.includes(name);
    });
  }
};

console.log('config', config);

module.exports = config;
