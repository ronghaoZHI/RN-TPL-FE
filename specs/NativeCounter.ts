import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 增加计数
  increment(value: number): void;
  // 减少计数
  decrement(value: number): void;
  // 获取当前计数
  getCount(): Promise<number>;
  // 重置计数
  reset(): void;
  // 以回调形式获取计数
  getCountWithCallback(callback: (count: number) => void): void;
}

const NativeCounterMock = {
  increment: () => {
    console.log('increment');
  },
  decrement: () => {
    console.log('decrement');
  },
  getCount: () => {
    console.log('getCount');
    return Promise.resolve(0);
  },
  reset: () => {
    console.log('reset');
  },
  getCountWithCallback: (callback: (count: number) => void) => {
    console.log('getCountWithCallback', callback);
    callback(0);
  },
};

// 检测环境并提供适当的实现
export default process.env.NODE_ENV === 'production' 
  ? TurboModuleRegistry.getEnforcing<Spec>('NativeCounter')
  : NativeCounterMock;