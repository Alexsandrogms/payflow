import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, RefreshControl } from 'react-native';

import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { ListHeader } from '../../components/ListHeader';
import { Ticket } from '../../components/Ticket';
import { TicketType, useTicket } from '../../hooks/useTicket';

import { Container, Content, TicketSeparator } from './styles';

export function Extracts() {
  const { tickets, loadTickets } = useTicket();

  const [extracts, setExtracts] = useState<TicketType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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
        setExtracts(tickets.filter((ticket) => ticket.isPay === true));
      }
    }, [tickets])
  );

  return (
    <Container>
      <Header />

      <Content>
        <ListHeader
          title="Meus extratos"
          subtitle={`${extracts?.length ?? 0} ao total`}
        />

        <Divider />

        <FlatList
          data={extracts}
          style={{ marginTop: 32 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <TicketSeparator />}
          renderItem={({ item }) => (
            <Ticket
              disabled={true}
              key={item.id}
              title={item.title}
              price={item.value}
              dueDate={item.dueDate}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Content>
    </Container>
  );
}
