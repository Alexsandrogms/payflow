import React from 'react';
import { Image } from 'react-native';

import personImg from '../../assets/images/person.png';
import logoImg from '../../assets/images/logo-small.png';
import googleIcon from '../../assets/images/google.png';

import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Header,
  PersonImage,
  Content,
  LogoSmallImage,
  Title,
  Outlined,
  Button,
  ButtonIcon,
  ButtonText,
  WrapperLoading,
} from './styles';
import { Load } from '../../components/Load';

export function Login() {
  const { signInWithGoogle, loading } = useAuth();

  async function handleSignIn() {
    await signInWithGoogle();
  }

  return (
    <Container>
      <Header>
        <PersonImage source={personImg} />
      </Header>
      <Content>
        <LogoSmallImage source={logoImg} width={72} />
        <Title>
          Organize seus{'\n'}
          boletos em um{'\n'}
          só lugar
        </Title>

        {!loading ? (
          <Outlined>
            <Button onPress={handleSignIn}>
              <ButtonIcon>
                <Image source={googleIcon} />
              </ButtonIcon>
              <ButtonText>Entrar com Google</ButtonText>
            </Button>
          </Outlined>
        ) : (
          <WrapperLoading>
            <Load size={35} />
          </WrapperLoading>
        )}
      </Content>
    </Container>
  );
}
