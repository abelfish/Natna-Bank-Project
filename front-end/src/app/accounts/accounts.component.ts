import { Component, inject } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { IAccount } from '../IAccount.interface';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ICustomer } from '../ICustomer.interface';

@Component({
  selector: 'app-accounts',
  template: `
    <section class=" dark:bg-gray-900 px-10 pt-52 ">
      <div class="py-30"></div>
      <div
        class=" rounded-lg bg-stone-800 bg-opacity-90 grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 "
      >
        <div class="max-w-screen-md  mb-8 lg:mb-16">
          <h2
            class="mb-6 text-4xl tracking-tight font-extrabold text-white dark:text-white"
          >
            Welcome, {{ name }}!
          </h2>
          <a class="bg-white rounded-lg px-3 py-2" routerLink="/add-account">Create Account</a>
        </div>
        <div class="space-y-8  md:space-y-0">
          <div>
            <h3 class="mb-2 text-xl font-bold text-white">Accounts</h3>
            <p class="text-white dark:text-gray-400">
              Here is a list of all accounts associated with your Name.
            </p>
          </div>

          <div class="pt-4">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Account Number</th>
                  <th scope="col" class="px-6 py-3">Type</th>
                  <th scope="col" class="px-6 py-3">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let account of accounts"
                  (click)="openAccountDetails(account.id)"
                  class="bg-white hover:bg-stone-200 dark:bg-gray-800"
                  role="button"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- <a class="" routerLink="/accounts/{{ account.id }}" a
                        >open</a
                      > -->
                    {{ account.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ account.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ account.balance }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <!-- <ng-template #empty>
      <div class="text-center">
        <h3 class="text-2xl">No Accounts Found</h3>
      </div>
    </ng-template> -->
  `,
  styles: [],
})
export class AccountsComponent {
  name: string = '';
  accounts: IAccount[] = [];
  accountService = inject(AccountsService);

  userService = inject(UserService);
  router = inject(Router);
  ngOnInit(): void {}

  constructor() {
    if (localStorage.getItem('accessToken') === null) {
      this.router.navigate(['']);
    }
    this.userService.customerState$.subscribe((customer) => {
      this.name = customer.firstName;
    });
    this.accountService.accounts$.subscribe((accounts) => {
      this.accounts = accounts;
    });
    this.accountService.getAccounts();
  }
  openAccountDetails(accountId: string) {
    this.router.navigate(['/accounts', accountId]);
  }
}
