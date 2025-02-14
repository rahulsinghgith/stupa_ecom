import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticatedSubject$ = new BehaviorSubject(this.isAuthenticated());
  currentUserSubject$ = new BehaviorSubject({});
  

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(payload: any): Observable<any> {
    {
      return this.httpClient.post('https://api.escuelajs.co/api/v1/auth/login', payload);
    } 
  }

  getAuthAsObservable(): Observable<boolean> {
    return this.authenticatedSubject$.asObservable();
  }

  getCurrUserAsObservable(): Observable<User> {
    return this.currentUserSubject$.asObservable() as Observable<User>;
  }

  setAuthenticated() {
    this.authenticatedSubject$.next(true);
  }

  setCurrentUser() {
    this.currentUserSubject$.next(this.getCurrUser());
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem('authToken')) {
      return true;
    };
    return false;
  }

  getCurrUser(): Observable<User> {  
    return this.httpClient.get('https://api.escuelajs.co/api/v1/auth/profile') as Observable<User>;
  }


  

  logOut() {
    localStorage.removeItem('authToken');
    this.authenticatedSubject$.next(false);
    this.currentUserSubject$.next({});
    this.router.navigateByUrl("login");
  }
}

