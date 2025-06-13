import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-auction',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-results">
      <h2>Rezultate căutare pentru: "{{ searchQuery }}"</h2>
      <div *ngFor="let auction of auctions" class="auction-card">
        <h3>{{ auction.name }}</h3>
        <p>{{ auction.description }}</p>
        <strong>Preț: {{ auction.bitNowPrice }} RON</strong>
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
  `]
})
export class SearchAuctionComponent {
  searchQuery = '';
  auctions: any[] = [];

  constructor(private auctionService: AuctionService) {
    const params = new URLSearchParams(window.location.search);
    this.searchQuery = params.get('q') || '';
    this.searchAuctions();
  }

  searchAuctions() {
    if (!this.searchQuery) return;
    this.auctionService.searchAuctionsByName(this.searchQuery).subscribe({
      next: data => this.auctions = data,
      error: err => console.error('Eroare la căutare:', err)
    });
  }
}
