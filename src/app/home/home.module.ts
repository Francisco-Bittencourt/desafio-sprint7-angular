import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardModule,
    SidebarModule,
    LoginModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
