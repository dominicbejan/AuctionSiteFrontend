import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuctionService } from '../../services/auction.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-auction',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-auction.html',
  styleUrls: ['./create-auction.css']
})
export class CreateAuctionComponent {
  auction = {
    name: '',
    description: '',
    bitNowPrice: 0,
    buyNowPrice: 0,
    promoted: 'NO',
    startBiddingDate: '',
    endBiddingDate: ''
  };

  categoryName = '';
  userName = ''; // poți lua asta din localStorage dacă ai salvat userul după login
  errorMessage = '';

  constructor(private auctionService: AuctionService, private router: Router) {
    this.userName = localStorage.getItem('accountName') || ''; // sau alt mecanism
    console.log('accountName în localStorage:', localStorage.getItem('accountName'));
  }

  createAuction() {
    this.errorMessage = ''; // resetăm eventualul mesaj anterior

    const payload = {
      auction: this.auction,
      categoryName: this.categoryName
    };

    this.auctionService.createAuction(payload, this.userName).subscribe({
      next: () => {
        alert('Licitația a fost creată cu succes!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Eroare:', err);

        if (err.status === 404 || err.status === 400) {
          this.errorMessage = 'Categoria nu există!';
        } else {
          this.errorMessage = 'A apărut o eroare. Încearcă din nou.';
        }
      }
    });
  }
}
