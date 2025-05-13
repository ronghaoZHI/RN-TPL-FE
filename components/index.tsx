import React from 'react';
import { Button as RNButton } from 'react-native';

export const Button = () => {
  return <RNButton 
    title="Click me"
    onPress={() => {
      console.log('clicked');
    }} 
  />;
};