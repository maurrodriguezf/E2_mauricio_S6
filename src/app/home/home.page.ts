import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { CardGalleryComponent } from '../components/card-gallery/card-gallery.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ItemListComponent, CardGalleryComponent, TaskFormComponent],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: Array<{ title: string; note?: string }> = [
    { title: 'Bienvenida', note: 'Esta es una tarea de ejemplo' }
  ];

  constructor(private router: Router) {}

  onCreated(task: { title: string; note?: string }) {
    this.tasks = [task, ...this.tasks];
  }

  irA(tipo: string) {
    // Navega a una ruta de ejemplo: /activities/:tipo
    this.router.navigate(['/activities', tipo]);
  }

}
