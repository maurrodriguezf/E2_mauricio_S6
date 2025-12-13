import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardGalleryComponent } from '../../components/card-gallery/card-gallery.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, CardGalleryComponent, ItemListComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [trigger('enter', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])])]
})
export class DashboardPage {
  highlights = [
    { title: 'Yoga al amanecer', note: 'Parque Central · 8:00' },
    { title: 'Partido 5-a-side', note: 'Cancha Norte · 19:00' }
  ];
}
