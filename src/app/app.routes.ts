import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordUpdateComponent } from './pages/password-update/password-update.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password/reset', component: PasswordResetComponent },
  { path: 'password/update', component: PasswordUpdateComponent },
];
