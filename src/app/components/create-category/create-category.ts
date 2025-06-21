import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  templateUrl: './create-category.html',
  styleUrls: ['./create-category.css'],
  imports: [FormsModule, CommonModule]
})
export class CreateCategoryComponent {
  name = '';
  description = '';
  errorMessage = '';
  successMessage = '';
  isAdmin = false;

  constructor(private categoryService: CategoryService, private router: Router) {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    this.isAdmin = user?.roles?.some((role: any) => role.name === 'admin');

    if (!this.isAdmin) {
      alert("Acces interzis: doar adminii pot crea categorii.");
      this.router.navigate(['/']);
    }
  }

  createCategory(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.categoryService.createCategory({
      name: this.name,
      description: this.description
    }).subscribe({
      next: () => {
        this.successMessage = 'Categoria a fost creată cu succes!';
        this.name = '';
        this.description = '';
      },
      error: () => {
        this.errorMessage = 'A apărut o eroare la creare.';
      }
    });
  }
}
