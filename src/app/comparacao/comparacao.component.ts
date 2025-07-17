// src/app/comparacao/comparacao.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar o Router

@Component({
  selector: 'app-comparacao',
  templateUrl: './comparacao.component.html',
  styleUrls: ['./comparacao.component.css'],
  // <<-- REMOVA ESTA LINHA COMPLETAMENTE SE ELA EXISTIR -->>
  // standalone: true, 
})
export class ComparacaoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('Página de Comparação de Veículos carregada!');
  }

  // Verifique se este método existe, conforme erros anteriores
  voltarParaDashboard(): void { 
    this.router.navigate(['/dashboard']);
  }
}