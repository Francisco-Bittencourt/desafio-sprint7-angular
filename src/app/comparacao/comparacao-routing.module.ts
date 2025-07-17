import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparacaoComponent } from './comparacao.component';

const routes: Routes = [{ path: '', component: ComparacaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparacaoRoutingModule { }
