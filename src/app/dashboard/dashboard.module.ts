import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SidebarModule, RouterLink, ReactiveFormsModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
