import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import './rxjs-operators.import';


export class User {

  constructor(public username: string, public password: string) {
    //
  }

}


@Injectable()
export class LoginService {

  private loginUrl = 'api/login';

  constructor( private router: Router, private http: Http ) {
    //
  }

  public login (credentials: User): Observable<User> {

    let headers = new Headers({ 'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(credentials);

    return this.http.post(this.loginUrl, body, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
