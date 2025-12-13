import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreDeLaPaginaPage } from './nombre-de-la-pagina.page';

describe('NombreDeLaPaginaPage', () => {
  let component: NombreDeLaPaginaPage;
  let fixture: ComponentFixture<NombreDeLaPaginaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreDeLaPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
