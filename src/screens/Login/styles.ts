import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background: ${theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Header = styled(LinearGradient).attrs({
  colors: [theme.colors.primary, theme.colors.primary, '#FFC380'],
})`
  width: 100%;
  height: 316px;
  position: relative;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PersonImage = styled.Image`
  position: absolute;
  align-self: center;
  top: ${parseInt(String(getStatusBarHeight() * 2 + 10))}px;
`;

export const LogoSmallImage = styled.Image`
  margin: 24px 0px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.titleSemiBold};
  text-align: center;
  font-size: 32px;
  line-height: 40px;
  color: ${theme.colors.primary};
`;

export const Outlined = styled.View`
  position: relative;
  top: 48px;
  height: 56px;
  width: 300px;
  margin: 0px 40px;
  background: ${theme.colors.shape};
  border: 1px solid #e9e9eb;
  border-radius: 8px;
  overflow: hidden;
`;

export const Button = styled(RectButton)`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const ButtonIcon = styled.View`
  height: 100%;
  width: 54px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: #e9e9eb;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  color: #666666;
`;

export const WrapperLoading = styled.View`
  position: relative;
  top: 60px;
`;
