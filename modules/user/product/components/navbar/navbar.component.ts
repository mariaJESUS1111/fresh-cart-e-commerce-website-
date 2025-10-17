import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']   // ✅ هنا التعديل
})
export class NavbarComponent {
  isMobileOpen: boolean = false;

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }
}
