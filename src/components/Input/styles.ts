import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${theme.colors.stroke};
`;

export const Icon = styled.View`
  width: 56px;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-color: ${theme.colors.stroke};
`;

export const ScanButtonIcon = styled.View`
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;
