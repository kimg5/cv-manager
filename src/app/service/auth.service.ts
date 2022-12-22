import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = "http://localhost:3001/auth/login";
  registerUrl = "http://localhost:3001/auth/register";

  isLoggedIn = false;
  username:string;
  role: string;
  token: string;
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
    this.role = sessionStorage.getItem('role') || 'anonymous';
    this.token = sessionStorage.getItem('token') || '';
    this.username = sessionStorage.getItem('username') || '';
  }

  loginSuccess(resp: any,loginObj: any) {
    console.log(resp);
    this.token = resp.token;
    this.isLoggedIn = true;
    this.role = resp.role;
    this.username = loginObj.username;
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('role', this.role);
    sessionStorage.setItem('username', this.username);
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginObj);
  }

  register(registerObj: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, registerObj);
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  }
}
