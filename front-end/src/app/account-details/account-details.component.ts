import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { IAccount } from '../IAccount.interface';

@Component({
  selector: 'app-account-details',
  template: ` <div class="p-20">
    <div class="p-4 bg-stone-900 bg-opacity-80">
      <h2 class="text-white text-4xl mb-10 font-semibold">Account Details</h2>

      <p class="text-white text-2xl my-4">Account Number: {{ account.id }}</p>
      <p class="text-white text-2xl my-4">Account Type: {{ account.type }}</p>
      <p class="text-white text-2xl my-4">
        Account Balance: {{ account.balance }}
      </p>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <p class="text-white text-2xl mt-4">
          Here is a list of all transactions on the account.
        </p>
        <table
          class="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Transaction ID
              </th>
              <th scope="col"class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Amount</th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Transaction Type
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Balance</th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Date and Time</th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">From</th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">To</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of account.transactions">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                {{ transaction.id }}
              </th>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.amount }}</td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.type }}</td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.balance }}</td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.dateTime }}</td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.from }}</td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">{{ transaction.to }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`,
  styles: [],
})
export class AccountDetailsComponent {
  id!: string;
  account: IAccount = { id: '', type: '', balance: 0, transactions: [] };
  accountService = inject(AccountsService);
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.accountService.getAccount(this.id).subscribe((data) => {
      this.account = data;
    });
  }
}
