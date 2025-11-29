import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export interface EventItem {
  id: string;
  title: string;
  note?: string;
  description?: string;
  capacity?: number;
  reserved?: number;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private storageKey = 'miapp_events_v1';
  private events: EventItem[] = [];
  private storageReady = false;

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.storageReady = true;
    const stored = await this.storage.get(this.storageKey);
    if (stored) {
      try {
        this.events = JSON.parse(stored) as EventItem[];
      } catch {
        this.seed();
        await this.save();
      }
    } else {
      this.seed();
      await this.save();
    }
    // try to sync with remote API (best-effort)
    this.syncFromApi();
  }

  private seed() {
    this.events = [
      { id: '1', title: 'Yoga al amanecer', note: 'Parque Central · 8:00', description: 'Clase abierta de yoga al aire libre.', capacity: 20, reserved: 5 },
      { id: '2', title: 'Salida en bici', note: 'Ruta costa · 10:00', description: 'Paseo en bicicleta por la costa, nivel medio.', capacity: 30, reserved: 12 },
      { id: '3', title: 'Partido 5-a-side', note: 'Cancha Norte · 19:00', description: 'Partido amistoso. Trae tus zapatos.', capacity: 10, reserved: 8 }
    ];
    this.save();
  }

  private save() {
    return this.storage.set(this.storageKey, JSON.stringify(this.events));
  }

  list() {
    return [...this.events];
  }

  /**
   * Attempt to fetch simple sample data from a public API and map to EventItem.
   * This is best-effort: on network error we keep local data.
   */
  syncFromApi() {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=8';
    this.http.get<any[]>(url).pipe(
      map(posts => posts.map(p => ({ id: String(p.id), title: p.title, note: p.body.substring(0, 40) + '...', description: p.body } as EventItem))),
      catchError(err => {
        // network error — keep local seed
        console.warn('EventService.syncFromApi failed', err);
        return of([] as EventItem[]);
      })
    ).subscribe(fetched => {
      if (fetched && fetched.length) {
        // Merge: prefer existing events but add/replace from fetched
        this.events = fetched;
        this.save();
      }
    });
  }

  getById(id: string) {
    return this.events.find(e => e.id === id) || null;
  }

  reserve(eventId: string, qty: number) {
    const ev = this.getById(eventId);
    if (!ev) return { success: false, message: 'Evento no encontrado' };
    const available = (ev.capacity || 0) - (ev.reserved || 0);
    if (qty > available) return { success: false, message: 'No hay suficientes cupos' };
    ev.reserved = (ev.reserved || 0) + qty;
    this.save();
    return { success: true, event: ev };
  }

  // helper to reset seed (useful for tests)
  resetToSeed() {
    this.seed();
    this.save();
  }
}
