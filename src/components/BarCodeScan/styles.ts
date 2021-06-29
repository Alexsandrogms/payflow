import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  position: relative;
  margin-top: ${getStatusBarHeight() + 10}px;
  background: ${theme.colors.overlay};
`;

export const Header = styled.View`
  width: 100%;
  height: 120px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background: ${theme.colors.strong};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.background};
`;

type FooterProps = {
  secondary?: boolean;
};

export const Footer = styled.View<FooterProps>`
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: ${(props) =>
    props.secondary ? theme.colors.strong : theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.primary};
`;

export const Warning = styled.View`
  height: 100%;
  width: 100%;
  z-index: 2;
  position: absolute;
  background: ${theme.colors.overlay};
  justify-content: flex-end;
`;

export const WarningFooter = styled.View`
  background: ${theme.colors.background};
  height: 60px;
  flex-direction: row;
`;

export const WarningText = styled.Text`
  font-family: ${theme.fonts.textRegular};
  color: ${theme.colors.primary};
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  background: ${theme.colors.background};
  padding: 40px 0px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.stroke};
`;

export const Highlight = styled.Text`
  font-family: ${theme.fonts.textBold};
  color: ${theme.colors.primary};
  font-size: 15px;
  line-height: 22px;
  text-align: center;
`;
