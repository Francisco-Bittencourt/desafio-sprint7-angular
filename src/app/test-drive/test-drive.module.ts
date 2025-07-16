// src/app/test-drive/test-drive.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TestDriveComponent } from './test-drive.component';
import { TestDriveRoutingModule } from './test-drive-routing.module';
// import { SidebarModule } from '../components/sidebar/sidebar.module'; // REMOVIDO: SidebarModule não é mais necessário
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestDriveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestDriveRoutingModule,
    // SidebarModule, // REMOVIDO
    RouterModule 
  ],
  exports: [TestDriveComponent],
})
export class TestDriveModule {}