import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardGalleryComponent } from './card-gallery.component';

describe('CardGalleryComponent', () => {
  let component: CardGalleryComponent;
  let fixture: ComponentFixture<CardGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardGalleryComponent,
        IonicModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 3 cards', () => {
    expect(component.cards.length).toBe(3);
  });

  it('should have correct card structure', () => {
    component.cards.forEach(card => {
      expect(card.title).toBeDefined();
      expect(card.content).toBeDefined();
    });
  });

  it('should have predefined card titles', () => {
    expect(component.cards[0].title).toBe('Tarjeta A');
    expect(component.cards[1].title).toBe('Tarjeta B');
    expect(component.cards[2].title).toBe('Tarjeta C');
  });

  it('should have predefined card content', () => {
    expect(component.cards[0].content).toBe('Contenido rápido A');
    expect(component.cards[1].content).toBe('Contenido rápido B');
    expect(component.cards[2].content).toBe('Contenido rápido C');
  });

  it('should render without errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
