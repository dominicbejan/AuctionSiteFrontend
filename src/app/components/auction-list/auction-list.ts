import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';
import { FormsModule } from '@angular/forms'; // ✅ Adaugă asta
import { HttpClient } from '@angular/common/http';

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
    private auctionService: AuctionService,
    private http: HttpClient // 👈 ADĂUGAT
  ) {}

  activeAuctions: any[] = [];
  completedAuctions: any[] = [];
  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.categoryName = this.route.snapshot.params['name'].toLowerCase();

    this.auctionService.getAuctionsByCategory(this.categoryName).subscribe({
      next: (data) => {
        const now = new Date();

        this.completedAuctions = data.filter((auction: any) => {
          const endDate = new Date(auction.endBiddingDate);
          return (
            auction.isCompleted === true ||
            (endDate < now && auction.biddings && auction.biddings.length > 0)
          );
        });

        this.auctions = data.filter((auction: any) => {
          const endDate = new Date(auction.endBiddingDate);
          return (
            !auction.isCompleted &&
            (endDate >= now || !auction.biddings || auction.biddings.length === 0)
          );
        });

        this.activeAuctions = this.auctions.filter((auction: any) => {
          const start = new Date(auction.startBiddingDate);
          const end = new Date(auction.endBiddingDate);
          return now >= start && now <= end;
        });
      },
      error: (err) => console.error('Eroare:', err)
    });
  }

  buyNow(auction: any) {
    console.log("Auction pentru buyNow:", auction);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.accountName) {
      alert('Trebuie să fii logat pentru a cumpăra!');
      return;
    }

    const request = {
      userName: user.accountName,
      bidding: {
        currentPrice: auction.bitNowPrice
      }
    };

    this.http.post(`http://localhost:9090/currentBids/buy/${auction.auction_id}`, request).subscribe({
      next: (bidding: any) => {
        alert('Cumpărat cu succes!');

        // Eliminăm din celelalte liste
        this.auctions = this.auctions.filter(a => a.auction_id !== auction.auction_id);
        this.activeAuctions = this.activeAuctions.filter(a => a.auction_id !== auction.auction_id);

        // Adăugăm în lista completată
        this.completedAuctions.push({
          ...auction,
          boughtPrice: bidding.currentPrice,
          endBiddingDate: bidding.endDate,
          buyer: bidding.user?.accountName || request.userName // fallback dacă nu primește userul complet
        });
      },
      error: (err: any) => {
        console.error('Eroare la cumpărare:', err);
        alert('Eroare la cumpărare!');
      }
    });
  }

  bidNow(auction: any): void {
    if (!auction.userBid || auction.userBid <= 0) {
      alert("Introduceți o sumă validă pentru licitație.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.accountName) {
      alert('Trebuie să fii logat pentru a licita!');
      return;
    }

    // 🛑 Verifică dacă userul e creatorul licitației
    if (auction.users?.accountName === user.accountName) {
      alert("Nu poți licita la propria ta licitație!");
      return;
    }

    const biddingData = {
      bidding: { currentPrice: auction.userBid },
      userName: user.accountName
    };

    this.http.post(`http://localhost:9090/currentBids/${auction.auction_id}`, biddingData).subscribe({
      next: () => {
        alert(`Ai licitat ${auction.userBid} EUR pentru ${auction.name}`);
        auction.bitNowPrice = auction.userBid;
      },
      error: (err: any) => {
        alert("Eroare la plasarea licitației.");
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
