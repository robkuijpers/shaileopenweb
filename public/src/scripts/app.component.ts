import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdInput } from '@angular2-material/input';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { PageHeader } from './pageheader.component';
import { NotificationBar } from './notificationbar.component';
import { PageFooter } from './pagefooter.component';
import { LoginService } from './login.service';

@Component({
  selector: 'my-app',
  template: `<div>
               <md-sidenav-layout fullscreen>
               
                 <md-sidenav #sidenav>
                    <md-nav-list (click)="sidenav.close()">
                      <a [routerLink]="[view.path]" md-list-item *ngFor="let view of views">
                        <md-icon md-list-icon>{{view.icon}}</md-icon>
                        <span md-line>{{view.name}}</span>
                      </a>
                    </md-nav-list>
                 </md-sidenav>

                 <md-toolbar color="primary">
                   <button md-icon-button (click)="sidenav.open()">
                     <md-icon>menu</md-icon>
                   </button>
                   {{title}}
                   <span flex style="flex-grow: 1"></span>
                   <button md-icon-button>
                     <md-icon>perm_identity</md-icon>
                   </button>
                 </md-toolbar>

                 <my-notificationbar></my-notificationbar>

                 <router-outlet></router-outlet>

                 <my-pagefooter></my-pagefooter>

               </md-sidenav-layout>  
             </div>`,
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MdToolbar,
    MdIcon,
    MdInput,
    PageHeader,
    NotificationBar,
    PageFooter
  ],
  providers: [
    LoginService, MdIconRegistry
  ]
})

export class AppComponent {

  title: String = 'Shaile Open';

  views: Object[] = [
      {
        name: 'Home',
        icon: 'home',
        path: 'home',
        roles: ['user', 'admin']
      },
      {
        name: 'Login',
        icon: 'perm_identity',
        path: 'login',
        roles: ['']
      },
      {
        name: 'Dashboard',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['user', 'admin']
      },
      {
        name: 'Spelers',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['user', 'admin']
      },
      {
        name: 'Wedstrijden',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['user', 'admin']
      },
      {
        name: 'Onderdelen',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['admin']
      },
      {
        name: 'Programma',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['user', 'admin']
      },
      {
        name: 'Instellingen',
        icon: 'view_module',
        path: 'dashboard',
        roles: ['admin']
      }
    ];

}
