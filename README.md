# 🍺 A Taberna Mágica - ABM de Productos

Sistema de gestión de productos (ABM) para TavernaMagica en React Native con estructura MVC.

## 📋 Características

✅ **Alta de productos** - Crear nuevos productos con todos sus datos  
✅ **Baja de productos** - Eliminar productos con confirmación  
✅ **Modificación de productos** - Editar información existente  
✅ **Listado completo** - Ver todos los productos disponibles  
✅ **Búsqueda en tiempo real** - Filtrar productos por nombre, descripción o categoría  
✅ **Filtros por categoría** - Organizar productos por tipo  
✅ **Toggle de disponibilidad** - Activar/desactivar productos rápidamente  
✅ **Persistencia local** - Los datos se guardan en AsyncStorage  
✅ **Sin login** - Acceso directo a la pantalla de gestión  

## 🏗️ Estructura MVC

```
TavernaMagica/
├── models/
│   └── ProductModel.js          # Lógica de datos y operaciones CRUD
├── controllers/
│   └── ProductController.js     # Lógica de negocio y validaciones
├── screens/
│   └── ProductsScreen.js        # Vista principal (interfaz de usuario)
├── styles/
│   └── ProductStyles.js         # Estilos con colores de TavernaMagica
├── App.js                       # Punto de entrada
└── package.json                 # Dependencias
```

## 🎨 Diseño

**Colores de la marca:**
- 🟠 Naranja principal: `#E87722`
- 🔵 Azul secundario: `#3B9BD6`
- 🔷 Azul oscuro: `#1B365D`
- ⚪ Blanco: `#FFFFFF`

## 🚀 Instalación

### Requisitos previos
- Node.js (v18 o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app en tu dispositivo móvil (compatible con SDK 54)

### Pasos de instalación

1. **Navegar al directorio del proyecto**
```bash
cd TavernaMagica
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el proyecto**
```bash
npm start
```

4. **Ejecutar en dispositivo**
   - Escanea el código QR con Expo Go (Android)
   - Escanea con la cámara (iOS)
   - Presiona `a` para Android emulator
   - Presiona `i` para iOS simulator

**Nota:** Este proyecto usa Expo SDK 54. Asegúrate de tener la versión más reciente de Expo Go instalada en tu dispositivo.

## 📱 Uso de la aplicación

### Pantalla principal
Al iniciar la app, verás directamente la pantalla de gestión de productos con:
- Barra de búsqueda en el header
- Botón "+" para agregar productos
- Filtros de categorías (scroll horizontal)
- Lista de productos con todas sus acciones

### Crear un producto
1. Toca el botón **+** en el header
2. Completa el formulario:
   - **Nombre*** (obligatorio)
   - **Descripción** (opcional)
   - **Precio*** (obligatorio, número mayor a 0)
   - **Stock** (opcional, por defecto 0)
   - **Categoría** (por defecto "Bebidas")
   - **Disponible** (switch activado/desactivado)
3. Toca **Crear**

### Editar un producto
1. Toca el ícono **✏️** en la card del producto
2. Modifica los campos deseados
3. Toca **Actualizar**

### Eliminar un producto
1. Toca el ícono **🗑️** en la card del producto
2. Confirma la eliminación en el modal
3. El producto se eliminará permanentemente

### Alternar disponibilidad
- Toca el badge de disponibilidad (verde/rojo) en cualquier producto
- Cambiará instantáneamente entre "Disponible" y "No disponible"

### Buscar productos
- Escribe en la barra de búsqueda del header
- Los resultados se filtran en tiempo real
- Busca por nombre, descripción o categoría

### Filtrar por categoría
- Desliza horizontalmente en las categorías
- Toca una categoría para ver solo esos productos
- Toca "Todos" para ver todos los productos

## 🗂️ Modelo de datos

```javascript
{
  id: "único",                    // Generado automáticamente
  name: "string",                 // Nombre del producto
  description: "string",          // Descripción detallada
  price: number,                  // Precio (float)
  category: "string",             // Categoría del producto
  stock: number,                  // Cantidad en inventario
  available: boolean,             // Disponibilidad
  createdAt: "ISO string",        // Fecha de creación
  updatedAt: "ISO string"         // Fecha de última actualización
}
```

## 🔧 Controlador - Métodos disponibles

```javascript
// Obtener todos los productos
await ProductController.getAllProducts();

// Crear producto
await ProductController.createProduct(data);

// Actualizar producto
await ProductController.updateProduct(id, data);

// Eliminar producto
await ProductController.deleteProduct(id);

// Buscar productos
await ProductController.searchProducts(query);

// Filtrar por categoría
await ProductController.filterByCategory(category);

// Obtener categorías
await ProductController.getCategories();

// Alternar disponibilidad
await ProductController.toggleAvailability(id);

// Formatear precio
ProductController.formatPrice(price);
```

## 💾 Persistencia de datos

Los datos se guardan automáticamente en **AsyncStorage** con cada operación:
- Crear producto → guarda inmediatamente
- Actualizar producto → guarda inmediatamente
- Eliminar producto → guarda inmediatamente

Los datos persisten entre sesiones de la aplicación.

## 🎯 Validaciones

El controlador valida automáticamente:
- ✅ Nombre no vacío
- ✅ Precio mayor a 0
- ✅ Stock mayor o igual a 0
- ✅ Tipos de datos correctos

Los errores se muestran en el formulario debajo de cada campo.

## 🔄 Respuestas del controlador

Todas las operaciones retornan un objeto con:
```javascript
{
  success: boolean,      // true si la operación fue exitosa
  data: any,            // datos retornados
  message: string,      // mensaje descriptivo
  errors?: object       // errores de validación (si aplica)
}
```

## 📦 Dependencias principales

- **react-native** 0.76.5 - Framework principal
- **expo** ~54.0.0 - Plataforma de desarrollo (SDK 54)
- **@react-native-async-storage/async-storage** ~2.1.0 - Almacenamiento local
- **react-native-web** ~0.19.13 - Soporte web (opcional)
- **react-dom** 18.3.1 - DOM para web (opcional)

## 🛠️ Estructura de archivos creados

```
✅ models/ProductModel.js           - Modelo de datos
✅ controllers/ProductController.js - Controlador de lógica
✅ screens/ProductsScreen.js        - Vista principal
✅ styles/ProductStyles.js          - Estilos de la app
✅ App.js                          - Punto de entrada
✅ package.json                    - Configuración y dependencias
✅ README.md                       - Este archivo
```

## 🎨 Personalización

Para modificar los colores, edita el archivo `styles/ProductStyles.js`:
```javascript
const colors = {
  primary: '#E87722',      // Naranja
  secondary: '#3B9BD6',    // Azul
  dark: '#1B365D',         // Azul oscuro
  // ... más colores
};
```

## 📝 Notas importantes

- ✅ No requiere autenticación
- ✅ Los datos se guardan localmente en el dispositivo
- ✅ La app inicia directamente en la pantalla de productos
- ✅ Diseño responsive y optimizado para móvil
- ✅ Botones grandes para facilitar el toque
- ✅ Validaciones en tiempo real

## 🚧 Próximas mejoras sugeridas

- [ ] Agregar imágenes a los productos
- [ ] Exportar/importar datos en JSON
- [ ] Gráficos de ventas por categoría
- [ ] Historial de cambios
- [ ] Ordenamiento personalizado
- [ ] Modo oscuro

## 📄 Licencia

Proyecto desarrollado para TavernaMagica.

---

**¡Listo para usar!** 🎉

Ejecuta `npm start` y empieza a gestionar tus productos.
