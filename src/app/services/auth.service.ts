import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  login(accountName: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${accountName}:${password}`),
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.baseUrl}/users/login-test`, {
      headers,
      responseType: 'text' as 'json', // 🔥 important
      withCredentials: true
    });
  }
}
