import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [
    trigger('buttonPulse', [
      transition(':enter', [
        style({ transform: 'scale(.98)' }),
        animate('400ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class TaskFormComponent {
  @Output() created = new EventEmitter<{ title: string; note?: string }>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    note: ['']
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      const value = this.form.value as { title: string; note?: string };
      this.created.emit({ title: value.title, note: value.note });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
