import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class SigninComponent {
  user: any = {
    accountName: '',
    email: '',
    password: '',
    province: '',
    city: '',
    address: '',
    type: 'Normal', // default
    dateOfAccountCreation: new Date().toISOString().split('T')[0], // format YYYY-MM-DD
    accountStatus: 'Active', // default
    roles: [] // backend poate seta ROLE_USER automat
  };

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        alert('Cont creat cu succes!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Eroare la înregistrare:', err);
        alert('A apărut o eroare la creare.');
      }
    });
  }
}
