import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage-angular';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);
    storageSpy.create.and.returnValue(Promise.resolve({} as Storage));
    storageSpy.get.and.returnValue(Promise.resolve(null));
    storageSpy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventService,
        { provide: Storage, useValue: storageSpy }
      ]
    });
    service = TestBed.inject(EventService);
    // ensure a clean state
    await service.resetToSeed();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should return array of events', () => {
    const list = service.list();
    expect(Array.isArray(list)).toBeTrue();
    expect(list.length).toBeGreaterThan(0);
  });

  it('getById() returns correct event or null', () => {
    const e = service.getById('1');
    expect(e).toBeTruthy();
    expect(e?.id).toBe('1');
    const none = service.getById('nope');
    expect(none).toBeNull();
  });

  it('reserve() should succeed when capacity allows and persist', () => {
  const before = service.getById('1')!;
  const reservedBefore = before.reserved || 0;
  const available = (before.capacity || 0) - reservedBefore;
  const qty = Math.min(1, available);
  const res = service.reserve('1', qty);
  expect(res.success).toBeTrue();
  const after = service.getById('1')!;
  expect(after.reserved).toBe(reservedBefore + qty);
  });

  it('reserve() should fail when over capacity', () => {
    const e = service.getById('3')!;
    const available = (e.capacity || 0) - (e.reserved || 0);
    const res = service.reserve('3', available + 5);
    expect(res.success).toBeFalse();
  });
});
