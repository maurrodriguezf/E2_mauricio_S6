import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NombreDeLaPaginaPage } from './nombre-de-la-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: NombreDeLaPaginaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombreDeLaPaginaPageRoutingModule {}
