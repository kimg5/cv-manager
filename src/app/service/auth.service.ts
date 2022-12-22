import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = "http://localhost:3001/auth/login";
  isLoggedIn = false;
  role: string;
  token: string;
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
    this.role = sessionStorage.getItem('role') || 'anonymous';
    this.token = sessionStorage.getItem('token') || '';
  }

  login(loginObj : any): Observable<boolean> {
    this.http.post(this.loginUrl,loginObj).subscribe(
      resp => {
        console.log(resp);
      }
    )

    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
  }
}
