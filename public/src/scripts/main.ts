import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
// import { enableProdMode } from '@angular/core';

import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AuthGuard } from './authguard.service';

// enableProdMode();

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  AuthGuard
]);
