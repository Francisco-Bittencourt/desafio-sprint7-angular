// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'test-drive',
    loadChildren: () =>
      import('./test-drive/test-drive.module').then((m) => m.TestDriveModule),
  },
  // --- NOVA ROTA PARA O CADASTRO COM LAZY LOADING ---
  {
    path: 'cadastro', // A rota para o formulário de cadastro
    loadChildren: () =>
      import('./cadastro/cadastro.module').then((m) => m.CadastroModule), // Carrega o CadastroModule
  },
  // --- FIM DA NOVA ROTA ---
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}