# 🚀 Guía de Inicio Rápido - TavernaMagica

## ⚡ 3 pasos para empezar

### 1️⃣ Instalar
```bash
cd TavernaMagica
rm -rf node_modules package-lock.json  # Limpia instalaciones previas
npm install
```

### 2️⃣ Ejecutar
```bash
npm start
```
O si tienes problemas:
```bash
npm start -- --reset-cache
```

### 3️⃣ Ver en tu celular
- Descarga **Expo Go** desde tu tienda de apps (versión más reciente)
- Asegúrate de que tu PC y celular están en la misma red WiFi
- Escanea el código QR que aparece en la terminal
- ¡Listo! Ya puedes usar la app

**Nota**: Este proyecto usa **Expo SDK 54**. Asegúrate de tener la versión más reciente de Expo Go.

---

## 📱 Qué verás al abrir la app

✅ Pantalla principal con lista de productos  
✅ Botón **+** para agregar productos  
✅ Búsqueda en tiempo real  
✅ Filtros por categoría  
✅ Botones de editar y eliminar en cada producto  

---

## 🎯 Primeros pasos recomendados

### 1. Crear tu primer producto
- Toca el botón **+** (arriba a la derecha)
- Completa el formulario
- Toca **Crear**

### 2. Buscar productos
- Escribe en la barra de búsqueda
- Los resultados se filtran automáticamente

### 3. Editar un producto
- Toca el ícono **✏️** en cualquier producto
- Modifica los datos
- Toca **Actualizar**

### 4. Eliminar un producto
- Toca el ícono **🗑️** en cualquier producto
- Confirma la eliminación

### 5. Alternar disponibilidad
- Toca el badge verde/rojo de cualquier producto
- Cambia entre "Disponible" y "No disponible"

---

## 🎨 Personalización rápida

### Cambiar colores
Edita `styles/ProductStyles.js`:
```javascript
const colors = {
  primary: '#E87722',      // Color principal
  secondary: '#3B9BD6',    // Color secundario
  // ...
};
```

### Agregar campos al producto
1. Actualiza `models/ProductModel.js`
2. Actualiza `controllers/ProductController.js` (si necesitas validar)
3. Actualiza `screens/ProductsScreen.js` (formulario)

---

## 🐛 Problemas comunes

### "Command not found: expo"
```bash
npm install -g expo-cli
```

### "Cannot find module..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### La app no carga
```bash
npm start -- --reset-cache
```

### Expo Go no encuentra el servidor
```bash
# Asegúrate de estar en la misma red WiFi
# O usa modo túnel (más lento):
npm start -- --tunnel
```

**Para más ayuda detallada, lee:** `TROUBLESHOOTING.md`

---

## 📚 Documentación completa

- **README.md** → Guía completa de uso
- **ARCHITECTURE.md** → Explicación de MVC
- **STRUCTURE.md** → Estructura del proyecto

---

## 💡 Tips

✅ Los datos se guardan automáticamente  
✅ No necesitas crear base de datos  
✅ Puedes cerrar la app y los datos persisten  
✅ La búsqueda busca en nombre, descripción y categoría  
✅ Puedes crear categorías simplemente escribiéndolas  

---

## 🆘 ¿Necesitas ayuda?

1. Lee el **README.md** para más detalles
2. Revisa **ARCHITECTURE.md** para entender el código
3. Mira **STRUCTURE.md** para ver la organización

---

**¡Disfruta tu app de TavernaMagica!** 🍺✨
