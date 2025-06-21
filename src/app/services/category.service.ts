import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:9090/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCategory(category: { name: string; description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, category);
  }

  deleteCategory(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`, { responseType: 'text' });
  }
}
