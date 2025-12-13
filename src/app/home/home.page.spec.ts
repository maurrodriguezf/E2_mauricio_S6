import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot(), BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component).toBeDefined();
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should render without throwing errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should have a valid fixture', () => {
    expect(fixture.componentInstance).toBe(component);
  });
});
