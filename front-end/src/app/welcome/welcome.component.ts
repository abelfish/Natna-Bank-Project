import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControlName,
} from '@angular/forms';
import { IUser } from '../IUser.interface';
import { ICustomer } from '../ICustomer.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-welcome',
  template: `
    <section class="pt-32 dark:bg-gray-900">
      <div class=" grid py-8 lg:py-16 lg:grid-cols-12">
        <div
          class=" bg-stone-800 bg-opacity-80 p-6 rounded-lg place-self-center lg:col-span-7"
        >
          <h1
            class="max-w-2xl mb-4 text-4xl text-white font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
          >
            Take advantage of our Low Rates and High Yields.
          </h1>
          <p
            class="max-w-2xl  text-white mb-6 font-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            Getting started is fast and easy. Checking your eligibility won’t
            impact your credit score. Open a new eligible checking account and
            earn a cash bonus with required activities. Member FDIC.
          </p>
          <a
          *ngIf="!token"
            routerLink="/signup"
            class="inline-flex items-center hover:bg-stone-800 justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg hover:  focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex hover:bg-stone-300 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Speak to an Agent
          </a>
        </div>
       
        <div *ngIf="!token"
          class="bg-stone-800 bg-opacity-80 my-auto mr-32 p-12 rounded-lg  lg:col-span-5"
        >
          <h2 class="text-2xl font-bold text-white mb-4 dark:text-white">
            Sign in
          </h2>
          <p
            class="text-white mb-6 font-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            Sign in to your account to access your profile, check your
            application status, and more.
          </p>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="login()"
            class="p-6"
            
          >
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-white"
                >Your Username</label
              >
              <input
                formControlName="username"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-900 focus:border-stone-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                [required]="true"
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-white"
                >Your password</label
              >
              <input
                type="password"
                formControlName="password"
                id="password"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-900 focus:border-stone-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                [required]="true"
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="inline-flex items-center hover:bg-stone-400 justify-center px-5 py-3 text-base font-medium text-center bg-stone-200 rounded-lg bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Sign in
              </button>
            </div>
            <div class="">
              <p class="text-white text-center">{{ message }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
    <div
      style="background-image: url('./assets/homepage.jpg')"
      class=" bg-slate-500"
    ></div>
  `,
  styles: [],
})
export class WelcomeComponent {
  userState!: ICustomer;
  token = localStorage.getItem('accessToken');
  router = inject(Router);
  userService = inject(UserService);
  message = '';

  loginForm = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {}

  login() {
    this.userService
      .login(this.loginForm.value as { username: string; password: string })
      .subscribe(
        (data) => {
          this.message = 'Login successful, redirecting...';
          const decoded: any = jwt_decode(data.accessToken);
          localStorage.setItem('accessToken', data.accessToken);
          this.userService.getCustomerInfo(decoded.sub).subscribe((data) => {
            this.userService.setCustomerState(data);
            console.log(data);
          });
          this.userService.getUserInfo(decoded.sub).subscribe((data) => {
            this.userService.setUserState(data);
            console.log(data);
          });
          setTimeout(() => {
            this.router.navigate(['/accounts']);
          }, 2000);

        },
        (err) => {
          if (err.status === 401)
            this.message = 'Login failed: email or password is incorrect';
          else {
            this.message = 'Login failed: ' + err.error.message;
          }
        }
      );
  }
}
