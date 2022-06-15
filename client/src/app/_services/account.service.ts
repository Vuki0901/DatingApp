import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

//Injectable - mogu se koristiti u drugim servisima i komponentama
@Injectable({
  //Prije se navodilo u app.module.ts u providers,
  //Sada sa providedIn
  providedIn: 'root'
})
export class AccountService {
  /*
  Service je singleton -> In software engineering, the singleton
  pattern is a software design pattern that restricts the
  instantiation of a class to one "single" instance.

  Podaci u service-ima se ne uklanjaju sve dok se aplikacija ne ugasi,
  dok se u komponentama brisu cim se korisnik makne iz te komponente
  */
  baseUrl = "https://localhost:5001/api/account/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + "login/", model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl  + "register", model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
