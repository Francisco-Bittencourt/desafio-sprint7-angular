// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false, // Garanta que standalone é false se estiver usando módulos
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string | null = null; // Variável para armazenar o nome do usuário
  currentYear: number = 0; // Variável para o ano atual no rodapé

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); // Inicializa o ano atual

    // Tenta recuperar o nome do usuário do localStorage ou sessionStorage
    this.userName = localStorage.getItem('username'); 
    if (!this.userName) {
      this.userName = sessionStorage.getItem('username');
    }

    // Se o nome não for encontrado (usuário não logado), redireciona para o login
    if (!this.userName) {
      console.log('Usuário não logado, redirecionando para login...');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuário logado:', this.userName);
    }
  }

  logout(): void {
    // Limpa os dados de login de ambos localStorage e sessionStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');

    console.log('Logout realizado. Redirecionando para login...');
    this.router.navigate(['/login']);
  }
}