import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nombre-de-la-pagina',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './nombre-de-la-pagina.page.html',
  styleUrls: ['./nombre-de-la-pagina.page.scss'],
})
export class NombreDeLaPaginaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
