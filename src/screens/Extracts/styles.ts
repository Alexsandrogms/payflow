import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background: ${theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
  padding: 40px 24px 0px;
`;

export const TicketSeparator = styled.View`
  height: 40px;
`;

export const Filter = styled.View`
  padding: 16px 0px;
  align-items: flex-end;
`;

export const ButtonFilter = styled(BorderlessButton)`
  z-index: 2;
`;
