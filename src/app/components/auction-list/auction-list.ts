import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';
import { FormsModule } from '@angular/forms'; // ✅ Adaugă asta

@Component({
  standalone: true,
  selector: 'app-auction-list',
  templateUrl: './auction-list.html',
  styleUrls: ['./auction-list.css'],
  imports: [CommonModule, FormsModule] // ✅ Include și FormsModule aici
})
export class AuctionListComponent implements OnInit {
  categoryName: string = '';
  auctions: any[] = [];
  animate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['name'].toLowerCase();

    this.auctionService.getAuctionsByCategory(this.categoryName).subscribe({
      next: (data) => {
        console.log('✅ Auctions:', data);
        this.auctions = data;
      },
      error: (err) => {
        console.error('❌ Eroare:', err);
      }
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
