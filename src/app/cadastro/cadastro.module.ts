import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Adicionado FormsModule aqui

const routes: Routes = [
  { path: '', component: CadastroComponent }
];

@NgModule({
  declarations: [
    CadastroComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CadastroModule { }