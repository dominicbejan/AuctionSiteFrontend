import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  imports: [CommonModule]
})
export class CategoryDetailsComponent implements OnInit {
  categoryName: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("✅ Componenta CategoryDetails a fost încărcată");
    this.categoryName = this.route.snapshot.paramMap.get('name')!;

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    this.isAdmin = user?.roles?.some((role: any) => role.name === 'admin');
    console.log('isAdmin:', this.isAdmin);

  }

  deleteCategory(): void {
    if (confirm(`Ești sigur că vrei să ștergi categoria ${this.categoryName}?`)) {
      this.categoryService.deleteCategory(this.categoryName).subscribe({
        next: () => {
          alert(`Categoria "${this.categoryName}" a fost ștearsă.`);
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Eroare la ștergerea categoriei!');
        }
      });
    }
  }
}
