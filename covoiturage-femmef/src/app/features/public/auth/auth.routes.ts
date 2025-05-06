
import { Routes } from '@angular/router';
import { RegisterConductriceComponent } from './register-conductrice/register-conductrice.component';
import { RegisterPassagereComponent } from './register-passager/register-passager.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register-conductrice',
    component: RegisterConductriceComponent,
  },
  {
    path: 'register-passager',
    component: RegisterPassagereComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  }
];
