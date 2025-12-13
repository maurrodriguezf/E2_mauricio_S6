import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;

  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('Toast', ['present']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: ToastController, useValue: toastCtrlSpy }
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call toastController.create with correct parameters', async () => {
    const message = 'Test notification';
    await service.show(message);
    
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  });

  it('should use custom duration when provided', async () => {
    const message = 'Test message';
    const customDuration = 5000;
    await service.show(message, customDuration);
    
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: message,
      duration: customDuration,
      position: 'bottom'
    });
  });

  it('should present the toast', async () => {
    const toastSpy = jasmine.createSpyObj('Toast', ['present']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));
    
    await service.show('Test');
    expect(toastSpy.present).toHaveBeenCalled();
  });
});
