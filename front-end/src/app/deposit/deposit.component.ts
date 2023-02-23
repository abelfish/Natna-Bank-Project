import { Component, inject } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { IAccount } from '../IAccount.interface';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  template: `
    <div class=" p-40 m-auto">
      <div
        class="w-1/2 py-6 px-24 rounded-lg bg-opacity-90 mx-auto bg-stone-900"
      >
        <h1 class="text-white text-2xl mt-5 font-semibold">Deposit</h1>
        <form [formGroup]="depositForm" (ngSubmit)="onDeposit()">
          <div>
            <label class="block mt-6 mb-2 text-sm  font-medium text-white"
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
            class=" rounded bg-white font-semibold px-4 py-2 mt-8 "
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
export class DepositComponent {
  accounts: IAccount[] = [];
  userService = inject(UserService);
  router = inject(Router);

  depositForm = inject(FormBuilder).nonNullable.group({
    account: '',
    amount: 0,
  });
  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  constructor(private accountsService: AccountsService) {
    this.accountsService.accounts$.subscribe((accounts) => {
      this.accounts = accounts;
    });
    this.accountsService.getAccounts();
  }

  onDeposit() {
    this.accountsService
      .deposit(
        this.depositForm.value.account as string,
        this.depositForm.value.amount as number
      )
      .subscribe((data) => console.log(data));
  }
}
