import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUser: string | null = null;

  constructor(private http: HttpClient) {}

  login(accountName: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${accountName}:${password}`),
      'Content-Type': 'application/json'
    });

    return new Observable(observer => {
      this.http.get(`${this.baseUrl}/users/login-test`, {
        headers,
        responseType: 'text' as 'json',
        withCredentials: true
      }).subscribe({
        next: (response) => {
          this.isLoggedInSubject.next(true);
          this.currentUser = accountName;
          localStorage.setItem('accountName', accountName);
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          this.isLoggedInSubject.next(false);
          this.currentUser = null;
          observer.error(err);
        }
      });
    });
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUser = null;
    localStorage.removeItem('accountName');
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${username}`);
  }
}
