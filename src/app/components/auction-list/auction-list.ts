import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  animate: boolean = false; // pentru animatia underline

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['name'];

    // animatie pentru underline
    setTimeout(() => {
      this.animate = true;
    }, 0);

    switch (this.categoryName) {
      case 'Vehicles':
        this.auctions = [
          { title: 'BMW Seria 3', description: 'Diesel, an 2018, 150.000 km', price: 53000 },
          { title: 'Volkswagen Golf', description: 'Benzină, 2016, 120.000 km', price: 37000 }
        ];
        break;

      case 'Electronics':
        this.auctions = [
          { title: 'iPhone 13', description: '128GB, Midnight', price: 3600 },
          { title: 'Laptop Lenovo', description: 'ThinkPad, 16GB RAM', price: 3200 }
        ];
        break;

      case 'Decorative':
        this.auctions = [
          { title: 'Tablou pictură în ulei', description: 'Semnat de artist român', price: 800 },
          { title: 'Vază ceramică handmade', description: 'Pictată manual', price: 300 }
        ];
        break;

      case 'Clothing':
        this.auctions = [
          { title: 'Geacă Nike', description: 'mărimea M, ca nouă', price: 450 },
          { title: 'Rochie Zara', description: 'colecție 2024', price: 250 }
        ];
        break;

      default:
        this.auctions = [];
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
