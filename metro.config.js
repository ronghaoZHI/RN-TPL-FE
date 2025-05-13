// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 启用拆包功能
config.resolver.enablePackageExports = true;
config.transformer.allowOptionalDependencies = true;

// 配置拆包
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: require('metro/src/lib/createModuleIdFactory'),
  processModuleFilter: module => !module.path.includes('node_modules/react') &&
    !module.path.includes('node_modules/react-native') &&
    !module.path.includes('node_modules/react-dom'),
};

console.log('config', config);

module.exports = config;
