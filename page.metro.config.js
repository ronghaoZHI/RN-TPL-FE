const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');
const projectRootPath = path.join(__dirname);
const moduleId = require('./scripts/android/multibundle/moduleId');

// 定义业务包名名称（非base 包） 命名规则： ${业务线}_${项目sic集群名称}_${页面名称默认为index}.${platform}.bundle
// ${业务线}_${项目sic集群名称}_${页面名称 默认为index} 即 bundle 文件名 以 . 分隔符前面的字符串作为 客户端侧bundle 入口 appName
const buzBundleName = 'index';

const config = getDefaultConfig(__dirname);

config.serializer.createModuleIdFactory = moduleId.createModuleIdFactoryWrap(
  projectRootPath,
  buzBundleName,
);

config.serializer.processModuleFilter = moduleId.postProcessModulesFilterWrap(
  projectRootPath,
);

module.exports = config