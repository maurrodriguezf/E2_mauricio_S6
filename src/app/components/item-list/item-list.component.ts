import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('ion-item', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(80, [animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))])
        ], { optional: true })
      ])
    ])
  ]
})
export class ItemListComponent {
  @Input() items: Array<{ title: string; note?: string }> = [];
  @Input() basePath = 'events';

  constructor(private router: Router) {}

  goTo(item: any) {
    if (!item || !item.id) return;
    // navigate to basePath + id. basePath may include a path segment like 'activities/detail'
    const prefix = this.basePath.replace(/(^\/|\/$)/g, '');
    this.router.navigate([`/${prefix}/${item.id}`]);
  }
}
