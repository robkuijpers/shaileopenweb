import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './login.service';

@Component({
    moduleId: module.id,      // for using component relative url's.
    selector: 'login-form',
    templateUrl: 'login.component.html',
    styleUrls:  ['login.component.css']
})


export class LoginComponent {

    constructor(private loginService: LoginService) {
        //
    }

    login() {
      let user = new User('', '');
      this.loginService.login(user);
    }

    logout() {
      //
    }

    register() {
      //
    }

}
