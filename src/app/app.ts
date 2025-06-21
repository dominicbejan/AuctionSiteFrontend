import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  isAdmin: boolean = false;
  searchTerm: string = '';
  currentCategoryName: string = '';
  isCategoryPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.checkAdmin();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const match = url.match(/^\/category\/(.+)/);
        if (match) {
          this.isCategoryPage = true;
          this.currentCategoryName = match[1];
        } else {
          this.isCategoryPage = false;
          this.currentCategoryName = '';
        }
      }
    });
  }

  checkAdmin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.isAdmin = user.roles?.some((role: any) => role.name === 'admin');
      } catch (e) {
        console.error('❌ Eroare la parsarea userului din localStorage:', e);
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAdmin = false;
    this.router.navigate(['/']);
  }

  search(): void {
    const query = this.searchTerm.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  deleteCategory(): void {
    if (!this.currentCategoryName) return;
    if (confirm(`Ești sigur că vrei să ștergi categoria "${this.currentCategoryName}"?`)) {
      fetch(`http://localhost:9090/categories/${this.currentCategoryName}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.ok) {
          alert('Categoria a fost ștearsă!');
          this.router.navigate(['/']);
        } else {
          alert('Eroare la ștergerea categoriei!');
        }
      });
    }
  }
}
