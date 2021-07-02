import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';

export function formatDate(date: Date, pattern = 'PP') {
  return format(new Date(date), pattern, {
    locale: ptBR,
  });
}
