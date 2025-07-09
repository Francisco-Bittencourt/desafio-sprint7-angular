import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nome: string = '';
  senha: string = '';
  lembrar: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  fazerLogin(): void {
    this.errorMessage = '';

    if (this.nome === 'admin' && this.senha === '123456') {
      console.log('Login bem-sucedido! Redirecionando para /home...');
      if (this.lembrar) {
        console.log('Opção "Logar automaticamente" selecionada.');
      }
      this.router.navigate(['/home']);
    } else {
      console.log(
        'Tentativa de login falhou. Usuário:',
        this.nome,
        'Senha:',
        this.senha
      );
      this.errorMessage = 'Usuário ou senha inválidos.';
    }
  }
}
