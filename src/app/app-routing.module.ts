// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'test-drive',
    loadChildren: () =>
      import('./test-drive/test-drive.module').then((m) => m.TestDriveModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
  },
  // --- A ROTA CRUCIAL QUE PRECISA ESTAR AQUI ---
  {
    path: 'comparacao-veiculos', // Este é o caminho exato que o router está procurando
    loadChildren: () =>
      import('./comparacao/comparacao.module').then((m) => m.ComparacaoVeiculosModule),
  },
  // --- FIM DA ROTA CRUCIAL ---
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
