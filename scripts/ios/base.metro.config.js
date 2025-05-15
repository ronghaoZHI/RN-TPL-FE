const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');
const projectRootPath = path.join(__dirname);
const moduleId = require('./multibundle/moduleId');

const config = getDefaultConfig(__dirname);

config.serializer.createModuleIdFactory = moduleId.createModuleIdFactoryWrap(
  projectRootPath,
  'base',
);

module.exports = config;