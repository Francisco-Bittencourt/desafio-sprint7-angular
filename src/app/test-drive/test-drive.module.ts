// src/app/test-drive/test-drive.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TestDriveComponent } from './test-drive.component';
import { TestDriveRoutingModule } from './test-drive-routing.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router'; // Importante: Importar RouterModule

@NgModule({
  declarations: [TestDriveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestDriveRoutingModule,
    SidebarModule,
    RouterModule // Importante: Incluir RouterModule nos imports para que routerLink funcione
  ],
  exports: [TestDriveComponent],
})
export class TestDriveModule {}
