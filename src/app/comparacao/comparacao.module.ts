// src/app/comparacao-veiculos/comparacao-veiculos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparacaoComponent } from './comparacao.component'; // <--- CORRIGIDO AQUI! Importando o nome correto do componente
import { RouterModule, Routes } from '@angular/router';

// Define as rotas para este módulo de funcionalidade
const routes: Routes = [
  { path: '', component: ComparacaoComponent } // Usar o nome correto do componente
];

@NgModule({
  declarations: [
    ComparacaoComponent // <--- CORRIGIDO AQUI!
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Usar forChild para módulos de funcionalidade
  ],
  exports: [
    ComparacaoComponent // <--- CORRIGIDO AQUI!
  ]
})
export class ComparacaoVeiculosModule { }
