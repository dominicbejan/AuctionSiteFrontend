import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';
import { Router } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-my-auctions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-auctions.html',
  styleUrls: ['./my-auctions.css']
})
export class MyAuctionsComponent implements OnInit {
  auctions: any[] = [];
  accountName: string = '';

  constructor(private auctionService: AuctionService, private router: Router) {
    this.accountName = localStorage.getItem('accountName') || '';
  }

  ngOnInit(): void {
    if (this.accountName) {
      console.log('accountName from localStorage:', this.accountName);
      this.auctionService.getAuctionsByUser(this.accountName).subscribe({
        next: (data) => {
          console.log('Received auctions:', data);
          this.auctions = data;
        },
        error: (err) => console.error('Eroare la preluare licitații:', err)
      });
    }
  }

  onDeleteAuction(auction: any): void {
    const name = auction.name;
    const id = auction.auction_id;

    if (!id || !name) {
      alert('Licitația nu este validă.');
      return;
    }

    if (confirm(`Ești sigur că vrei să ștergi licitația "${name}"?`)) {
      this.auctionService.deleteAuction(id).subscribe({
        next: (res) => {
          alert('Licitația a fost ștearsă cu succes!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Eroare la ștergere:', err);
          alert('A apărut o eroare la ștergere!');
        }
      });
    }
  }

  onUpdateAuction(auction: any): void {
    this.router.navigate(['/update-auction', auction.auction_id]);
  }
}
