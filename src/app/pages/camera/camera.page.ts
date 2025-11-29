import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss']
})
export class CameraPage implements OnInit {
  photos: Array<{ name: string; dataUrl: string; timestamp: number }> = [];
  loading = false;

  constructor(private cameraService: CameraService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  async loadPhotos() {
    this.photos = await this.cameraService.getPhotos();
  }

  async takePicture() {
    this.loading = true;
    try {
      const dataUrl = await this.cameraService.takePicture();
      await this.cameraService.savePhoto(dataUrl, `photo_${Date.now()}.jpg`);
      await this.loadPhotos();
    } catch (e: any) {
      console.error('Error:', e);
      alert(e.message || 'Error al tomar la foto');
    } finally {
      this.loading = false;
    }
  }

  async pickFromGallery() {
    this.loading = true;
    try {
      const dataUrl = await this.cameraService.getPhotoFromGallery();
      await this.cameraService.savePhoto(dataUrl, `gallery_${Date.now()}.jpg`);
      await this.loadPhotos();
    } catch (e: any) {
      console.error('Error:', e);
      alert(e.message || 'Error al seleccionar la foto');
    } finally {
      this.loading = false;
    }
  }

  async deletePhoto(filename: string) {
    if (confirm('¿Eliminar esta foto?')) {
      await this.cameraService.deletePhoto(filename);
      await this.loadPhotos();
    }
  }
}
