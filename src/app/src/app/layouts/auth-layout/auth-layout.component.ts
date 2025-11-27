import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// ✅ Make sure this path matches your folder structure
import { NavbarComponent } from '../../modules/user/product/components/navbar/navbar.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'] // ✅ corrected (was styleUrl)
})
export class AuthLayoutComponent {}
