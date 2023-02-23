import { Component, inject } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '../IAccount.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  template: `
    <div class=" p-40 m-auto">
      <div
        class="w-1/2 py-6 px-24 rounded-lg bg-opacity-90 mx-auto bg-stone-900"
      >
        <h1 class="text-white text-2xl mt-5 font-semibold">
          Create New Account
        </h1>
        <form [formGroup]="createForm" (ngSubmit)="onCreateAccount()">
          <div>
            <label class="block mt-6 mb-2 text-sm  font-medium text-white"
              >Select Account Type</label
            >
            <select
              formControlName="type"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option [value]="checking">Checking</option>
              <option [value]="savings">Savings</option>
            </select>

            <label
              for="countries"
              class="block mt-6 mb-2 text-sm font-medium text-white"
              >Starting Balance</label
            >
            <input
              formControlName="balance"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div>
            <button
              class=" rounded bg-white font-semibold px-4 py-2 mt-8 mr-8"
              type="submit"
            >
              Submit
            </button>
            <button
              (click)="router.navigate(['/accounts'])"
              class=" rounded hover:bg-slate-400 hover:text-black text-white text-lg font-semibold px-4 py-2 mt-8 "
              type="submit">
            
              Back
            </button>
          </div>
        </form>
        <p class=" text-white mt-3">
          {{ message }}
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class AddAccountComponent {
  message = '';
  accountService = inject(AccountsService);
  checking = 'Checking';
  savings = 'Savings';
  router = inject(Router);
  createForm = inject(FormBuilder).nonNullable.group({
    type: ['', Validators.required],
    balance: [0, Validators.required],
  });
  onCreateAccount() {
    this.accountService
      .createAccount(this.createForm.value as { type: string; balance: number })
      .subscribe(() => {
        this.message = 'Account Created';
        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 3000);
      });
  }
}
