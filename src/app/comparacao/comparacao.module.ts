
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparacaoComponent } from './comparacao.component'; 
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: ComparacaoComponent } 
];

@NgModule({
  declarations: [
    ComparacaoComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports: [
    ComparacaoComponent 
  ]
})
export class ComparacaoVeiculosModule { }
