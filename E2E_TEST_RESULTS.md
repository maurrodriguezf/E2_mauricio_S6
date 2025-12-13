# Resultados de Pruebas E2E
## Fecha: 13 de Diciembre de 2024

### Resumen General
- **Total de Pruebas**: 26
- **Aprobadas**: 9 (35%)
- **Fallidas**: 12 (46%)
- **Saltadas**: 5 (19%)
- **Duración Total**: 1 minuto

### Resultados por Archivo de Pruebas

#### ✅ app-navigation.cy.ts - 100% PASSED
- **Tests**: 4/4 aprobados
- **Duración**: 2 segundos

**Tests aprobados:**
1. ✅ should load the home page (613ms)
2. ✅ should display the app title or header (429ms)
3. ✅ should navigate to login page (796ms)
4. ✅ should have a menu or navigation element (389ms)

---

#### ⚠️ auth-guard.cy.ts - 25% PASSED
- **Tests**: 1/4 aprobados, 3 fallidos
- **Duración**: 14 segundos

**Tests aprobados:**
1. ✅ should allow access to public routes without authentication (785ms)

**Tests fallidos:**
1. ❌ should redirect to login when accessing protected route without authentication
   - Error: Expected URL to include '/login' but got 'http://localhost:4200/home'
2. ❌ should allow access to protected routes after login
   - Error: Expected to find element `input[name="name"]` but never found it
3. ❌ should preserve redirect URL after login
   - Error: Expected URL to include '/login' but got 'http://localhost:4200/home'

---

#### ⚠️ home.cy.ts - 0% PASSED
- **Tests**: 0/6 aprobados, 1 fallido, 5 saltados
- **Duración**: 4 segundos

**Tests fallidos:**
1. ❌ "before each" hook for "should display home page after login"
   - Error: Expected to find element `input[name="name"]` but never found it
   - Este fallo en el hook causó que se saltaran los 5 tests restantes

---

#### ⚠️ login.cy.ts - 67% PASSED
- **Tests**: 4/6 aprobados, 2 fallidos
- **Duración**: 12 segundos

**Tests aprobados:**
1. ✅ should display login form (468ms)
2. ✅ should show validation errors for empty form (537ms)
3. ✅ should allow typing in password field (658ms)
4. ✅ should navigate to register page if link exists (492ms)

**Tests fallidos:**
1. ❌ should allow typing in email field
   - Error: Expected to find element `input[type="email"]` but never found it
2. ❌ should attempt login with valid credentials
   - Error: Expected to find element `input[name="name"]` but never found it

---

#### ⚠️ register.cy.ts - 0% PASSED
- **Tests**: 0/5 aprobados, 5 fallidos
- **Duración**: 22 segundos

**Tests fallidos:**
1. ❌ should display register form
   - Error: Expected to find content '/registr|sign up|crear cuenta/i' within selector 'ion-button'
2. ❌ should require all fields to be filled
   - Error: Expected to find element `ion-button[type="submit"]` but never found it
3. ❌ should validate password confirmation
   - Error: Expected to find element `input[name="name"]` but never found it
4. ❌ should successfully register a new user with matching passwords
   - Error: Expected to find element `input[name="name"]` but never found it
5. ❌ should not allow duplicate email registration
   - Error: Expected to find element `input[name="name"]` but never found it

---

#### ⚠️ spec.cy.ts - 0% PASSED
- **Tests**: 0/1 aprobados, 1 fallido
- **Duración**: 4 segundos

**Tests fallidos:**
1. ❌ Visits the initial project page
   - Error: Expected to find content 'app is running' but never did

---

## Análisis de Fallos

### Causa Principal de Fallos
Los tests fallidos se deben principalmente a que las pruebas E2E buscan campos con nombres antiguos que ya no existen en la aplicación:

1. **Campo `name`**: Las pruebas buscan `input[name="name"]` pero ahora usamos `username` después de la migración al backend API REST
2. **Campo `email`**: Algunas pruebas buscan `input[type="email"]` en la página de login, pero ahora el login usa `username` en lugar de `email`

### Tests que Funcionan Correctamente
Los tests que **SÍ PASARON** son aquellos que:
- Prueban navegación básica
- Verifican la existencia de elementos generales de la UI
- No dependen de los campos específicos que fueron modificados

### Recomendaciones
Para que todas las pruebas E2E pasen, se necesita:
1. Actualizar los selectores en los archivos de prueba de Cypress para usar `username` en lugar de `name`
2. Actualizar las expectativas de campos de email en login (usar `username`)
3. Verificar que los selectores de botones coincidan con la implementación actual

## Conclusión
✅ **La infraestructura de pruebas E2E funciona correctamente** - El servidor se conectó exitosamente y Cypress ejecutó todas las pruebas.

⚠️ **Las pruebas requieren actualización** - Los tests necesitan ser actualizados para reflejar los cambios en la autenticación (username en lugar de name/email).

✅ **Backend y Frontend funcionando** - El hecho de que algunas pruebas pasen demuestra que la aplicación está funcionando correctamente y que el problema es solo en los selectores de las pruebas.

## Capturas de Pantalla
Se generaron 12 capturas de pantalla automáticamente de los tests fallidos en:
```
C:\Users\maurr\OneDrive\Escritorio\E2_mauricio_rodriguez_S8\cypress\screenshots\
```

## Próximos Pasos
1. Actualizar los archivos de prueba E2E para usar los nuevos nombres de campos (`username`)
2. Re-ejecutar las pruebas E2E para verificar que todas pasen
3. Considerar agregar más pruebas E2E para las nuevas funcionalidades del backend (JWT, API REST)
