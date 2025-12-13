import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss']
})
export class ReservationPage {
  form = this.fb.group({
    name: ['', [Validators.required]],
    qty: [1, [Validators.required, Validators.min(1)]]
  });
  eventId = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private svc: EventService) {
    this.eventId = this.route.snapshot.queryParamMap.get('id') || '';
  }

  submit() {
    if (this.form.valid) {
      const qty = Number(this.form.value.qty) || 1;
      const res = this.svc.reserve(this.eventId || '', qty);
      if (res.success) {
        alert('Reserva confirmada (demo)');
        this.form.reset({ qty: 1 });
      } else {
        alert('Error: ' + res.message);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
