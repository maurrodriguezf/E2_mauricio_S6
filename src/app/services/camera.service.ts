import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class CameraService {
  private photosKey = 'miapp_photos_v1';

  constructor(private storage: Storage) {}

  async takePicture(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        promptLabelHeader: 'Tomar foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPicture: 'Cámara',
        promptLabelPhoto: 'Galería'
      });
      return image.dataUrl || '';
    } catch (e) {
      console.error('Camera error:', e);
      throw new Error('No se pudo acceder a la cámara');
    }
  }

  async getPhotoFromGallery(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        promptLabelHeader: 'Seleccionar foto',
        promptLabelCancel: 'Cancelar'
      });
      return image.dataUrl || '';
    } catch (e) {
      console.error('Gallery error:', e);
      throw new Error('No se pudo acceder a la galería');
    }
  }

  async savePhoto(dataUrl: string, filename?: string) {
    const name = filename || `photo_${Date.now()}.jpg`;
    const photos = await this.storage.get(this.photosKey) || [];
    photos.push({ name, dataUrl, timestamp: Date.now() });
    await this.storage.set(this.photosKey, photos);
    return { name, dataUrl, timestamp: Date.now() };
  }

  async getPhotos() {
    return (await this.storage.get(this.photosKey)) || [];
  }

  async deletePhoto(filename: string) {
    const photos = await this.storage.get(this.photosKey) || [];
    const filtered = photos.filter((p: any) => p.name !== filename);
    await this.storage.set(this.photosKey, filtered);
  }
}
