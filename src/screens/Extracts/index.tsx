import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, RefreshControl } from 'react-native';

import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { ListHeader } from '../../components/ListHeader';
import { Ticket } from '../../components/Ticket';

import { Container, Content, TicketSeparator } from './styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getStorageItem } from '../../utils/storage';
import { COLLECTION_TICKETS } from '../../constants';

type TicketType = {
  id: string;
  title: string;
  dueDate: Date;
  value: number;
  barcode: string;
  createdAt: Date;
  isPay: boolean;
  hasNotification: boolean;
};

export function Extracts() {
  const [extracts, setExtracts] = useState<TicketType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  async function loadTickets() {
    const storage = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored: TicketType[] = JSON.parse(storage || '[]');

    const filterTickets = ticketsStored?.filter(
      (ticket) => ticket.isPay === true
    );

    setExtracts(filterTickets);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      loadTickets();
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
        <ListHeader
          title="Meus extratos"
          subtitle={`${extracts?.length ?? 0} ao total`}
        />

        <Divider />

        <FlatList
          data={extracts}
          style={{ marginTop: 32, marginBottom: getBottomSpace() + 95 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 48 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <TicketSeparator />}
          renderItem={({ item }) => (
            <Ticket disabled key={item.id} data={item} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Content>
    </Container>
  );
}
