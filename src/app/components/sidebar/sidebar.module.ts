import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterLink} from '@angular/router'; // Importar RouterModule aqui

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterLink  // Adicionado para que a diretiva routerLink funcione
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
