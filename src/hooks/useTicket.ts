import React, { useCallback, useState } from 'react';

import { getStorageItem, setStorageItem } from '../utils/storage';
import { COLLECTION_TICKETS } from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';

export function useTicket() {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  async function handleAddNewTicket(ticket: TicketType) {
    const storedTickets = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored = JSON.parse(storedTickets || '[]');

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: [ticket, ...ticketsStored],
    });
  }

  async function loadTickets() {
    const stored = await getStorageItem(COLLECTION_TICKETS);

    return stored;
  }

  async function handleMarkTicketAsPaid(ticketId: string) {
    const stored = await loadTickets();

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
    const stored = await loadTickets();

    const ticketsStored: TicketType[] = JSON.parse(stored || '[]');

    const newTickets = ticketsStored.filter((ticket) => ticket.id !== ticketId);

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: newTickets,
    });

    await loadTickets();
  }

  useEffect(() => {
    (async () => {
      const storage = await loadTickets();

      setTickets(JSON.parse(storage || '[]'));
    })();
  }, []);

  return {
    tickets,
    loadTickets,
    handleAddNewTicket,
    handleMarkTicketAsPaid,
    handleRemoveTicket,
  };
}
