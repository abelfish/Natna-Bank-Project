import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';
import { AddTokenInterceptor } from './add-token.interceptor';
import { AddAccountComponent } from './add-account/add-account.component';

function initApp(userService: UserService) {
  return () => {
    const localStorageState = localStorage.getItem('USER_STATE');
    const localStorageCustomerState = localStorage.getItem('CUSTOMER_STATE');
    if (localStorageState && localStorageCustomerState) {
      userService.setUserState(JSON.parse(localStorageState));
      userService.setCustomerState(JSON.parse(localStorageCustomerState));
    }
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    AccountsComponent,
    AccountDetailsComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent,
    SignupComponent,
    AddAccountComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'accounts', component: AccountsComponent, pathMatch: 'full' },
      {
        path: 'accounts/:id',
        component: AccountDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-account',
        component: AddAccountComponent,
        pathMatch: 'full',
      },
      {
        path: 'deposit',
        component: DepositComponent,
        pathMatch: 'full',
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
        pathMatch: 'full',
      },
      {
        path: 'transfer',
        component: TransferComponent,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
      },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [UserService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
