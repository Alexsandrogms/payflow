import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native';

import logoSmallImage from '../../assets/images/logo-small.png';

import { Container, Divider, Highlight, TextInfo, Wrapper } from './styles';

type TicketCounterProps = {
  amount: number;
};

export function TicketCounter({ amount }: TicketCounterProps) {
  return (
    <Container>
      <Wrapper>
        <Image source={logoSmallImage} />
        <Divider />
      </Wrapper>

      <TextInfo>
        Você tem <Highlight>{amount} boletos</Highlight> cadastrados para pagar
      </TextInfo>
    </Container>
  );
}
