import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Creare categorie</h2>
    <p>Formularul de creare va fi aici.</p>
  `
})
export class CreateCategoryComponent {}
