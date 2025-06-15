import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log("Trimitem:", this.username, this.password);

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log("✅ Login OK:", res);
        localStorage.setItem('accountName', this.username);
        localStorage.setItem('role', 'admin'); // dacă utilizatorul e admin
        if (this.username === 'admin') {
          localStorage.setItem('role', 'admin');
        } else {
          localStorage.setItem('role', 'user');
        }
        alert('Login reușit!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("❌ Login failed:", err);
        alert('Nume de utilizator sau parolă incorecte!');
      }
    });
  }
}
