import React, { useCallback, useState, useEffect } from 'react';
import { isBefore } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatList, RefreshControl } from 'react-native';

import { Header } from '../../components/Header';
import { TicketCounter } from '../../components/TicketCounter';
import { Divider } from '../../components/Divider';
import { ListHeader } from '../../components/ListHeader';
import { Ticket } from '../../components/Ticket';
import { ModalView } from '../../components/ModalView';
import { getStorageItem, setStorageItem } from '../../utils/storage';
import { COLLECTION_TICKETS } from '../../constants';
import { TicketType } from '../../global/types/ticket';

import { Container, Content, TicketSeparator } from './styles';

export function Home() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticketSelected, setTicketSelected] = useState<TicketType>(
    {} as TicketType
  );

  const [openModalAction, setOpenModalAction] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  function handleSelectTicket(ticket: TicketType) {
    setTicketSelected(ticket);
    setOpenModalAction(true);
  }

  function handleCloseModal() {
    setTicketSelected({} as TicketType);
    setOpenModalAction(false);
  }

  function checkIsDueDateExpired(ticket: TicketType) {
    return isBefore(new Date(ticket.dueDate), new Date());
  }

  async function loadTickets() {
    const storage = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored: TicketType[] = JSON.parse(storage || '[]');

    const filterTickets = ticketsStored?.filter(
      (ticket) => ticket.isPay === false
    );

    setTickets(filterTickets);
  }

  async function handleMarkTicketAsPaid(ticketId: string) {
    const stored = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored: TicketType[] = JSON.parse(stored ?? '') || [];

    ticketsStored.forEach((ticket) => {
      if (ticket.id === ticketId) {
        ticket.isPay = true;
      }

      return ticket;
    });

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: ticketsStored,
    });

    await loadTickets();
  }

  async function handleRemoveTicket(ticketId: string) {
    const stored = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored: TicketType[] = JSON.parse(stored ?? '') || [];

    const newTickets = ticketsStored.filter((ticket) => ticket.id !== ticketId);

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: newTickets,
    });

    await loadTickets();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(async () => {
      await loadTickets();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadTickets();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header />

      <Content>
        <TicketCounter amount={tickets.length} />

        <ListHeader
          title="Meus boletos"
          subtitle={`${tickets.length} ao total`}
        />

        <Divider />

        <FlatList
          data={tickets}
          style={{ marginTop: 32, marginBottom: getBottomSpace() + 95 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <TicketSeparator />}
          renderItem={({ item }) => (
            <Ticket
              key={item.id}
              data={item}
              isDateExpired={checkIsDueDateExpired(item)}
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
        handleMarkTicketAsPaid={handleMarkTicketAsPaid}
        handleRemoveTicket={handleRemoveTicket}
      />
    </Container>
  );
}
