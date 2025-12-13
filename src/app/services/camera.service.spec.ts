import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['get', 'set', 'create']);
    storageSpy.get.and.returnValue(Promise.resolve([]));
    storageSpy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        CameraService,
        { provide: Storage, useValue: storageSpy }
      ]
    });
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save photo to storage', async () => {
    const mockDataUrl = 'data:image/jpeg;base64,savedata';
    await service.savePhoto(mockDataUrl);
    
    expect(storageSpy.get).toHaveBeenCalledWith('miapp_photos_v1');
    expect(storageSpy.set).toHaveBeenCalled();
  });

  it('should save photo with custom filename', async () => {
    const mockDataUrl = 'data:image/jpeg;base64,savedata';
    const filename = 'custom_photo.jpg';
    await service.savePhoto(mockDataUrl, filename);
    
    expect(storageSpy.set).toHaveBeenCalled();
  });

  it('should retrieve saved photos', async () => {
    const mockPhotos = [
      { name: 'photo1.jpg', dataUrl: 'data1', timestamp: 123 },
      { name: 'photo2.jpg', dataUrl: 'data2', timestamp: 456 }
    ];
    storageSpy.get.and.returnValue(Promise.resolve(mockPhotos));

    const result = await service.getPhotos();
    expect(result).toEqual(mockPhotos);
    expect(storageSpy.get).toHaveBeenCalledWith('miapp_photos_v1');
  });
});

