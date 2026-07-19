export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface TicketPurchaseData {
  evento: string;
  fecha: string;
  lugar: string;
  zona: string;
  tipo: string;
  precio: number;
}
