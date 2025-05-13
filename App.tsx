import { StyleSheet, Text, View } from 'react-native';
import { Button } from './components';

export default function App() {

  console.log('App', process.env);
  return (
    <View style={styles.container}>
      <Text>RN-Demo</Text>
      <Text>测试一下</Text>
      <Button title="点击我" onPress={() => {
        console.log('点击了');
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
