// src/app/test-drive/test-drive-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestDriveComponent } from './test-drive.component';

const routes: Routes = [
  { path: '', component: TestDriveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usar forChild para módulos de feature
  exports: [RouterModule],
})
export class TestDriveRoutingModule {}
