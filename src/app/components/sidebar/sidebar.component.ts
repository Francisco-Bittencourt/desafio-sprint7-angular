import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
toTesteDrive() {
throw new Error('Method not implemented.');
}
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['login']);
  }
  toHome() {
    this.router.navigate(['/home']);
  }
}
