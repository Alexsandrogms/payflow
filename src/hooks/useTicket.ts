import React, { useEffect, useState } from 'react';

import { getStorageItem, setStorageItem } from '../utils/storage';
import { COLLECTION_TICKETS } from '../constants';

export type TicketType = {
  id: string;
  title: string;
  dueDate: Date;
  value: number;
  barcode: string;
  createdAt: Date;
  isPay: boolean;
};

export function useTicket() {
  const [tickets, setTickets] = useState<TicketType[]>();

  async function handleAddNewTicket(ticket: TicketType) {
    const storedTickets = await getStorageItem(COLLECTION_TICKETS);

    const ticketsStored = JSON.parse(storedTickets ?? '') || [];

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: [ticket, ...ticketsStored],
    });
  }

  async function loadTickets() {
    const stored = await getStorageItem(COLLECTION_TICKETS);

    if (stored) {
      setTickets(JSON.parse(stored));
    }

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
  }

  async function handleRemoveTicket(ticketId: string) {
    const stored = await loadTickets();

    const ticketsStored: TicketType[] = JSON.parse(stored ?? '') || [];

    const newTickets = ticketsStored.filter((ticket) => ticket.id !== ticketId);

    await setStorageItem({
      key: COLLECTION_TICKETS,
      value: newTickets,
    });
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return {
    tickets,
    loadTickets,
    handleAddNewTicket,
    handleMarkTicketAsPaid,
    handleRemoveTicket,
  };
}
