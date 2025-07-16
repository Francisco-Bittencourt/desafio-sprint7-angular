// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit { // Implementa OnInit para usar ngOnInit
  nome: string = '';
  senha: string = '';
  lembrar: boolean = false;
  errorMessage: string = '';
  currentYear: number = 0; // NOVA PROPRIEDADE: Para exibir o ano no copyright do HTML

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializa o ano atual para o copyright
    this.currentYear = new Date().getFullYear();
  }

  fazerLogin(): void {
    this.errorMessage = ''; // Limpa mensagens de erro anteriores

    // Lógica de login hardcoded (sem AuthService)
    if (this.nome === 'admin' && this.senha === '123456') {
      console.log('Login bem-sucedido! Redirecionando para /home...');
      if (this.lembrar) {
        // Armazena no localStorage se 'lembrar' estiver marcado
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', this.nome); // Opcional: armazena o username
      } else {
        // Armazena no sessionStorage se não for para 'lembrar'
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', this.nome); // Opcional: armazena o username
      }
      this.router.navigate(['/home']); // Redireciona para a página home
    } else {
      console.log(
        'Tentativa de login falhou. Usuário:',
        this.nome,
        'Senha:',
        this.senha
      );
      this.errorMessage = 'Usuário ou senha inválidos.'; // Mensagem de erro
    }
  }
}