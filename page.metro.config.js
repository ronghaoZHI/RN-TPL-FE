const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');
const projectRootPath = path.join(__dirname);
const moduleId = require('./scripts/android/multibundle/moduleId');


const config = getDefaultConfig(__dirname);

config.serializer.createModuleIdFactory = moduleId.createModuleIdFactoryWrap(
  projectRootPath,
  'index',
);

config.serializer.processModuleFilter = moduleId.postProcessModulesFilterWrap(
  projectRootPath,
);

module.exports = config