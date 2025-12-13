import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombreDeLaPaginaPageRoutingModule } from './nombre-de-la-pagina-routing.module';

import { NombreDeLaPaginaPage } from './nombre-de-la-pagina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NombreDeLaPaginaPageRoutingModule,
    NombreDeLaPaginaPage
  ],
  declarations: []
})
export class NombreDeLaPaginaPageModule {}
