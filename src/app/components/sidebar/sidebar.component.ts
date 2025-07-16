import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor(private router: Router) {}

  // Método testDrive agora navega para a nova rota
  testDrive() {
    this.router.navigate(['/test-drive']);
    console.log('Navegando para a página de Test-Drive...');
  }

  logout() {
    this.router.navigate(['login']);
    console.log('Realizando logout...');
  }

  toHome() {
    this.router.navigate(['/home']);
    console.log('Navegando para a página Home...');
  }
}
