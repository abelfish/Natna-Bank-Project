import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from '../ICustomer.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  template: `
    <nav
      class="  px-2 sm:px-4 py-2 dark:bg-gray-900 fixed w-full top-0 left-0  dark:border-gray-600"
    >
      <div
        class="container flex flex-wrap items-center justify-between mx-auto"
      >
        <a href="" class="flex items-center">
          <img src="assets/icon.png" class="h-12  mr-3 " alt="Logo" />
          <span class="self-center  text-2xl font-semibold dark:"
            >Natna Bank</span
          >
        </a>
        <div class="flex md:order-2">
          <a
            routerLink="/signup"
            *ngIf="userState.id === ''; else logoutButton"
            type="button"
            class=" text-xl hover:text-stone-400 focus:ring-4 focus:outline-none  font-medium rounded-lg px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </a>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
        *ngIf="userState.id !== ''"
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            class="flex flex-col p-4 mt-4  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 hover:text-stone-400  rounded md:bg-transparent md:md:p-0 dark: "
                aria-current="page"
                >Home</a
              >
            </li>
            <li>
              <a
                routerLink="/accounts"
                href="#"
                class="block py-2 pl-3 pr-4  rounded hover:text-stone-400 md:hover:bg-transparent  md:p-0 md:dark:hover: dark:text-gray-400 dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700"
                >Accounts</a
              >
            </li>

            <div class="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  class="block py-2 pl-3 pr-4  rounded hover:text-stone-400  md:p-0 md:dark:hover: dark:text-gray-400 dark:hover:bg-gray-700 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700"
                  id="menu-button"
                  (click)="toggleMenu()"
                >
                  Services
                </button>
              </div>
              <div
                *ngIf="menuVisible | async"
                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <a
                    routerLink="/deposit"
                    (click)="toggleMenu()"
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    >Deposit</a
                  >
                  <a
                    routerLink="/withdraw"
                    (click)="toggleMenu()"
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                    >Withdraw</a
                  >
                  <a
                    routerLink="/transfer"
                    (click)="toggleMenu()"
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                    >Transfer</a
                  >
                </div>
              </div>
            </div>

            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 rounded hover:text-stone-400  md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <ng-template #logoutButton>
      <label class="mx-4 m-auto"> Hi {{ userState.firstName }} </label>
      <button
        (click)="logout()"
        class="bg-stone-800 text-white  hover:bg-stone-500 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Log Out
      </button>
    </ng-template>
  `,
  styles: [],
})
export class NavBarComponent implements OnInit {
  userService = inject(UserService);
  userState: ICustomer = {} as ICustomer;
  router = inject(Router);
  menuVisible = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.userService.customerState$.subscribe((state) => {
      this.userState = state;
    });
  }

  constructor() {}

  toggleMenu() {
    this.menuVisible.next(!this.menuVisible.value);
  }
  logout() {
    this.userService.logout();
  }
}
