import { Component, inject, OnInit } from '@angular/core';
import { IAccount } from '../IAccount.interface';
import { AccountsService } from '../accounts.service';
import { FormBuilder } from '@angular/forms';
import { ICustomer } from '../ICustomer.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  template: `
    <div class="p-40 m-auto">
      <div class="w-1/2 mx-auto bg-stone-900 bg-opacity-80 rounded-lg p-6">
        <form [formGroup]="transferForm" (ngSubmit)="onTransfer()">
          <div>
            <h1 class="text-white text-2xl font-semibold mt-6 mb-4">
              Transfer
            </h1>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-white"
              >Select From which Account you want to transfer</label
            >
            <select
              formControlName="accountFrom"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option *ngFor="let account of accounts" [value]="account.id">
                {{ account.id }}
              </option>
            </select>

            <label
              for="countries"
              class="block mt-6 mb-2 text-sm font-medium text-white"
              >Account you want to transfer to</label
            >
            <input
              formControlName="accountTo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="amount"
              name="amount"
            />
            <label
              for="countries"
              class="block mt-6 mb-2 text-sm font-medium text-white"
              >Amount</label
            >
            <input
              formControlName="amount"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="amount"
              name="amount"
            />
          </div>
          <button
            class=" rounded font-semibold bg-white px-5 py-2 mt-10 "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class TransferComponent implements OnInit {
  accounts: IAccount[] = [];
  userService = inject(UserService);
  router = inject(Router);

  transferForm = inject(FormBuilder).nonNullable.group({
    accountFrom: '',
    accountTo: '',
    amount: 0,
  });

  constructor(private accountsService: AccountsService) {
    this.accountsService.accounts$.subscribe((accounts) => {
      this.accounts = accounts;
    });
    this.accountsService.getAccounts();
  }
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onTransfer() {
    this.accountsService
      .transfer(
        this.transferForm.value.accountFrom as string,
        this.transferForm.value.accountTo as string,
        this.transferForm.value.amount as number
      )
      .subscribe((data) => console.log(data));
  }
}
