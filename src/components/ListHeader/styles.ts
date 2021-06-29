import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 28px;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.titleSemiBold};
  font-size: 20px;
  line-height: 25px;
  color: ${theme.colors.primary};
`;

export const SubTitle = styled.Text`
  font-family: ${theme.fonts.textRegular};
  font-size: 13px;
  line-height: 20px;
  color: ${theme.colors.body};
`;
