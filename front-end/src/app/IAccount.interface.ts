import { ITransaction } from './ITransaction.interface';

export interface IAccount {
  id: string;
  type: string;
  balance: number;
  transactions: ITransaction[];
}
