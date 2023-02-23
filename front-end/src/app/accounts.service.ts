import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccount } from './IAccount.interface';
import { ICustomer } from './ICustomer.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  customerState!: ICustomer;
  accountsState = new BehaviorSubject<IAccount[]>([]);
  userService = inject(UserService);
  accounts$ = this.accountsState.asObservable();
  http = inject(HttpClient);

  constructor() {
    this.userService.customerState$.subscribe((data) => {
      this.customerState = data;
    });
  }

  getAccounts() {
    this.http
      .get<IAccount[]>(
        'http://localhost:8081/customers/' +
          this.customerState.id +
          '/accounts',
        {}
      )
      .subscribe(
        (data) => {
          this.accountsState.next(data);
        },
        (error: any) => {
          if (error.status === 401) {
            this.userService.logout();
          }
        }
      );
  }

  getAccount(id: string) {
    return this.http.get<IAccount>(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        id
    );
  }

  createAccount(account: { type: string; balance: number }) {
    return this.http.post<IAccount>(
      'http://localhost:8081/customers/' + this.customerState.id + '/accounts',
      account
    );
  }

  updateAccount(account: IAccount) {
    return this.http.put<IAccount>(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        account.id,
      account
    );
  }

  deleteAccount(id: string) {
    return this.http.delete(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        id
    );
  }

  deposit<IAccount>(accountId: string, amount: number) {
    return this.http.put<IAccount>(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        accountId +
        '/deposit?amount=' +
        amount,
      null
    );
  }

  withdraw<IAccount>(accountId: string, amount: number) {
    return this.http.put<IAccount>(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        accountId +
        '/withdraw?amount=' +
        amount,
      null
    );
  }
  transfer<IAccount>(accountFrom: string, accountTo: string, amount: number) {
    return this.http.put<IAccount>(
      'http://localhost:8081/customers/' +
        this.customerState.id +
        '/accounts/' +
        accountFrom +
        '/transfer/' +
        accountTo +
        '?amount=' +
        amount,
      null
    );
  }
}
