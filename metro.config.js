// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 启用拆包功能
config.resolver.enablePackageExports = true;
config.transformer.allowOptionalDependencies = true;

// 定义基础库包含的模块
const basicModules = [
  'react',
  'react-native', 
  'react-dom'
];

// 配置拆包
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: require('metro/src/lib/createModuleIdFactory'),
  // 修改过滤逻辑，确保基础库不被打包到业务包中
  processModuleFilter: (module) => {
    // 如果入口文件是 common/index.js，打包所有引用的模块
    if (module.path.endsWith('common/index.js')) {
      return true;
    }
    
    // 对其他入口，过滤掉 node_modules 中的基础库
    const isNodeModule = module.path.includes('node_modules');
    if (!isNodeModule) {
      return true;
    }
    
    // 检查是否是基础库模块
    return !basicModules.some(name => {
      const modulePath = path.sep + name + path.sep;
      return module.path.includes(modulePath);
    });
  }
};

console.log('config', config);

module.exports = config;
