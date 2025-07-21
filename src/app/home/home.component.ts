import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string | null = null; 
  currentYear: number = 0; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); 

    
    this.userName = localStorage.getItem('displayName'); 
  
    if (!this.userName) {
      this.userName = sessionStorage.getItem('displayName');
    }

    if (!this.userName) {
      console.log('Usuário não logado ou nome de exibição não encontrado, redirecionando para login...');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuário logado (nome de exibição):', this.userName);
    }
  }

  logout(): void {
    
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username'); 
    localStorage.removeItem('displayName'); 

    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('displayName');

    console.log('Logout realizado. Redirecionando para login...');
    this.router.navigate(['/login']);
  }
}