import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterLink, RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SidebarModule, RouterLink],
  exports: [DashboardComponent],
})
export class DashboardModule {}
