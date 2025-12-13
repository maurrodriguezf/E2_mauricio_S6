import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { EventService, EventItem } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  animations: [trigger('slideIn', [transition(':enter', [style({ opacity: 0, transform: 'translateY(8px)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))])])]
})
export class EventDetailPage implements OnInit {
  id = '';
  event: EventItem | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private svc: EventService) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.id) this.event = this.svc.getById(this.id);
  }

  reserve() {
    this.router.navigate(['/reservation'], { queryParams: { id: this.id } });
  }
}
