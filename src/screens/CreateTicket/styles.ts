import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';
import { RectButtonProps } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: ${theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  position: relative;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  padding-bottom: 16px;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.titleSemiBold};
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: ${theme.colors.primary};
`;

export const Form = styled.View`
  flex: 1;
  padding-top: 24px;
  justify-content: flex-start;
  padding: 40px 0px;
`;

export const InputBlock = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
`;

export const Button = styled(RectButton)`
  height: 55px;
  border-radius: 8px;
  background: ${theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ButtonTextProps = {
  variant: 'primary' | 'secondary';
};

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ variant }) =>
    theme.colors[variant === 'primary' ? 'background' : 'secondary']};
`;
