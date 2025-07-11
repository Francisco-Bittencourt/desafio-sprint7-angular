import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  menuVisivel: any;
  constructor(private router: Router) {}
  toHome() {
    this.router.navigate(['/homw']);
  }
}
