import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdInput } from '@angular2-material/input';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  selector: 'my-app',
  template: `<div>
               <md-sidenav-layout fullscreen>
                 <md-sidenav #sidenav>
                    <md-nav-list>
                      <a [routerLink]="['{{item.link}}']" md-list-item *ngFor="let item of items">
                        <md-icon md-list-icon>{{item.icon}}</md-icon>
                        <span md-line>{{item.name}}</span>
                      </a>
                    </md-nav-list>
                 </md-sidenav>
                 <md-toolbar color="primary">
                   <button md-icon-button (click)="sidenav.open()">
                     <md-icon>menu</md-icon>
                   </button>
                   Shaile Open
                 </md-toolbar>
               </md-sidenav-layout>  
             </div>              
             <div>
               <router-outlet></router-outlet>
             </div>`,
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MdToolbar,
    MdIcon,
    MdInput
  ],
  providers: [
    MdIconRegistry
  ]
})

export class AppComponent {

  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  items: [
    { name: 'Home', icon: 'menu', link: '/' },
    { name: 'Login', icon: 'menu', link: '/login' },
    { name: 'Dashboard', icon: 'menu', link: '/dashboard' }
  ];

}
