import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PageHeaderComponent } from './pageheader.component';
import { NotificationBarComponent } from './notificationbar.component';
import { MainMenuComponent } from './mainmenu.component';
import { PageFooterComponent } from './pagefooter.component';

import { LoginService } from './login.service';

@Component({
  selector: 'my-app',
  template: `<div>
               <my-pageheader></my-pageheader>
               <my-mainmenu></my-mainmenu>
               <my-notificationbar></my-notificationbar>
              </div>
              <main>
                <div>
                  <router-outlet></router-outlet>
                </div>
              </main>     
              <my-pagefooter></my-pagefooter>`,
  directives: [
    ROUTER_DIRECTIVES,
    PageHeaderComponent,
    NotificationBarComponent,
    MainMenuComponent,
    PageFooterComponent
  ],
  providers: [
    LoginService
  ]
})

export class AppComponent {

}
