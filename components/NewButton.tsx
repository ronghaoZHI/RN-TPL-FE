import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Text, Pressable } from 'react-native';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button = React.forwardRef(({ title = '按钮', onPress = () => { console.log('点击了') }, style }: ButtonProps, ref) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Button

