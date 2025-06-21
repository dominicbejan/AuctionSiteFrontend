import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/users';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  getUserByAccountName(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  updateUser(accountName: string, userData: any) {
    return this.http.put(`http://localhost:9090/users/${accountName}`, userData, { responseType: 'text' });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:9090/users/${username}`);
  }
}
