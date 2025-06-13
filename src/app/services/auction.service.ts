import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:9090'; // URL-ul backendului

  constructor(private http: HttpClient) {}

  getAuctionsByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:9090/categories/${categoryName}/auctions`);
  }

  searchAuctionsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:9090/auctions/search?name=${name}`);
  }
}
