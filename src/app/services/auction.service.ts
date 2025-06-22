import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  placeBid(auctionId: number, biddingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/currentBids/${auctionId}`, biddingData);
  }

  buyNow(auctionId: number, biddingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/currentBids/buy/${auctionId}`, biddingData);
  }

  getAuctionsByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryName}/auctions`);
  }

  searchAuctionsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auctions/search?name=${name}`);
  }

  createAuction(payload: any, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auctions/${userName}`, payload);
  }

  getAuctionsByUser(accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:9090/auctions/users/${accountName}/auctions`);
  }

  deleteAuction(id: number): Observable<any> {
    return this.http.delete(`http://localhost:9090/auctions/${id}`, { responseType: 'text' });
  }

  updateAuction(id: number, updatedData: any) {
    return this.http.put(`http://localhost:9090/auctions/${id}`, updatedData);
  }

  getAuctionById(id: number) {
    return this.http.get<any>(`http://localhost:9090/auctions/id/${id}`);
  }

  getActiveAuctions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }
}
