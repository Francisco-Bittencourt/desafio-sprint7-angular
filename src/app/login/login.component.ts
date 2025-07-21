import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface User {
  username: string; 
  password: string;
  displayName: string; 
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = ''; 
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
    let users: User[] = [];

    if (usersJson) {
      try {
        users = JSON.parse(usersJson);
      } catch (e) {
        console.error('Erro ao parsear usuários do localStorage:', e);
        users = [];
      }
    }
    
    console.log('Tentativa de login com:');
    console.log('   E-mail digitado:', this.email);
    console.log('   Senha digitada:', this.senha);
    console.log('Lista de usuários RECUPERADA do localStorage:', users);

    let isAuthenticated = false;
    let loggedInIdentifier = ''; 
    let loggedInDisplayName = ''; 

    for (const user of users) {
      if (this.email.toLowerCase() === user.username.toLowerCase() && this.senha === user.password) { 
        isAuthenticated = true;
        loggedInIdentifier = user.username; 
        loggedInDisplayName = user.displayName; 
        break; 
      }
    }

    
    if (!isAuthenticated && this.email.toLowerCase() === 'admin@example.com' && this.senha === '123456') { 
      isAuthenticated = true;
      loggedInIdentifier = this.email;
      loggedInDisplayName = 'Administrador'; 
    }
    
    if (isAuthenticated) {
      console.log(`Login bem-sucedido para o usuário '${loggedInDisplayName}'! Redirecionando para /home...`);
      if (this.lembrar) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', loggedInIdentifier); 
        localStorage.setItem('displayName', loggedInDisplayName); 
      } else {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', loggedInIdentifier);
        sessionStorage.setItem('displayName', loggedInDisplayName); 
      }
      this.router.navigate(['/home']);
    } else {
      console.log('Tentativa de login falhou. Credenciais inválidas.');
      this.errorMessage = 'E-mail ou senha inválidos.';
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}