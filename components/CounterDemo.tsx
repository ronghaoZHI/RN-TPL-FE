import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NativeCounter from '../specs/NativeCounter';

const CounterDemo = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 加载初始计数
  useEffect(() => {
    loadCount();
  }, []);

  // 从原生模块获取计数
  const loadCount = async () => {
    try {
      setIsLoading(true);
      const currentCount = await NativeCounter.getCount();
      setCount(currentCount);
    } catch (error) {
      console.error('获取计数失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 使用回调方式获取计数
  const getCountWithCallback = () => {
    NativeCounter.getCountWithCallback((currentCount) => {
      setCount(currentCount);
    });
  };

  // 增加计数
  const handleIncrement = async () => {
    NativeCounter.increment(1);
    await loadCount(); // 重新加载计数
  };

  // 减少计数
  const handleDecrement = async () => {
    NativeCounter.decrement(1);
    await loadCount(); // 重新加载计数
  };

  // 重置计数
  const handleReset = async () => {
    NativeCounter.reset();
    await loadCount(); // 重新加载计数
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>原生计数器示例</Text>
      {isLoading ? (
        <Text>加载中...</Text>
      ) : (
        <Text style={styles.count}>{count}</Text>
      )}
      <View style={styles.buttonRow}>
        <Button title="-" onPress={handleDecrement} />
        <Button title="+" onPress={handleIncrement} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="使用回调获取计数" onPress={getCountWithCallback} />
        <Button title="重置" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  count: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
});

export default CounterDemo; 