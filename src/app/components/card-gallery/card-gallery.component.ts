import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-card-gallery',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './card-gallery.component.html',
  styleUrls: ['./card-gallery.component.scss'],
  animations: [
    trigger('cardFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.98)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class CardGalleryComponent {
  cards = [
    { title: 'Tarjeta A', content: 'Contenido rápido A' },
    { title: 'Tarjeta B', content: 'Contenido rápido B' },
    { title: 'Tarjeta C', content: 'Contenido rápido C' }
  ];
}
