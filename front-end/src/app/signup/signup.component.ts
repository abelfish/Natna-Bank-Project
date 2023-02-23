import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from '../ICustomer.interface';
import { IUser } from '../IUser.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container max-w-full mx-auto py-24 px-6">
      <div
        class="max-w-sm mx-auto px-6 bg-stone-900 bg-opacity-80 rounded-lg shadow py-4"
      >
        <div class="relative flex flex-wrap">
          <div class="w-full relative">
            <div class="md:mt-6">
              <div class="text-center font-semibold text-white text-2xl mb-2">
                Create Account
              </div>
              <div class="text-center font-base text-white">
                Please fill in the form below to create an account.
              </div>
              <form [formGroup]="signupForm" class="mt-8" (ngSubmit)="signup()">
                <div class="py-1">
                  <span class="px-1 text-white ">First Name</span>
                  <input
                    placeholder=""
                    formControlName="firstName"
                    type="text"
                    x-model="password_confirm"
                    class="mt-2 text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div class="py-1">
                  <span class="px-1 text-white ">Last Name</span>
                  <input
                    placeholder=""
                    formControlName="lastName"
                    type="text"
                    x-model="password_confirm"
                    class="mt-2 text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                </div>
                <div class="mx-auto max-w-lg ">
                  <div class="py-1">
                    <span class=" text-white mb-4 px-1">Username</span>
                    <input
                      placeholder=""
                      formControlName="username"
                      type="text"
                      class="mt-2 text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div class="py-1">
                    <span class="px-1  text-white">Email</span>
                    <input
                      placeholder=""
                      formControlName="email"
                      type="email"
                      class="mt-2 text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div class="py-1">
                    <span class="px-1  text-white">Password</span>
                    <input
                      placeholder=""
                      formControlName="password"
                      type="password"
                      x-model="password"
                      class="mt-2 text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>

                  <div class=" font-semibold block py-6  justify-center">
                    <a
                      routerLink="/"
                      class="text-white font-normal border-b-2 border-gray-200 hover:border-teal-500"
                      >You're already member?
                      <span class="text-white font-semibold"> Login </span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    class="mt-3 text-lg font-semibold
            bg-stone-300 w-full rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Register
                  </button>

                  <div class="text-center  text-white text-2xl mb-2">
                    {{ message }}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  message: string = '';
  userService = inject(UserService);
  signupForm = inject(FormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  router = inject(Router);
  constructor() {}
  signup() {
    const customer = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
    };
    const user = {
      username: this.signupForm.value.username as string,
      email: this.signupForm.value.email as string,
      password: this.signupForm.value.password as string,
    };
    this.userService.signup(user as IUser).subscribe(
      (res) => {
        this.message = "You've successfully created an account, please login";
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      (err) => {
        console.log(err);
        this.message = 'Unable to create Account, ' + err.error;
      }
    );
    this.userService.addCustomer(customer as ICustomer).subscribe((res) => {
      console.log(res);
    });
  }
}
