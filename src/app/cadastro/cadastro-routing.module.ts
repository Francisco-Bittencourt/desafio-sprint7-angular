import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Importe RouterModule e Routes
import { CadastroComponent } from './cadastro.component'; // Importe o componente que será roteado

// Defina as rotas do seu módulo de cadastro
const routes: Routes = [
  { path: '', component: CadastroComponent } // Exemplo: A rota padrão para este módulo aponta para CadastroComponent
];

@NgModule({
  declarations: [], // Geralmente vazio para RoutingModules
  imports: [
    RouterModule.forChild(routes) // Use forChild para módulos de feature
  ],
  exports: [
    RouterModule // Exporte RouterModule para que as rotas fiquem disponíveis
  ]
})
export class CadastroRoutingModule { }