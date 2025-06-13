import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
  imports: [CommonModule]
})
export class CategoryListComponent implements OnInit {
  // 1. Numele afișate în UI (pentru utilizator)
  categories: string[] = ['Autovehicule', 'Electronice', 'Decorative', 'Îmbrăcăminte'];
  animate: boolean = false;

  // 2. Mapare între UI și backend
  categoryMap: Record<string, string> = {
    'Vehicles': 'autovehicule',
    'Electronics': 'electronice',
    'Decorative': 'decorative',
    'Clothing': 'îmbrăcăminte'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 50);
  }

  navigateTo(categoryDisplayName: string): void {
    const backendCategory = this.categoryMap[categoryDisplayName] || categoryDisplayName;
    this.router.navigate(['/category', backendCategory]);
  }
}
