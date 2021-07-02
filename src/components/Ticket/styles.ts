import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.titleSemiBold};
  font-size: 17px;
  line-height: 21px;
  color: ${theme.colors.primary};
  max-width: 200px;
`;

export const PriceText = styled.Text`
  font-family: ${theme.fonts.textRegular};
  font-size: 15px;
  line-height: 19px;
  color: ${theme.colors.primary};
`;

type DueDateTextProps = {
  expired?: boolean;
};

export const DueDateText = styled.Text<DueDateTextProps>`
  font-family: ${theme.fonts.textRegular};
  font-size: 13px;
  line-height: 16px;
  color: ${(props) =>
    props.expired ? theme.colors.delete : theme.colors.body};
  padding-top: 10px;
`;
