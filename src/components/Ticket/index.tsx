import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

import { Container, Content, Title, PriceText, DueDateText } from './styles';

type TicketProps = TouchableOpacityProps & {
  title: string;
  price: number;
  dueDate: Date;
};

export function Ticket({ title, price, dueDate, ...rest }: TicketProps) {
  return (
    <TouchableOpacity {...rest}>
      <Container>
        <Content>
          <Title numberOfLines={1}>{title}</Title>
          <PriceText>{formatCurrency(price, 'R$')}</PriceText>
        </Content>
        <DueDateText>Vence em {formatDate(dueDate)}</DueDateText>
      </Container>
    </TouchableOpacity>
  );
}
