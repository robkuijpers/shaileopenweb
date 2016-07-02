import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LoginService }     from './login.service';

@Component({
  selector: 'my-app',
  template: `<h3>{{title}}</h3>
             <nav>
               <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
               <a [routerLink]="['/login']">Login</a>
             </nav>  
             <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    LoginService
  ]
})

export class AppComponent {
  title = 'Hello';
}
