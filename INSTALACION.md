# 🎯 INSTRUCCIONES DE INSTALACIÓN - LEE ESTO PRIMERO

## ✅ Proyecto Actualizado para Funcionar

He actualizado el proyecto completo para solucionar **todos** los errores que encontraste:

1. ✅ **SDK actualizado** a versión 54 (compatible con tu Expo Go)
2. ✅ **Assets corregidos** (sin errores de archivos faltantes)  
3. ✅ **Dependencias web agregadas** (react-native-web incluido)

---

## 🚀 PASOS PARA INSTALAR (Solo 4 pasos)

### 📥 PASO 1: Descarga el proyecto actualizado
```
Descarga el archivo: TavernaMagica.zip
Descomprime en tu carpeta de proyectos
```

### 💻 PASO 2: Abre la terminal y navega al proyecto
```bash
cd TavernaMagica
```

### 🧹 PASO 3: Instala las dependencias
```bash
# Si es tu primera instalación:
npm install

# Si ya habías instalado antes:
rm -rf node_modules package-lock.json
npm install
```

**⏱️ Esto tomará 1-3 minutos (es normal)**

### ▶️ PASO 4: Inicia el proyecto
```bash
npm start
```

O si tienes problemas:
```bash
npm start -- --reset-cache
```

**⏱️ Esperará 30-60 segundos mientras compila**

---

## 📱 ABRIR EN TU CELULAR

### 📲 Antes de escanear el QR:

1. **Descarga Expo Go** (si no lo tienes):
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Asegúrate de que:**
   - Tu PC y celular están en la **misma red WiFi**
   - Tienes la **última versión** de Expo Go instalada

### 📷 Escanear el QR:

**En Android:**
1. Abre la app **Expo Go**
2. Toca **"Scan QR Code"**
3. Escanea el código que aparece en tu terminal

**En iOS:**
1. Abre la app **Cámara**
2. Apunta al código QR
3. Toca la notificación que aparece

---

## 🎉 ¡LISTO!

La app debería abrirse en tu celular en 10-20 segundos.

Verás la pantalla principal de **A Taberna Mágica** con:
- 🍺 Header naranja con búsqueda
- ➕ Botón para agregar productos
- 📋 Lista de productos (vacía al inicio)

---

## ❓ SI ALGO NO FUNCIONA

### Problema: "Cannot find module" o errores de instalación
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start -- --reset-cache
```

### Problema: Expo Go no encuentra el servidor
**Solución:**
```bash
# Verifica que estás en la misma red WiFi
# O usa modo túnel (más lento pero más confiable):
npm start -- --tunnel
```

### Problema: La app se cierra inmediatamente
**Solución:**
```bash
# Limpia todo y reinstala:
rm -rf node_modules package-lock.json
npm install
npm start -- --reset-cache
```

### Problema: No aparece el código QR
**Solución:**
```bash
npm start -- --clear
```

---

## 📚 MÁS AYUDA

Si necesitas más ayuda detallada, lee estos archivos:

- **QUICKSTART.md** - Inicio rápido en 3 pasos
- **TROUBLESHOOTING.md** - Solución de todos los problemas comunes
- **CHANGELOG.md** - Qué cambió en esta actualización
- **README.md** - Documentación completa del proyecto

---

## 🆘 COMANDO MÁGICO

Si NADA funciona, ejecuta esto (resuelve 90% de problemas):

```bash
cd TavernaMagica
rm -rf node_modules package-lock.json
npm install
npm start -- --reset-cache
```

Luego escanea el QR con Expo Go.

---

## ✨ Versiones Actualizadas

Este proyecto ahora usa:
- ✅ Expo SDK **54** (última versión)
- ✅ React Native **0.76.5**
- ✅ AsyncStorage **2.1.0**
- ✅ Todas las dependencias web incluidas

Compatible con la versión actual de Expo Go en las tiendas.

---

## 📞 Checklist Rápido

Antes de reportar un problema, verifica:

- [ ] Node.js versión 18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Misma red WiFi en PC y celular
- [ ] Última versión de Expo Go instalada
- [ ] Ejecutaste `npm install` correctamente
- [ ] No hay errores rojos en la terminal

---

## 🎯 Próximos Pasos

Una vez que la app funcione:

1. **Crear tu primer producto**: Toca el botón **+**
2. **Buscar productos**: Usa la barra de búsqueda
3. **Editar**: Toca el ícono ✏️
4. **Eliminar**: Toca el ícono 🗑️
5. **Toggle disponibilidad**: Toca el badge verde/rojo

---

**¡Ahora sí debería funcionar perfectamente!** 🍺✨

**Última actualización:** 15 de Octubre, 2025
