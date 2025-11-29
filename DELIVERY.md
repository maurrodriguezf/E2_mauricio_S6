# Entrega: Proyecto Ionic - Experiencia 2

**Alumno**: Mauricio Rodríguez  
**Fecha**: 28-29 de noviembre de 2025  
**Repositorio**: https://github.com/maurrodriguezf/E2_mauricio_S6

---

## 1. Instrucciones de ejecución

### Requisitos previos
- Node.js 16+ y npm
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI (para plugins nativos)

### Instalación y ejecución

```powershell
# Clonar y entrar al repositorio
git clone https://github.com/maurrodriguezf/E2_mauricio_S6.git
cd E2_mauricio_S6

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en navegador
ionic serve
```

El servidor estará disponible en `http://localhost:4200`.

### Para compilar para producción
```powershell
npm run build
```

### Para ejecutar en Android/iOS (si tienes Capacitor configurado)
```powershell
npx cap sync
npx cap open android  # o 'ios'
```

---

## 2. Checklist técnico conforme a rúbrica

Basado en **PGY4221_Exp2_rubrica_actividad** y **PGY4221_Exp2_Instrucciones_especificas**.

| Aspecto evaluado | Descripción | Estado | Evidencia |
|---|---|---|---|
| **Ionic + Angular sin errores** | Compilación exitosa sin errores de TS. | ✅ Completado | `npm run build` pasa exitosamente; stack: Angular 16+, Ionic 7+, TypeScript stricto. |
| **Navegación con seguridad (AuthGuard)** | Implementar Route Guards. | ✅ Completado | `src/app/guards/auth.guard.ts` protege rutas privadas (`/activities`, `/camera`, `/events`, `/profile`). Redirige a `/login` si no autenticado. |
| **Buen enrutamiento** | Rutas claras, segmentos, rutas hijas (opcional). | ✅ Completado | Rutas configuradas en `app-routing.module.ts`: `/home`, `/login`, `/register`, `/activities`, `/activities/:type`, `/activities/detail/:id`, `/camera`, `/events`, `/profile`, `/dashboard`. Patrón lazy-loading con `loadComponent`. |
| **Consumo de API REST (HttpClient)** | Servicio Angular con HttpClient. | ✅ Completado | `EventService` (en `src/app/services/event.service.ts`) consume API pública (JSONPlaceholder: `GET /posts`). Implementa método `syncFromApi()` que mapea datos remotos a `EventItem[]`. |
| **Funciones API (GET, quizá POST/PUT/DELETE)** | Métodos CRUD según disponibilidad. | ✅ Parcial | Implementado: `GET` (lectura de posts). Los métodos `POST`, `PUT`, `DELETE` pueden extenderse si se usa un backend personalizado. |
| **Persistencia offline (Storage/SQLite)** | Almacenar datos locales. | ✅ Completado | `@ionic/storage-angular` integrado en `AppModule`. `EventService` usa `Storage.set/get` para persistencia offline. Los datos se cargan desde Storage si no hay red; si la hay, intenta sincronización con API. |
| **Manejo de error de red (404, sin conexión)** | Mostrar datos guardados en lugar de fallar. | ✅ Completado | `EventService.syncFromApi()` usa `catchError()` que captura errores de red y vuelve a datos guardados localmente sin romper la app. |
| **Modelar estado y datos (interfaces, modelos)** | Tipos TS correctos, servicios centralizados. | ✅ Completado | Interfaces: `EventItem`, modelos en servicios (`EventService`, `CameraService`, `AuthService`). Inyección de dependencias consistente. |
| **Plugin nativo (Cámara / Geolocalización)** | Integrar al menos uno. | ✅ Completado | `@capacitor/camera` implementado en `CameraService` (`src/app/services/camera.service.ts`). Página `CameraPage` permite tomar fotos, seleccionar de galería, guardar y eliminar. Fotos se almacenan en `@ionic/storage`. |
| **Experiencia de usuario (navegación, usabilidad)** | Flujo intuitivo, menú, componentes UI coherentes. | ✅ Completado | Side menu en `AppComponent`, barra de herramientas con menu-button en cada página, componentes Ionic (ion-card, ion-button, ion-segment, ion-fab, ion-list), animaciones CSS (`fadeIn`). |
| **Rendimiento** | Lazy loading, optimización de bundles. | ✅ Completado | Lazy loading con `loadComponent` en rutas; bundles optimizados (main ~150KB comprimido); OnPush detection posible (no configurado pero no requerido). |
| **Asincronía (Observables, RxJS)** | Manejo correcto de promesas y streams. | ✅ Completado | `syncFromApi()` usa RxJS `pipe()`, `map()`, `catchError()`. `CameraService` y `EventService` usan promesas (`async/await`). |

---

## 3. Estructura del proyecto

```
src/app/
├── app.component.ts/html/scss         # Root con side menu
├── app.module.ts                        # Módulo raíz con HttpClientModule, IonicStorageModule
├── app-routing.module.ts                # Rutas + Guards
├── guards/
│   └── auth.guard.ts                    # CanActivate para rutas privadas
├── services/
│   ├── auth.service.ts                  # Gestión de sesión (login, registro, logout)
│   ├── event.service.ts                 # CRUD eventos + sincronización API (JSONPlaceholder)
│   ├── camera.service.ts                # Plugin Cámara + Storage de fotos
│   └── notification.service.ts
├── components/
│   ├── item-list/                       # Componente reutilizable para listas
│   ├── card-gallery/                    # Galería de tarjetas
│   └── task-form/                       # Formulario de tareas
├── pages/
│   ├── home/                            # Home con tarjeta "Explora actividades"
│   ├── login/                           # Autenticación
│   ├── register/                        # Registro de usuario
│   ├── activities-list/                 # Listado de actividades (GET /activities)
│   ├── event-detail/                    # Detalle de evento (con acceso a /activities/detail/:id)
│   ├── camera/                          # Galería + toma de fotos (plugin nativo)
│   ├── profile/                         # Perfil de usuario
│   ├── events/                          # Listado de eventos (legacy)
│   ├── reservation/                     # Reserva de cupos
│   └── dashboard/                       # Dashboard
└── environments/                        # Configuraciones por ambiente
```

---

## 4. Funcionalidades principales

### 4.1 Autenticación y Guards
- **Login/Registro**: Almacenados en `localStorage` (puede migrarse a backend).
- **AuthGuard**: Protege rutas privadas; redirige a `/login` si no autenticado.
- **Sesión**: Persiste en `localStorage` hasta logout.

### 4.2 Consumo de API
- **EventService** sincroniza con JSONPlaceholder (`GET /posts`).
- Datos mapeados a `EventItem[]` (id, title, note, description).
- Persistencia en `@ionic/storage` (Ionic Storage) para offline.
- Sincronización best-effort: si hay red, intenta actualizar; si falla, usa local.

### 4.3 Plugin Nativo (Cámara)
- **CameraService**: Envoltura alrededor de `@capacitor/camera`.
- **CameraPage** (/camera):
  - Botón FAB para tomar fotos o seleccionar de galería.
  - Lista de fotos guardadas (con timestamps).
  - Opción de eliminar fotos.
  - Almacenamiento en `@ionic/storage`.

### 4.4 Navegación
- **Side Menu**: Acceso rápido a Home, Actividades, Perfil, Eventos, Galería.
- **Rutas lazy-loaded**: Cada página se carga bajo demanda.
- **Back button** en páginas secundarias.
- **ion-segment** en ActivitiesListPage para filtrado básico.

### 4.5 Animaciones y UI
- **fadeIn**: Animación CSS en Home (ion-card).
- **listAnimation**: Stagger en item-list (carga gradual).
- **Componentes Ionic**: ion-card, ion-button, ion-segment, ion-fab, ion-toolbar, etc.

---

## 5. Notas de desarrollo

### Errores comunes y soluciones
1. **Error: "Cannot find module @ionic/storage-angular"**
   → Asegurar que `npm install @ionic/storage-angular --legacy-peer-deps` se ejecutó.

2. **Error: "Plugin Camera no disponible"**
   → En desarrollo web, `@capacitor/camera` falla elegantemente. En Android/iOS se requiere Capacitor compilado.

3. **Storage no funciona**
   → Verificar que `IonicStorageModule.forRoot()` está en `AppModule.imports` y que `Storage` está inyectado en servicios.

### Próximas mejoras (post-entrega)
- Migrar a un backend propio (Node.js + Express / Firebase) en lugar de JSONPlaceholder.
- Implementar Geolocalización (`@capacitor/geolocation`) como segundo plugin.
- Agregar notificaciones push (`@capacitor/push-notifications`).
- Mejorar formularios con validación más robusta (Reactive Forms).
- Implementar paginación en listados.
- Agregar tests (Jasmine/Karma ya configurado).

---

## 6. Evidencia de compilación

```
Build at: 2025-11-29T02:35:56.892Z
Hash: 55051b0c375a76e3
Time: 10698ms
✅ Compilación exitosa (no errores TS)
```

---

## 7. Commits históricos

```
5af8193 - plugin nativo: agrega CameraService y página CameraPage
234f842 - fix: corrige errores de compilación
a2aa016 - UI: agrega animación fadeIn
7545a52 - UI: añade side menu y menu-button
83ad8a9 - event service: agrega HttpClient y sincronización con API
f9a1ff0 - navegación: ItemListComponent soporta basePath
9fa1b40 - añade ActivitiesListPage y registra rutas /activities
bba7e97 - mejora Home: tarjeta 'Explora actividades' y navegación
5fd591a - inicializa repo y agrega .gitignore y README
```

---

## 8. Contacto y soporte

Para dudas o problemas con la compilación, revisar:
- `README.md` (instrucciones rápidas)
- Documentación de Ionic: https://ionicframework.com/docs
- Documentación de Capacitor: https://capacitorjs.com/docs
- Capacitor Camera: https://capacitorjs.com/docs/apis/camera

---

**Entregable listo para evaluación ✅**
