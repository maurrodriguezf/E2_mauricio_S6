# Entrega: Proyecto Ionic

Instrucciones para entrega y desarrollo rápido.

- **Repositorio**: Añadir la URL del repositorio git en la presentación o en este README antes de entregar.
- **Commits**: Hacer commits frecuentes y descriptivos (ej.: "crea página de home", "integración API", "persistencia SQLite").

## ¿Qué hice aquí?
- Añadí `.gitignore` para excluir `node_modules`, `www`, `e2e` y otros archivos generados.

## Persistencia y sincronización (guía rápida)

El proyecto usa `localStorage` para persistencia por defecto y el servicio `EventService` intenta sincronizar datos con un API público (ejemplo: JSONPlaceholder) en modo "best-effort".

Si quieres integrar `Ionic Storage` o `@capacitor-community/sqlite` para cumplir con la entrega (offline/SQLite):

- Instalar `@ionic/storage-angular` y `@ionic/storage` (o `@capacitor-community/sqlite` para SQLite más avanzado):

```powershell
npm install @ionic/storage-angular @ionic/storage
# o para SQLite
npm install @capacitor-community/sqlite
npx cap sync
```

- Inicializar `IonicStorageModule` en `AppModule` y usar su API en lugar de `localStorage`.
- En `EventService`, cambiar `localStorage.getItem/setItem` por llamadas asíncronas a `Storage`.

Se puede añadir sincronización más avanzada (merge, timestamps, resolución de conflictos) una vez tengas el backend.

## Pasos sugeridos para el profesor
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Ejecutar `ionic serve` o `npm start`.

## Siguientes mejoras planificadas
- Mejorar la pantalla `Home` con tarjetas y botones.
- Añadir páginas: `Listado`, `Detalle`, `Perfil`.
- Integrar persistencia local (SQLite / Ionic Storage) y sincronización con API REST.
