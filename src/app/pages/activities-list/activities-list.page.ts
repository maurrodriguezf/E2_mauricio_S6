import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { EventService, EventItem } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ItemListComponent],
  templateUrl: './activities-list.page.html',
  styleUrls: ['./activities-list.page.scss']
})
export class ActivitiesListPage implements OnInit {
  query = '';
  activities: EventItem[] = [];
  type: string | null = null;

  constructor(private svc: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    const all = this.svc.list();
    if (this.type) {
      const t = this.type.toLowerCase();
      this.activities = all.filter(a => (a.title || '').toLowerCase().includes(t) || (a.note || '').toLowerCase().includes(t));
    } else {
      this.activities = all;
    }
  }
}
