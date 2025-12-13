import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { EventService, EventItem } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ItemListComponent],
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss']
})
export class EventsPage implements OnInit {
  query = '';
  events: EventItem[] = [];

  constructor(private svc: EventService) {}

  ngOnInit(): void {
    this.events = this.svc.list();
  }
}
