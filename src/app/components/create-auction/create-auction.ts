import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-auction',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Creare Licitație</h2>

      <form (ngSubmit)="submitAuction()">
        <label>Titlu:</label>
        <input [(ngModel)]="auction.name" name="name" required />

        <label>Descriere:</label>
        <textarea [(ngModel)]="auction.description" name="description" required></textarea>

        <label>Preț inițial:</label>
        <input type="number" [(ngModel)]="auction.bitNowPrice" name="bitNowPrice" required />

        <label>Preț Buy Now:</label>
        <input type="number" [(ngModel)]="auction.buyNowPrice" name="buyNowPrice" />

        <label>Data de start:</label>
        <input type="text" [(ngModel)]="auction.startBiddingDate" name="startBiddingDate" placeholder="ex: 2025-06-13" required />

        <label>Data de sfârșit:</label>
        <input type="text" [(ngModel)]="auction.endBiddingDate" name="endBiddingDate" placeholder="ex: 2025-06-20" required />

        <label>Promovat? (YES/NO):</label>
        <input [(ngModel)]="auction.promoted" name="promoted" required />

        <label>Categorie:</label>
        <input [(ngModel)]="categoryName" name="categoryName" required />

        <button type="submit">Creează licitația</button>
      </form>

      <p *ngIf="successMessage">{{ successMessage }}</p>
      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 30px auto;
      background-color: #f9f9fb;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    input, textarea {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      background-color: #007bff;
      color: white;
      font-weight: bold;
      border: none;
      padding: 12px;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class CreateAuctionComponent {
  auction = {
    name: '',
    description: '',
    promoted: '',
    bitNowPrice: 0,
    buyNowPrice: 0,
    startBiddingDate: '',
    endBiddingDate: '',
    numbersOfViews: 0
  };

  categoryName = '';
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  submitAuction() {
    const username = 'admin'; // sau ia-l din login mai târziu
    const url = `http://localhost:9090/auctions/${username}`;
    const body = {
      auction: this.auction,
      categoryName: this.categoryName
    };

    this.http.post(url, body).subscribe({
      next: () => {
        this.successMessage = 'Licitația a fost creată cu succes!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'A apărut o eroare la creare.';
        this.successMessage = '';
      }
    });
  }
}
