import React from 'react';

import { Container, SubTitle, Title } from './styles';

type ListHeaderProps = {
  title: string;
  subtitle: string;
};

export function ListHeader({ title, subtitle }: ListHeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Container>
  );
}
