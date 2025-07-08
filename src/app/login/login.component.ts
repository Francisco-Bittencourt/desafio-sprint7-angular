import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nome = '';
  senha = '';
  lembrar: boolean = false;

  constructor(private router: Router) {}

  fazerLogin(): void {
    if (this.nome === 'admin' && this.senha === '123456') {
      this.router.navigate(['/home']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }
}
