/**
 * 基础库打包入口文件
 * 这里导入所有需要放入common bundle的库
 */

// 导入React基础库
import 'react'
import 'react-native' 

// 执行一些基础库的代码，确保它们被正确打包
console.log('Base bundle loaded');

// 标记该模块被加载
global.__BASE_BUNDLE_LOADED__ = true;