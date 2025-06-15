import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-category.css']
})
export class CreateCategoryComponent {
  name = '';
  description = '';
  errorMessage = '';
  successMessage = '';

  constructor(private categoryService: CategoryService, private router: Router) {}

  createCategory() {
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
      error: (err) => {
        console.error(err);
        this.errorMessage = 'A apărut o eroare la creare.';
      }
    });
  }
}
