import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  menuVisivel: any; // Considerar tipar melhor, talvez como boolean
  constructor(private router: Router) {}

  toHome() {
    // Correção: a rota para 'home' deve ser '/home'
    this.router.navigate(['/home']);
  }
}
