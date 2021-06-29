import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, RefreshControl } from 'react-native';

import { Header } from '../../components/Header';
import { TicketCounter } from '../../components/TicketCounter';
import { Divider } from '../../components/Divider';
import { ListHeader } from '../../components/ListHeader';
import { Ticket } from '../../components/Ticket';
import { ModalView } from '../../components/ModalView';
import { TicketType, useTicket } from '../../hooks/useTicket';

import { Container, Content, TicketSeparator } from './styles';

export function Home() {
  const { tickets, loadTickets } = useTicket();

  const [openModalAction, setOpenModalAction] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [ticketSelected, setTicketSelected] = useState<TicketType>(
    {} as TicketType
  );
  const [myTickets, setMyTickets] = useState<TicketType[]>([]);

  function handleSelectTicket(ticket: TicketType) {
    setTicketSelected(ticket);
    setOpenModalAction(true);
  }

  function handleCloseModal() {
    setTicketSelected({} as TicketType);
    setOpenModalAction(false);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      loadTickets();
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTickets();

      if (tickets) {
        setMyTickets(tickets.filter((ticket) => ticket.isPay === false));
      }
    }, [tickets])
  );

  return (
    <Container>
      <Header />

      <Content>
        <TicketCounter amount={myTickets.length} />

        <ListHeader
          title="Meus boletos"
          subtitle={`${myTickets.length} ao total`}
        />

        <Divider />

        <FlatList
          data={myTickets}
          style={{ marginTop: 32 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <TicketSeparator />}
          renderItem={({ item }) => (
            <Ticket
              key={item.id}
              title={item.title}
              price={item.value}
              dueDate={item.dueDate}
              onPress={() => handleSelectTicket(item)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Content>
      <ModalView
        visible={openModalAction}
        ticketSelected={ticketSelected}
        closeModal={handleCloseModal}
      />
    </Container>
  );
}
