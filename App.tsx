import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import CounterDemo from './components/CounterDemo';
import NewButton from './components/NewButton';

export default function App() {
  const [result, setResult] = useState<number | null>(null);

  DeviceEventEmitter.addListener('TimeOutEvent', event => {
    console.log('TimeOutEvent', event);
    // 从事件数据中获取 result 值
    if (event.params && event.params.result !== undefined) {
      setResult(event.params.result);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>自定义组件示例</Text>
      <View style={styles.demoContainer}>
        <NewButton />
      </View>
      <Text style={styles.header}>获取Native数据示例</Text>
      <View style={styles.demoContainer}>
        <Text style={{ fontSize: 20, alignSelf: 'center', color: 'blue', marginTop: 20 }}>
          {result !== null ? `Native Result: ${result}` : '等待來自Native的数据...'}
        </Text>
      </View>
      {/*  */}
      <Text style={styles.header}>TurboModule 示例</Text>
      <View style={styles.demoContainer}>
        <CounterDemo />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  demoContainer: {
    padding: 10,
    marginBottom: 20,
  },
});
