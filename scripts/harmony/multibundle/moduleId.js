const pathSep = require('path').sep;
const fs = require('fs');
const SHA256 = require('crypto-js/sha256');

const baseNameArray = require('./map/baseNameMap.json') || [];
const pageNameArray = require('./map/pageNameMap.json') || [];

function getModuleId(projectRootPath, modulePath, ...bundles) {
  let startIndex = modulePath.indexOf(projectRootPath);
  let pathRelative = modulePath.substr(startIndex + projectRootPath.length + 1);
  return String(SHA256(pathRelative));
}

function createModuleIdFactoryWrap(projectRootPath, ...bundles) {
  console.log('----------createModuleIdFactoryWrap', projectRootPath);
  return () => {
    return (path) => {
      let moduleId = getModuleId(projectRootPath, path);
      let jsItem = path + ' ---> ' + moduleId;
      if ('base' == bundles[0]) {
        if (!baseNameArray.includes(jsItem)) {
          baseNameArray.push(jsItem);
          fs.writeFileSync(
            __dirname + pathSep + 'map' + pathSep + 'baseNameMap.json',
            JSON.stringify(baseNameArray),
          );
        }
      } else {
        if (!pageNameArray.includes(jsItem)) {
          pageNameArray.push(jsItem);
          fs.writeFileSync(
            __dirname + pathSep + 'map' + pathSep + 'pageNameMap.json',
            JSON.stringify(pageNameArray),
          );
        }
      }

      return moduleId;
    };
  };
}

function postProcessModulesFilterWrap(projectRootPath) {
  // 返回false则不打入bundle中
  console.log('----------postProcessModulesFilterWrap');
  return (module) => {
    const path = module.path;
    if (
      path.indexOf('__prelude__') >= 0 ||
      path.indexOf(
        pathSep +
          'node_modules' +
          pathSep +
          '@react-native' +
          pathSep +
          'js-polyfills',
          // 'polyfills',
      ) >= 0 ||
      path.indexOf(
        pathSep +
          'node_modules' +
          pathSep +
          'metro-runtime' +
          pathSep +
          'src' +
          pathSep +
          'polyfills',
      ) >= 0 ||
      path.indexOf(
        pathSep +
          'node_modules' +
          pathSep +
          'react' +
          pathSep +
          'src' +
          pathSep +
          'polyfills',
      ) >= 0
    ) {
      return false;
    }

    const moduleId = getModuleId(projectRootPath, path);
    let jsItem = path + ' ---> ' + moduleId;
    if (path.indexOf(pathSep + 'node_modules' + pathSep) > 0) {
      if (
        'js' + pathSep + 'script' + pathSep + 'virtual' == module.output[0].type
      ) {
        return true;
      }
    }

    // 正在打业务包, 基础包过滤掉
    if (
      baseNameArray.includes(jsItem)
    ) {
      return false;
    }
    
    return true;
  };
}

module.exports = { createModuleIdFactoryWrap, postProcessModulesFilterWrap };