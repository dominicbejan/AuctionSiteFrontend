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

        this.authService.getUserByUsername(this.username).subscribe({
          next: (userData) => {
            console.log("📥 Date utilizator:", userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('accountName', userData.accountName); // ← AICI!
            this.authService.setCurrentUser(userData);
            alert('Login reușit!');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error("❌ Eroare la preluarea datelor userului:", err);
            alert("Nu s-au putut prelua datele complete ale utilizatorului.");
          }
        });
      },
      error: (err) => {
        console.error("❌ Login failed:", err);
        alert('Nume de utilizator sau parolă incorecte!');
      }
    });
  }
}
