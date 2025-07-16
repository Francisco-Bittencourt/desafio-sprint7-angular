import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module'; // Importante: Importar o módulo de rotas do Dashboard

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SidebarModule,
    RouterLink,
    ReactiveFormsModule,
    DashboardRoutingModule // Importante: Adicionar aqui para que o lazy loading funcione corretamente
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
