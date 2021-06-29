import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Content,
  Title,
  Highlight,
  SubTitle,
  Avatar,
} from './styles';

export function Header() {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <View style={{ flex: 1 }}>
          <Title>
            Olá, <Highlight>{user.given_name}</Highlight>
          </Title>
          <SubTitle>Mantenha suas contas em dia</SubTitle>
        </View>
        <Avatar source={{ uri: user.picture }} />
      </Content>
    </Container>
  );
}
