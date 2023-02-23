export interface ITransaction {
  id: string;
  type: string;
  amount: number;
  dateTime: string;
  from: string;
  to: string;
  balance: number;
}
