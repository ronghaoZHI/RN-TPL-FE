import { AppRegistry } from 'react-native';
import App from './App';

// 包名必须和iOS/Android原生代码中注册的名称一致
const appName = require('./package.json').name;

// 注册应用组件
AppRegistry.registerComponent(appName, () => App);