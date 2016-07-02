import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';

const routes: RouterConfig = [
  { path: '', redirectTo: '/dashboard', terminal: true },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
