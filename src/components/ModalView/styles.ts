import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';

export const Overlay = styled.View`
  flex: 1;
  background: ${theme.colors.overlay};
  justify-content: flex-end;
`;

export const Container = styled.View`
  height: 324px;
  margin-top: 100px;
  background: ${theme.colors.background};
`;

export const Indicator = styled.View`
  width: 48px;
  height: 4px;
  border-radius: 2px;
  background: #b1b0b8;
  align-self: center;
  margin-top: 14px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.titleRegular};
  font-size: 20px;
  line-height: 25px;
  color: ${theme.colors.primary};
  text-align: center;
  padding: 0px 24px;
`;

export const Highlight = styled.Text`
  font-family: ${theme.fonts.titleSemiBold};
  font-size: 20px;
  color: ${theme.colors.primary};
`;

export const WrapperButtons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding: 0px 24px;
`;

type ButtonProps = {
  variant: 'primary' | 'shape';
};

export const Button = styled.TouchableOpacity`
  width: 156px;
  height: 55px;
  border-radius: 8px;
  background: ${({ variant }: ButtonProps) => theme.colors[variant]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ButtonTextProps = {
  variant?: 'primary';
};

export const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  line-height: 18px;
  color: ${({ variant }) => (variant ? theme.colors.background : '#666666')};
`;

export const ButtonIcon = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonIconText = styled.Text`
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.delete};
  margin-left: 8px;
`;

export const Outlined = styled.View`
  border: 1px solid #e9e9eb;
  border-radius: 8px;
  overflow: hidden;
`;
