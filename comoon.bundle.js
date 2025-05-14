/**
 * 基础库打包入口文件
 * 这里导入所有需要放入common bundle的库
 */

// 导入React基础库
const React = require('react');
const ReactNative = require('react-native');

// 可选：如果您使用了其他基础库也可以在这里导入
// import 'react-native-web';

// 显式导出基础库，确保它们被包含在common包中
module.exports = {
  React,
  ReactNative,
  // 可以在此添加其他基础库
};

// 执行一些基础库的代码，确保它们被正确打包
console.log('Common bundle loaded');

// 标记该模块被加载
global.__COMMON_BUNDLE_LOADED__ = true; 