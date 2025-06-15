import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;
  isAdmin: boolean = false;
  searchTerm: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn$;
    this.checkAdmin(); // 👈 apelăm metoda
  }

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin';
  }

  logout(): void {
    this.authService.logout();
    this.isAdmin = false;
    this.router.navigate(['/']);
  }

  search(): void {
    console.log('Search triggered for:', this.searchTerm);
  }
}

