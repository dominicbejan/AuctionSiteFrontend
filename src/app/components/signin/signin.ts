import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <- ADĂUGAT

@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
  imports: [CommonModule, RouterModule] // <- ADĂUGAT
})
export class SigninComponent {}
