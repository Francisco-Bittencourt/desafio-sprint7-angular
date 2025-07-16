import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
<<<<<<< HEAD
testDrive() {
=======
toTesteDrive() {
>>>>>>> e19b0a47b09dfe6749df1fe08dfb67b195a71c53
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
