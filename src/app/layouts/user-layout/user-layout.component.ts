import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../modules/user/product/components/navbar/navbar.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,         // <-- also important if you’re using `imports`
  imports: [RouterOutlet, NavbarComponent],  // works now
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'] // <-- typo fixed (styleUrls, not styleUrl)
})
export class UserLayoutComponent {}


