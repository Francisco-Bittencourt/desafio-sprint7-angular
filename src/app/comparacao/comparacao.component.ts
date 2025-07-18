// src/app/comparacao-veiculos/comparacao.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparacao-veiculos',
  standalone: false,
  templateUrl: './comparacao.component.html', // <--- Verifique se este nome de arquivo HTML existe na mesma pasta
  styleUrls: ['./comparacao.component.css'] // <--- Verifique se este nome de arquivo CSS existe na mesma pasta
})
export class ComparacaoComponent implements OnInit { // <--- O nome da classe deve ser ComparacaoComponent

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('Página de Comparação de Veículos carregada.');
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
