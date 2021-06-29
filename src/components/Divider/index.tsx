import React from 'react';
import { View } from 'react-native';
import { theme } from '../../global/styles/theme';

export function Divider() {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.stroke,
      }}
    />
  );
}
