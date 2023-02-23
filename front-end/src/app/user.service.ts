import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from './ICustomer.interface';
import { IUser } from './IUser.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setCustomerState(data: ICustomer) {
    this.customerState.next(data);
    localStorage.setItem('CUSTOMER_STATE', JSON.stringify(data));
  }
  isLoggedIn() {
    return localStorage.getItem('USER_STATE') !== null;
  }
  http = inject(HttpClient);
  router = inject(Router);
  userState = new BehaviorSubject<IUser>({
    id: '',
    username: '',
    email: '',
    password: '',
    roles: [],

  });
  customerState = new BehaviorSubject<ICustomer>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    accounts: [],
  });
  setUserState(user: IUser) {
    this.userState.next(user);
    localStorage.setItem('USER_STATE', JSON.stringify(user));
  }
  userState$ = this.userState.asObservable();
  customerState$ = this.customerState.asObservable();

  constructor() {}

  login(user: { username: string; password: string }) {
    return this.http.post<{ accessToken: string }>(
      'http://localhost:8081/users/login',
      user
    );
  }

  signup(user: IUser) {
    return this.http.post<IUser>('http://localhost:8081/users', user);
  }

  addCustomer(customer: ICustomer) {
    return this.http.post<ICustomer>(
      'http://localhost:8081/customers',
      customer
    );
  }
  logout() {
    this.setUserState({
            id: '',
      email: '',
      username: '',
      password: '',
      roles: [],
    });
    this.setCustomerState({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      accounts: [],
    });
    localStorage.removeItem('USER_STATE');
    localStorage.removeItem('CUSTOMER_STATE');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  getCustomerInfo(username: string) {
    console.log('getCustomerInfo');
    console.log(username);
    console.log(localStorage.getItem('accessToken') as string);
    return this.http.get<ICustomer>(
      'http://localhost:8081/customers/username/' + username
    );
  }
  getUserInfo(username: string) {
    return this.http.get<IUser>(
      'http://localhost:8081/users/username/' + username
    );
  }
}
