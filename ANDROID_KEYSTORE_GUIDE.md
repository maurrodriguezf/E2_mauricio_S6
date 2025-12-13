# Instrucciones para Generar Keystore Android (.jks)

## Requisitos
- Java JDK instalado (versión 8 o superior)

## Opción 1: Instalar Java JDK

### Descargar e Instalar
1. Ve a: https://adoptium.net/
2. Descarga OpenJDK 17 (recomendado) o superior
3. Instala siguiendo las instrucciones
4. Reinicia VS Code/PowerShell

### Verificar Instalación
```powershell
java -version
```

## Opción 2: Usar Android Studio

Si tienes Android Studio instalado, keytool está en:
```
C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe
```

## Generar el Keystore

### Comando para Generar
```bash
keytool -genkey -v -keystore miapp-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias miapp-key
```

### Información Requerida
Durante la ejecución te pedirá:
- **Contraseña del keystore**: (anota esta contraseña, ej: miapp123)
- **Contraseña del alias**: (usa la misma que el keystore)
- **Nombre y apellido**: MiApp Development
- **Unidad organizativa**: Development Team
- **Organización**: MiApp
- **Ciudad**: Tu ciudad
- **Estado/Provincia**: Tu región
- **Código de país (2 letras)**: CL (para Chile)

### Comando Automatizado (Sin Prompts)
```bash
keytool -genkey -v -keystore miapp-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias miapp-key -storepass miapp123 -keypass miapp123 -dname "CN=MiApp Development, OU=Development, O=MiApp, L=Santiago, ST=RM, C=CL"
```

## Opción 3: Usar Keystore Pre-generado para Desarrollo

**⚠️ SOLO PARA DESARROLLO - NO USAR EN PRODUCCIÓN**

He creado un archivo con las credenciales de un keystore de desarrollo.
Puedes usar estos datos temporalmente:

**Archivo**: `android-keystore-info.txt`

### Información del Keystore
```
Archivo: miapp-release-key.jks
Alias: miapp-key
Store Password: miapp123
Key Password: miapp123
Validez: 10000 días (~27 años)
```

## Usar el Keystore

### 1. Para Gradle (android/app/build.gradle)
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../../miapp-release-key.jks')
            storePassword 'miapp123'
            keyAlias 'miapp-key'
            keyPassword 'miapp123'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 2. Para Capacitor
Coloca el archivo `miapp-release-key.jks` en la raíz del proyecto

### 3. Generar APK Firmado
```bash
cd android
./gradlew assembleRelease
```

El APK firmado estará en:
```
android/app/build/outputs/apk/release/app-release.apk
```

## ⚠️ IMPORTANTE: Seguridad

### Para Desarrollo
- ✅ Puedes usar contraseñas simples
- ✅ Compartir el keystore en el equipo

### Para Producción
- ❌ **NUNCA** subas el keystore a Git/GitHub
- ❌ **NUNCA** uses contraseñas simples
- ✅ Usa contraseñas fuertes (mínimo 12 caracteres)
- ✅ Guarda el keystore en un lugar seguro
- ✅ Haz backup del keystore (sin él no podrás actualizar tu app)
- ✅ Agrega `*.jks` a `.gitignore`

### Agregar a .gitignore
```
*.jks
*.keystore
keystore.properties
```

## Verificar Keystore

```bash
keytool -list -v -keystore miapp-release-key.jks -storepass miapp123
```

## Problemas Comunes

### "keytool no es reconocido"
- Instala Java JDK
- O usa la ruta completa: `"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe"`

### "Keystore corrupto"
- Regenera el keystore con el comando de arriba

### "Contraseña incorrecta"
- Asegúrate de usar la contraseña correcta
- Para desarrollo usa: `miapp123`

## Próximos Pasos

1. Instala Java JDK (si no lo tienes)
2. Ejecuta el comando para generar el keystore
3. Guarda las contraseñas en un lugar seguro
4. Configura Gradle con los datos del keystore
5. Genera tu APK firmado

---

**Generado**: 13 de Diciembre, 2024
