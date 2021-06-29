import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';

export const Container = styled(LinearGradient).attrs({
  colors: [theme.colors.primary, theme.colors.primary, '#FFC380'],
})`
  width: 100%;
  height: 184px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  padding: 0px 24px;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${theme.colors.shape};
  font-size: 20px;
  font-family: ${theme.fonts.titleRegular};
  line-height: 25px;
`;

export const Highlight = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-family: ${theme.fonts.titleSemiBold};
  line-height: 25px;
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.shape};
  font-size: 13px;
  font-family: ${theme.fonts.textRegular};
  line-height: 16px;
`;

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;
