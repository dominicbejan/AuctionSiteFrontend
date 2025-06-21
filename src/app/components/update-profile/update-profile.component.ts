import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Inițializăm formularul cu câmpuri goale pentru a evita erorile
    this.profileForm = this.fb.group({
      accountName: [''],
      email: [''],
      password: [''],
      province: [''],
      city: [''],
      address: [''],
      type: ['NORMAL']
    });

    const accountName = localStorage.getItem('accountName');
    if (!accountName) {
      alert('Nu ești logat!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadUser(accountName);
  }

  loadUser(accountName: string) {
    this.userService.getUserByAccountName(accountName).subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue({
          accountName: user.accountName,
          email: user.email,
          password: user.password,
          province: user.province,
          city: user.city,
          address: user.address,
          type: user.type
        });
      },
      error: () => alert('Eroare la încărcarea datelor utilizatorului.')
    });
  }

  updateProfile(): void {
    console.log('🔧 Butonul Update a fost apăsat');

    if (!this.user?.user_id) {
      console.warn("⚠️ Userul nu are ID – probabil nu e logat?");
      return;
    }

    const updated = this.profileForm.value;
    this.userService.updateUser(this.user.accountName, updated).subscribe({
      next: () => {
        alert('Profil actualizat cu succes!');
        localStorage.setItem('user', JSON.stringify({ ...this.user, ...updated }));
        this.router.navigate(['/']);
      },
      error: () => alert('Eroare la actualizarea profilului.')
    });
  }
}
