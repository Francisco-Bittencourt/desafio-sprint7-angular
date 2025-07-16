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
<<<<<<< HEAD
testDrive() {
=======
toTesteDrive() {
>>>>>>> e19b0a47b09dfe6749df1fe08dfb67b195a71c53
throw new Error('Method not implemented.');
}
=======
>>>>>>> 07cd8a177eec3cea2be69815834e505d11449efa
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
