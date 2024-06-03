import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(@Inject('BASE_API_URL') private apiUrl: string,
  private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password }).pipe(
      map(response => {
        if (response && response.jwt) {
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('username', username);
          this.currentUserSubject.next(username);
        }
        return response;
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
}
