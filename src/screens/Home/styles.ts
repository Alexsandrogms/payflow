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
  padding: 80px 24px 0px;
`;

export const TicketSeparator = styled.View`
  height: 40px;
`;
