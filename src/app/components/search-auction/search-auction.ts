import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-search-auction',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-results">
      <h2>Rezultate căutare pentru: "{{ searchQuery }}"</h2>

      <div *ngFor="let auction of auctions" class="auction-card">
        <h3 class="auction-title">{{ auction.name }}</h3>
        <p><strong>Descriere:</strong> {{ auction.description }}</p>
        <p><strong>Promovată:</strong> {{ auction.promoted }}</p>
        <p><strong>Start Bidding Date:</strong> {{ auction.startBiddingDate }}</p>
        <p><strong>End Bidding Date:</strong> {{ auction.endBiddingDate }}</p>
        <p><strong>Preț licitație inițial:</strong> {{ auction.bitNowPrice }} RON</p>

        <div style="margin-top: 10px; display: flex; gap: 10px;">
          <input
            type="number"
            [(ngModel)]="auction.userBid"
            placeholder="Introdu suma"
            class="input"
          />
          <button class="btn" (click)="bidNow(auction)">Bid Now</button>
        </div>

        <div *ngIf="auction.bitNowPrice" style="margin-top: 10px;">
          <button class="btn" (click)="buyNow(auction)">
            Buy Now: {{ auction.bitNowPrice }} RON
          </button>
        </div>

        <p><strong>Număr de vizualizări:</strong> {{ auction.numbersOfViews || 0 }}</p>
      </div>
    </div>
  `,
  styles: [`
    .search-results {
      max-width: 800px;
      margin: 40px auto;
    }

    .auction-card {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .auction-title {
      color: #007bff;
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    .input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    p {
      margin: 6px 0;
    }
  `]
})
export class SearchAuctionComponent {
  searchQuery = '';
  auctions: any[] = [];

  constructor(private route: ActivatedRoute, private auctionService: AuctionService) {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.searchAuctions();
    });
  }

  searchAuctions() {
    if (!this.searchQuery) return;
    this.auctionService.searchAuctionsByName(this.searchQuery).subscribe({
      next: data => this.auctions = data,
      error: err => console.error('Eroare la căutare:', err)
    });
  }

  buyNow(auction: any): void {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user?.username) {
      alert("Trebuie să fii logat pentru a cumpăra.");
      return;
    }

    const buyData = { userName: user.username };

    this.auctionService.buyNow(auction.id, buyData).subscribe({
      next: () => alert(`Ai cumpărat ${auction.name} pentru ${auction.bitNowPrice} RON.`),
      error: () => alert("Eroare la cumpărare.")
    });
  }

  bidNow(auction: any): void {
    if (!auction.userBid || auction.userBid <= 0) {
      alert("Introduceți o sumă validă pentru licitație.");
      return;
    }

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user?.username) {
      alert("Trebuie să fii logat pentru a licita.");
      return;
    }

    const biddingData = {
      bidding: { price: auction.userBid },
      userName: user.username
    };

    this.auctionService.placeBid(auction.id, biddingData).subscribe({
      next: () => alert(`Ai licitat ${auction.userBid} RON pentru ${auction.name}`),
      error: () => alert("Eroare la plasarea licitației.")
    });
  }
}
