
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nome: string = '';
  senha: string = '';
  lembrar: boolean = false;
  errorMessage: string = '';
  currentYear: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  fazerLogin(): void {
    this.errorMessage = ''; 

    
    const usersJson = localStorage.getItem('registeredUsers');
    let users: { username: string, password: string }[] = [];

    if (usersJson) {
      users = JSON.parse(usersJson);
    }
   

    console.log('Tentativa de login com:');
    console.log('  Nome digitado:', this.nome);
    console.log('  Senha digitada:', this.senha);
    console.log('Lista de usuários RECUPERADA do localStorage:', users);

    let isAuthenticated = false;
    let loggedInUsername = '';

 
    for (const user of users) {
      if (this.nome === user.username && this.senha === user.password) {
        isAuthenticated = true;
        loggedInUsername = user.username;
        break; 
      }
    }

    
    if (!isAuthenticated && this.nome === 'admin' && this.senha === '123456') {
      isAuthenticated = true;
      loggedInUsername = this.nome;
    }
    

    if (isAuthenticated) {
      console.log(`Login bem-sucedido para o usuário '${loggedInUsername}'! Redirecionando para /home...`);
      if (this.lembrar) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', loggedInUsername);
      } else {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', loggedInUsername);
      }
      this.router.navigate(['/home']);
    } else {
      console.log('Tentativa de login falhou. Credenciais inválidas.');
      this.errorMessage = 'Usuário ou senha inválidos.';
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}