import { Component, inject } from '@angular/core';
import { IAccount } from '../IAccount.interface';
import { AccountsService } from '../accounts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  template: `
    <div class="p-32 ">
      <div class="w-1/2 mx-auto bg-stone-900 bg-opacity-80 p-8 rounded-lg">
        <form [formGroup]="withdrawForm" (ngSubmit)="onWithdraw()">
          <h1 class="text-white text-2xl font-semibold my-4">Withdraw</h1>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-white"
              >Select Account</label
            >
            <select
              formControlName="account"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option *ngFor="let account of accounts" [value]="account.id">
                {{ account.id }}
              </option>
            </select>

            <label
              for="countries"
              class="block mb-2 text-sm font-medium mt-4 text-white"
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
            class=" rounded font-semibold bg-white px-4 py-2 mt-6 "
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
export class WithdrawComponent {
  accounts: IAccount[] = [];
  userService = inject(UserService);
  router = inject(Router);

  withdrawForm = inject(FormBuilder).nonNullable.group({
    account: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor(private accountsService: AccountsService) {
    this.accountsService.accounts$.subscribe((accounts) => {
      this.accounts = accounts;
    });
    this.accountsService.getAccounts();
  }

  onWithdraw() {
    this.accountsService
      .withdraw(
        this.withdrawForm.value.account as string,
        this.withdrawForm.value.amount as number
      )
      .subscribe((data) => console.log(data));
  }
}
