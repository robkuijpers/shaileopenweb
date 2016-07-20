import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './authguard.service';

const routes: RouterConfig = [
  { path: '', redirectTo: 'login', terminal: true },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
