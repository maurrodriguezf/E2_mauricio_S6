import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ItemListComponent,
        IonicModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty items array', () => {
    expect(component.items).toEqual([]);
  });

  it('should have default basePath', () => {
    expect(component.basePath).toBe('events');
  });

  it('should accept items input', () => {
    const testItems = [
      { id: '1', title: 'Item 1', note: 'Note 1' },
      { id: '2', title: 'Item 2' }
    ];
    
    component.items = testItems;
    fixture.detectChanges();
    
    expect(component.items.length).toBe(2);
    expect(component.items[0].title).toBe('Item 1');
  });

  it('should navigate to item detail when goTo is called', () => {
    const testItem = { id: '123', title: 'Test Item' };
    
    component.goTo(testItem);
    
    expect(router.navigate).toHaveBeenCalledWith(['/events/123']);
  });

  it('should use custom basePath in navigation', () => {
    component.basePath = 'activities/detail';
    const testItem = { id: '456', title: 'Activity' };
    
    component.goTo(testItem);
    
    expect(router.navigate).toHaveBeenCalledWith(['/activities/detail/456']);
  });

  it('should not navigate when item has no id', () => {
    const testItem = { title: 'Item without id' };
    
    component.goTo(testItem);
    
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate when item is null', () => {
    component.goTo(null);
    
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should handle basePath with leading/trailing slashes', () => {
    component.basePath = '/events/';
    const testItem = { id: '789', title: 'Test' };
    
    component.goTo(testItem);
    
    expect(router.navigate).toHaveBeenCalledWith(['/events/789']);
  });
});
