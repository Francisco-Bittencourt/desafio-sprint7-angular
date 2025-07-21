
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

   
    this.userName = localStorage.getItem('username'); 
    if (!this.userName) {
      this.userName = sessionStorage.getItem('username');
    }

    
    if (!this.userName) {
      console.log('Usuário não logado, redirecionando para login...');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuário logado:', this.userName);
    }
  }

  logout(): void {
    
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');

    console.log('Logout realizado. Redirecionando para login...');
    this.router.navigate(['/login']);
  }
}