import { User } from './user.interface';

export interface Item {
  id?: number;
  nome: string;
  data: Date;
  valor: number;
  tipo: number;
  pago?: boolean;
  user: User;
  installments: number;
}
