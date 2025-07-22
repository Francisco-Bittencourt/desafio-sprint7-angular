import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Interface para definir a estrutura de um usuário
interface User {
  username: string; // Ou 'email', para ser mais consistente com o uso
  password: string;
  displayName: string;
}

@Component({
  selector: 'app-login',
  standalone: false, // Pode considerar mudar para 'true' em projetos modernos Angular
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Propriedades vinculadas aos campos do formulário
  email: string = '';
  senha: string = '';
  lembrar: boolean = false; // Para o checkbox "Logar automaticamente"

  // Propriedades para controle da UI e mensagens
  errorMessage: string = ''; // Exibe mensagens de erro para o usuário
  currentYear: number = 0; // Para exibir o ano atual no rodapé

  // NOVO: Propriedade para controlar o tipo do input de senha (password ou text)
  senhaInputType: string = 'password';

  // Injeção do Router para navegação programática
  constructor(private router: Router) {}

  // Método de lifecycle hook do Angular, executado na inicialização do componente
  ngOnInit(): void {
    // Define o ano atual dinamicamente
    this.currentYear = new Date().getFullYear();
  }

  // NOVO: Função para alternar a visibilidade da senha
  toggleSenhaVisibility(): void {
    // Se o tipo atual for 'password', muda para 'text'; caso contrário, muda para 'password'
    this.senhaInputType = this.senhaInputType === 'password' ? 'text' : 'password';
  }

  // Lógica principal para realizar o login
  fazerLogin(): void {
    // Limpa qualquer mensagem de erro anterior ao tentar um novo login
    this.errorMessage = '';

    // Recupera a lista de usuários registrados do LocalStorage
    const usersJson = localStorage.getItem('registeredUsers');
    let users: User[] = [];

    // Tenta fazer o parse do JSON; se houver erro, inicializa como array vazio
    if (usersJson) {
      try {
        users = JSON.parse(usersJson);
      } catch (e) {
        console.error('Erro ao parsear usuários do localStorage:', e);
        users = [];
      }
    }

    // Logs para depuração (útil durante o desenvolvimento)
    console.log('Tentativa de login com:');
    console.log('    E-mail digitado:', this.email);
    console.log('    Senha digitada:', this.senha);
    console.log('Lista de usuários RECUPERADA do localStorage:', users);

    let isAuthenticated = false;
    let loggedInIdentifier = ''; // Armazena o username/email do usuário logado
    let loggedInDisplayName = ''; // Armazena o nome de exibição do usuário logado

    // Itera sobre os usuários registrados para verificar as credenciais
    for (const user of users) {
      // Compara email (case-insensitive) e senha
      if (this.email.toLowerCase() === user.username.toLowerCase() && this.senha === user.password) {
        isAuthenticated = true;
        loggedInIdentifier = user.username;
        loggedInDisplayName = user.displayName;
        break; // Sai do loop assim que encontrar uma correspondência
      }
    }

    // Permite login com um usuário administrador hardcoded para testes
    if (!isAuthenticated && this.email.toLowerCase() === 'admin@example.com' && this.senha === '123456') {
      isAuthenticated = true;
      loggedInIdentifier = this.email;
      loggedInDisplayName = 'Administrador';
    }

    // Se o login for bem-sucedido
    if (isAuthenticated) {
      console.log(`Login bem-sucedido para o usuário '${loggedInDisplayName}'! Redirecionando para /home...`);

      // Armazena o estado de login e informações do usuário
      if (this.lembrar) {
        // Se "Lembrar" estiver marcado, usa localStorage (persistente)
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', loggedInIdentifier);
        localStorage.setItem('displayName', loggedInDisplayName);
      } else {
        // Caso contrário, usa sessionStorage (somente para a sessão atual do navegador)
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', loggedInIdentifier);
        sessionStorage.setItem('displayName', loggedInDisplayName);
      }
      // Navega para a página inicial
      this.router.navigate(['/home']);
    } else {
      // Se o login falhar
      console.log('Tentativa de login falhou. Credenciais inválidas.');
      this.errorMessage = 'E-mail ou senha inválidos.';
    }
  }

  // Função para navegar para a página de cadastro
  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}