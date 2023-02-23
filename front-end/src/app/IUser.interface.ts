import { IRole } from './IRole.interface';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: IRole[];
}
