# Instrucciones para Generar Keystore Android (.jks)

## Requisitos
- Java JDK instalado (versión 8 o superior)


```
C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe
```

## Generar el Keystore

### Comando para Generar
```bash
keytool -genkey -v -keystore miapp-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias miapp-key
```



### Comando Automatizado (Sin Prompts)
```bash
keytool -genkey -v -keystore miapp-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias miapp-key -storepass miapp123 -keypass miapp123 -dname "CN=MiApp Development, OU=Development, O=MiApp, L=Santiago, ST=RM, C=CL"
```


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
