import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { theme } from '../../global/styles/theme';

type LoadProps = ActivityIndicatorProps & {
  color?: 'primary' | 'red' | 'white';
  size?: number;
  isHidden?: boolean;
};

export function Load({
  color = 'primary',
  size = 24,
  isHidden = false,
  ...rest
}: LoadProps) {
  const { primary, delete: red, background: white } = theme.colors;

  const colors = {
    primary,
    red,
    white,
  };

  return <ActivityIndicator color={colors[color]} size={size} {...rest} />;
}
