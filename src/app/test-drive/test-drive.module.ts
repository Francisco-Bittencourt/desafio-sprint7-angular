
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TestDriveComponent } from './test-drive.component';
import { TestDriveRoutingModule } from './test-drive-routing.module';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestDriveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestDriveRoutingModule,
   
    RouterModule 
  ],
  exports: [TestDriveComponent],
})
export class TestDriveModule {}