import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: true,
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
  imports: [CommonModule]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  animate: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    this.isAdmin = user?.roles?.includes("ADMIN");
  }

  ngOnInit(): void {
    setTimeout(() => this.animate = true, 50);

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        console.log('✅ CATEGORII:', data);
        this.categories = data;
      },
      error: (err) => {
        console.error('❌ Eroare la preluarea categoriilor:', err);
      }
    });
  }

  navigateTo(categoryName: string): void {
    this.router.navigate(['/category', categoryName]);
  }
}
