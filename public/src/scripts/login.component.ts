import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdInput } from '@angular2-material/input';
import { LoginService } from './login.service';

@Component({
    moduleId: module.id,      // for using component relative url's.
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls:  ['login.component.css'],
    directives: [
      MD_CARD_DIRECTIVES,
      FORM_DIRECTIVES,
      MdInput,
      MdButton
    ],
    providers: [

    ]
})


export class LoginComponent implements OnInit {

    title: String = 'Login';
    credentials: any = null;
    form: FormGroup = null;
    errorMessage: any = null;

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
      //
    }

    ngOnInit() {
      this.credentials = { username: 'admin@admin', password: 'admin'};
      this.form = this.fb.group({
        username: ['', Validators.required, Validators.minLength(3)],
        password: ['', Validators.required, Validators.minLength(3)]
      });
    }

    onSubmit(value: any) {
      console.log(value);
      this.loginService.login(value).subscribe(
                       data  => {
                         console.log('authenticated');
                         localStorage.setItem('user', JSON.stringify(data.user));
                         localStorage.setItem('token', JSON.stringify(data.token));
                         this.router.navigate(['dashboard']);
                       },
                       error => {
                         console.log(error);
                         this.errorMessage = 'Invalid credentials';
                       }
                      );
    }

}
