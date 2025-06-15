import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';

@Component({
  standalone: true,
  selector: 'app-my-auctions',
  imports: [CommonModule],
  templateUrl: './my-auctions.html',
  styleUrls: ['./my-auctions.css']
})
export class MyAuctionsComponent implements OnInit {
  auctions: any[] = [];
  accountName: string = '';

  constructor(private auctionService: AuctionService) {
    this.accountName = localStorage.getItem('accountName') || '';
  }

  ngOnInit(): void {
    if (this.accountName) {
      this.auctionService.getAuctionsByUser(this.accountName).subscribe({
        next: (data) => this.auctions = data,
        error: (err) => console.error('Eroare:', err)
      });
    }
  }
}
