export type TicketType = {
  id: string;
  title: string;
  dueDate: Date;
  value: number;
  barcode: string;
  createdAt: Date;
  isPay: boolean;
  hasNotification: boolean;
};
