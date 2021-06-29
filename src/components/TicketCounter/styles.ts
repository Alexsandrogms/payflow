import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  position: absolute;
  width: 352px;
  height: 80px;
  align-self: center;
  top: -40px;
  background: ${theme.colors.secondary};
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-left: 16px;
`;

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const Divider = styled.View`
  height: 32px;
  width: 1px;
  background: ${theme.colors.background};
  margin: 0px 8px;
`;

export const TextInfo = styled.Text`
  flex: 2;
  font-family: ${theme.fonts.textRegular};
  font-size: 13px;
  line-height: 20px;
  color: ${theme.colors.background};
`;

export const Highlight = styled.Text`
  font-family: ${theme.fonts.textBold};
  font-size: 13px;
  line-height: 20px;
  color: ${theme.colors.background};
`;
