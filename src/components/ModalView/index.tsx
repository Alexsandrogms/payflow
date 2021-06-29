import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';

import { theme } from '../../global/styles/theme';
import { formatCurrency } from '../../utils/formatCurrency';
import { useTicket } from '../../hooks/useTicket';

import {
  Button,
  ButtonIcon,
  ButtonIconText,
  ButtonText,
  Container,
  Content,
  Highlight,
  Indicator,
  Outlined,
  Overlay,
  Title,
  WrapperButtons,
} from './styles';

type ModalViewProps = ModalProps & {
  ticketSelected: {
    id: string;
    title: string;
    value: number;
  };
  closeModal: () => void;
};

export function ModalView({
  ticketSelected,
  closeModal,
  ...rest
}: ModalViewProps) {
  const { handleMarkTicketAsPaid, handleRemoveTicket } = useTicket();

  async function handleTicketAsPaid() {
    await handleMarkTicketAsPaid(ticketSelected.id);
    closeModal();
  }

  async function handleRemove() {
    await handleRemoveTicket(ticketSelected.id);
    closeModal();
  }

  return (
    <Modal transparent statusBarTranslucent animationType="slide" {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <Overlay>
          <Container>
            <Indicator />

            <Content>
              <Title>
                O boleto <Highlight>{ticketSelected?.title}</Highlight> no valor
                de{' '}
                <Highlight>
                  {formatCurrency(ticketSelected?.value ?? 0)}
                </Highlight>{' '}
                foi pago ?
              </Title>

              <WrapperButtons>
                <Outlined>
                  <Button variant="shape" onPress={closeModal}>
                    <ButtonText>Ainda não</ButtonText>
                  </Button>
                </Outlined>
                <Button variant="primary" onPress={handleTicketAsPaid}>
                  <ButtonText variant="primary">Sim</ButtonText>
                </Button>
              </WrapperButtons>

              <ButtonIcon onPress={handleRemove}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color={theme.colors.delete}
                />
                <ButtonIconText>Deletar boleto</ButtonIconText>
              </ButtonIcon>
            </Content>
          </Container>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
