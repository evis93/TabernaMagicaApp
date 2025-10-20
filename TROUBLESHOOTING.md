# 🔧 Solución de Problemas - TavernaMagica

## ✅ Proyecto Actualizado a Expo SDK 54

Este proyecto ha sido actualizado para funcionar con **Expo SDK 54**, compatible con la versión más reciente de Expo Go.

---

## 🚀 Pasos para instalar y ejecutar

### 1. Elimina node_modules y package-lock.json (si existen)
```bash
cd TavernaMagica
rm -rf node_modules package-lock.json
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Inicia el proyecto
```bash
npm start
```

### 4. Escanea el QR con Expo Go
- **Android**: Abre Expo Go y escanea el QR
- **iOS**: Abre la cámara y escanea el QR

---

## 🐛 Problemas Comunes y Soluciones

### ❌ Error: "Project is incompatible with this version of Expo Go"

**Causa**: Versión de SDK no coincide entre el proyecto y Expo Go.

**Solución**: Ya está resuelto. El proyecto usa SDK 54.

Si aún tienes problemas:
```bash
# Limpia la caché
npm start --reset-cache
```

---

### ❌ Error: "Unable to resolve asset"

**Causa**: Falta el directorio de assets o archivos de iconos.

**Solución**: Ya está resuelto. Se eliminaron las referencias a assets innecesarios.

---

### ❌ Error: "web support dependencies not installed"

**Causa**: Faltan dependencias para soporte web.

**Solución 1** (si NO quieres usar web):
```bash
# Ejecuta solo para Android/iOS
npm start -- --no-web
```

**Solución 2** (si SÍ quieres usar web):
Las dependencias ya están en package.json. Solo ejecuta:
```bash
npm install
```

---

### ❌ Error: "Command not found: expo"

**Solución**:
```bash
# Instala Expo CLI globalmente
npm install -g expo-cli

# O usa npx
npx expo start
```

---

### ❌ Error: "Cannot find module"

**Solución**:
```bash
# Limpia e reinstala
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### ❌ Error: "Metro bundler failed to start"

**Solución**:
```bash
# Limpia la caché de Metro
npm start -- --reset-cache

# O manualmente
rm -rf node_modules/.cache
npm start
```

---

### ❌ La app se cierra inmediatamente en el dispositivo

**Posibles causas**:
1. Error en el código JavaScript
2. Incompatibilidad de versiones
3. Problema con AsyncStorage

**Solución**:
```bash
# 1. Limpia y reinstala
rm -rf node_modules package-lock.json
npm install

# 2. Limpia caché
npm start -- --reset-cache

# 3. Verifica los logs
npm start
# Luego presiona 'j' para abrir el debugger
```

---

### ❌ Error: "Network request failed"

**Causa**: Problemas de red o firewall.

**Solución**:
```bash
# Usa túnel de Expo (más lento pero más confiable)
npm start -- --tunnel

# O usa modo LAN
npm start -- --lan
```

---

### ❌ No aparece el código QR

**Solución**:
```bash
# Inicia en modo clear
npm start -- --clear

# O reinicia con puerto específico
npm start -- --port 19000
```

---

### ❌ Expo Go no escanea el QR

**Solución**:
1. **Android**: Abre la app Expo Go → Presiona "Scan QR Code"
2. **iOS**: Abre la app Cámara → Enfoca el QR
3. Asegúrate de que tu PC y celular estén en la misma red WiFi
4. Si no funciona, usa el modo túnel:
   ```bash
   npm start -- --tunnel
   ```

---

### ❌ Error: "Invariant Violation" o "Element type is invalid"

**Causa**: Problema con imports o componentes.

**Solución**:
```bash
# Asegúrate de que todos los archivos están en su lugar
# Verifica que la estructura sea:
TavernaMagica/
├── models/ProductModel.js
├── controllers/ProductController.js
├── screens/ProductsScreen.js
└── styles/ProductStyles.js
```

---

## 🔍 Verificar que todo está bien

### Comprobar versión de Node.js
```bash
node --version
# Debe ser v18 o superior
```

### Comprobar estructura del proyecto
```bash
ls -la
# Debes ver: models/, controllers/, screens/, styles/, App.js, package.json
```

### Comprobar dependencias instaladas
```bash
npm list expo
npm list react-native
npm list @react-native-async-storage/async-storage
```

---

## 📱 Versiones compatibles

| Componente | Versión |
|-----------|---------|
| Expo SDK | 54.x |
| Node.js | 18+ |
| npm | 8+ |
| Expo Go (Android) | Última versión en Play Store |
| Expo Go (iOS) | Última versión en App Store |

---

## 🆘 Si nada funciona

### Opción 1: Reinstalación completa
```bash
# 1. Borra todo
rm -rf node_modules package-lock.json

# 2. Reinstala
npm install

# 3. Limpia caché
npm start -- --reset-cache
```

### Opción 2: Usa el modo de desarrollo web (temporal)
```bash
npm start
# Luego presiona 'w' para abrir en navegador
```

### Opción 3: Verifica los logs detallados
```bash
# Terminal 1: Inicia con logs
npm start

# Terminal 2: Observa los logs del dispositivo
# Android:
adb logcat

# iOS:
# Abre Xcode y ve a Window > Devices and Simulators
```

---

## 💡 Consejos útiles

### ✅ Asegúrate de que:
- Tu PC y celular están en la misma red WiFi
- El firewall no bloquea Expo
- Tienes la última versión de Expo Go instalada
- Node.js está actualizado (v18+)

### ✅ Durante el desarrollo:
- Usa `npm start -- --reset-cache` si algo no se actualiza
- Recarga la app con: shake del dispositivo → "Reload"
- Abre el menú de desarrollo: shake del dispositivo

### ✅ Para debugging:
- Presiona `j` en la terminal para abrir Chrome DevTools
- Usa `console.log()` liberalmente en tu código
- Verifica los logs en la terminal donde ejecutaste `npm start`

---

## 📚 Recursos adicionales

- **Documentación de Expo**: https://docs.expo.dev/
- **Troubleshooting Expo**: https://docs.expo.dev/troubleshooting/
- **React Native Docs**: https://reactnative.dev/
- **AsyncStorage Docs**: https://react-native-async-storage.github.io/

---

## 🎯 Resumen rápido

```bash
# Pasos básicos que resuelven el 90% de problemas:
rm -rf node_modules package-lock.json
npm install
npm start -- --reset-cache
# Escanea el QR con Expo Go
```

---

**¡Ahora el proyecto debería funcionar sin problemas!** 🚀

Si sigues teniendo problemas después de seguir esta guía, verifica que:
1. Todos los archivos del proyecto están presentes
2. La estructura de carpetas es correcta
3. No hay errores de sintaxis en el código
