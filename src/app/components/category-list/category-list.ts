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
  categories: string[] = ['Vehicles', 'Electronics', 'Decorative', 'Clothing'];

  animate: boolean = false; // 🔹 AICI declari variabila

  constructor(private router: Router) {}

  ngOnInit(): void {
    // declanșează animația după ce DOM-ul este încărcat
    setTimeout(() => {
      this.animate = true;
    }, 50);
  }

  navigateTo(category: string): void {
    this.router.navigate(['/category', category]);
  }
}
