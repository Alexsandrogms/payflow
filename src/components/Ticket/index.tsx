import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { TicketType } from '../../hooks/useTicket';

import { Container, Content, Title, PriceText, DueDateText } from './styles';

type TicketProps = TouchableOpacityProps & {
  data: TicketType;
  isDateExpired?: boolean;
};

export function Ticket({ data, isDateExpired, ...rest }: TicketProps) {
  const { title, value, dueDate } = data;

  return (
    <TouchableOpacity {...rest}>
      <Container>
        <Content>
          <Title numberOfLines={1}>{title}</Title>
          <PriceText>{formatCurrency(value, 'R$')}</PriceText>
        </Content>
        <DueDateText expired={isDateExpired}>
          Vence em {formatDate(dueDate)}
        </DueDateText>
      </Container>
    </TouchableOpacity>
  );
}
