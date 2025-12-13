# Guía de Pruebas - MiApp

Este proyecto incluye pruebas unitarias con **Jasmine/Karma** y pruebas E2E (End-to-End) con **Cypress**.

## 📋 Tabla de Contenidos

- [Pruebas Unitarias](#pruebas-unitarias)
- [Pruebas E2E](#pruebas-e2e)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura de Pruebas](#estructura-de-pruebas)
- [Tecnologías](#tecnologías)

## 🧪 Pruebas Unitarias

### Ejecutar Pruebas Unitarias

```bash
# Modo interactivo (watch mode)
npm test

# Modo headless (una sola ejecución)
npm run test:headless

# Con reporte de cobertura
npm run test:coverage
```

### Configuración

Las pruebas unitarias utilizan:
- **Jasmine**: Framework de testing
- **Karma**: Test runner
- **ChromeHeadless**: Navegador para ejecución en CI/CD

Archivo de configuración: `karma.conf.js`

### Archivos de Pruebas Unitarias

Todos los archivos `.spec.ts` contienen pruebas unitarias:

```
src/
├── app/
│   ├── app.component.spec.ts
│   ├── components/
│   │   ├── card-gallery/
│   │   │   └── card-gallery.component.spec.ts
│   │   ├── item-list/
│   │   │   └── item-list.component.spec.ts
│   │   └── task-form/
│   │       └── task-form.component.spec.ts
│   ├── guards/
│   │   └── auth.guard.spec.ts
│   ├── home/
│   │   └── home.page.spec.ts
│   ├── pages/
│   │   ├── login/
│   │   │   └── login.page.spec.ts
│   │   └── register/
│   │       └── register.page.spec.ts
│   └── services/
│       ├── auth.service.spec.ts
│       ├── camera.service.spec.ts
│       ├── event.service.spec.ts
│       └── notification.service.spec.ts
```

### Cobertura de Pruebas

Las pruebas unitarias cubren:

✅ **Componentes** (8 componentes)
- AppComponent
- HomePage
- LoginPage
- RegisterPage
- CardGalleryComponent
- ItemListComponent
- TaskFormComponent

✅ **Servicios** (4 servicios)
- AuthService
- CameraService
- EventService
- NotificationService

✅ **Guards** (1 guard)
- AuthGuard

**Total: 69 pruebas unitarias**

## 🎭 Pruebas E2E

### Ejecutar Pruebas E2E

```bash
# Abrir Cypress en modo interactivo
npm run cypress:open
# o
npm run e2e

# Ejecutar en modo headless
npm run e2e:headless
# o
npm run cypress:run
```

### Requisitos para E2E

1. El servidor de desarrollo debe estar corriendo:
```bash
npm start
```

2. Luego en otra terminal, ejecutar Cypress:
```bash
npm run cypress:open
```

### Configuración de Cypress

Archivo de configuración: `cypress.config.ts`

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts'
  }
});
```

### Archivos de Pruebas E2E

```
cypress/
├── e2e/
│   ├── app-navigation.cy.ts
│   ├── auth-guard.cy.ts
│   ├── home.cy.ts
│   ├── login.cy.ts
│   └── register.cy.ts
├── fixtures/
│   └── example.json
└── support/
    ├── commands.ts
    ├── component-index.html
    ├── component.ts
    └── e2e.ts
```

### Escenarios de Pruebas E2E

#### 1. **Navegación de la Aplicación** (`app-navigation.cy.ts`)
- Carga de la página principal
- Navegación entre rutas
- Elementos de UI presentes

#### 2. **Página de Login** (`login.cy.ts`)
- Renderizado del formulario
- Validación de campos
- Login exitoso/fallido
- Navegación a registro

#### 3. **Página de Registro** (`register.cy.ts`)
- Validación de formulario
- Registro de nuevo usuario
- Confirmación de contraseñas
- Prevención de duplicados

#### 4. **Página Home/Eventos** (`home.cy.ts`)
- Acceso después de autenticación
- Visualización de contenido
- Navegación por la app
- Responsive design

#### 5. **Auth Guard** (`auth-guard.cy.ts`)
- Redirección a login sin autenticación
- Acceso a rutas protegidas
- Preservación de URL de retorno

## 📜 Scripts Disponibles

```json
{
  "scripts": {
    "start": "ng serve",                    // Servidor de desarrollo
    "build": "ng build",                    // Compilar para producción
    "test": "ng test",                      // Pruebas unitarias (watch)
    "test:headless": "ng test --watch=false --browsers=ChromeHeadless",
    "test:coverage": "ng test --watch=false --code-coverage --browsers=ChromeHeadless",
    "e2e": "ng e2e",                        // Pruebas E2E
    "e2e:headless": "cypress run",          // Pruebas E2E headless
    "cypress:open": "cypress open",         // Abrir Cypress UI
    "cypress:run": "cypress run",           // Ejecutar Cypress CLI
    "lint": "ng lint"                       // Linter
  }
}
```

## 📁 Estructura de Pruebas

### Anatomía de una Prueba Unitaria

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have specific behavior', () => {
    // Arrange
    const expectedValue = 'test';
    
    // Act
    component.someMethod();
    
    // Assert
    expect(component.someProperty).toBe(expectedValue);
  });
});
```

### Anatomía de una Prueba E2E

```typescript
describe('Feature Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should perform user action', () => {
    // Interactuar con elementos
    cy.get('button').click();
    
    // Verificar resultados
    cy.url().should('include', '/success');
    cy.contains('Success message').should('be.visible');
  });
});
```

## 🛠 Tecnologías

### Pruebas Unitarias
- **Jasmine** ^5.1.0 - Framework de testing
- **Karma** ^6.4.0 - Test runner
- **karma-jasmine** ^5.1.0 - Adaptador Karma-Jasmine
- **karma-chrome-launcher** ^3.2.0 - Launcher para Chrome
- **karma-coverage** ^2.2.0 - Reportes de cobertura

### Pruebas E2E
- **Cypress** - Framework de testing E2E
- **@cypress/schematic** - Integración con Angular CLI

### Capacitor
- **@capacitor/cli** 7.4.4 - CLI de Capacitor
- **@capacitor/core** 7.4.4 - Core de Capacitor
- **@capacitor/camera** ^7.0.2 - Plugin de cámara
- **@capacitor/app** 7.1.0 - Plugin de app

## 🚀 Ejecución en CI/CD

### GitHub Actions (ejemplo)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:headless
      
      - name: Run E2E tests
        run: |
          npm start &
          npm run e2e:headless
```

## 📊 Reportes de Cobertura

Después de ejecutar `npm run test:coverage`, los reportes se generan en:

```
coverage/
└── app/
    ├── index.html        # Reporte HTML interactivo
    └── lcov.info         # Datos de cobertura
```

Abrir `coverage/app/index.html` en un navegador para ver el reporte detallado.

## 🔧 Buenas Prácticas

### Pruebas Unitarias
1. Usar `beforeEach` para setup común
2. Mockear dependencias externas
3. Probar casos de éxito y error
4. Mantener pruebas independientes
5. Nombres descriptivos de pruebas

### Pruebas E2E
1. Limpiar estado antes de cada prueba (`cy.clearLocalStorage()`)
2. Usar selectores semánticos (data-testid)
3. Esperar elementos antes de interactuar
4. Probar flujos completos de usuario
5. Evitar dependencias entre pruebas

## 📝 Notas sobre Protractor

**Protractor está deprecado** desde Angular 12. Este proyecto usa **Cypress** como reemplazo moderno para pruebas E2E, que ofrece:

- ✅ Mejor experiencia de desarrollo
- ✅ Ejecución más rápida
- ✅ Debugging más fácil
- ✅ Soporte activo y comunidad grande
- ✅ Integración con Angular CLI

## 📞 Soporte

Para más información:
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Capacitor Documentation](https://capacitorjs.com/docs)
