import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../../services/auction.service';

@Component({
  standalone: true,
  selector: 'app-auction-list',
  templateUrl: './auction-list.html',
  styleUrls: ['./auction-list.css'],
  imports: [CommonModule]
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
