import { IAccount } from "./IAccount.interface";

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  accounts: IAccount[];
}
