# 📁 Estructura del Proyecto TavernaMagica

```
TavernaMagica/
│
├── 📱 App.js                          # Punto de entrada principal
├── 📦 package.json                    # Dependencias y scripts
├── ⚙️  app.json                        # Configuración de Expo
├── 🔧 babel.config.js                 # Configuración de Babel
├── 🚫 .gitignore                      # Archivos ignorados por Git
│
├── 📘 README.md                       # Documentación principal
├── 🏗️  ARCHITECTURE.md                 # Guía de arquitectura MVC
│
├── 📂 models/                         # MODELOS (Datos)
│   └── ProductModel.js               # Modelo de productos con CRUD
│
├── 📂 controllers/                    # CONTROLADORES (Lógica)
│   └── ProductController.js          # Controlador de productos
│
├── 📂 screens/                        # VISTAS (UI)
│   └── ProductsScreen.js             # Pantalla principal de ABM
│
├── 📂 styles/                         # ESTILOS
│   └── ProductStyles.js              # Estilos con colores de marca
│
└── 📂 utils/                          # UTILIDADES
    └── sampleData.js                 # Datos de ejemplo y helpers
```

## 📋 Descripción de archivos

### Archivos principales

- **App.js** (113 líneas)
  - Punto de entrada de la aplicación
  - Carga directamente ProductsScreen
  - Configura StatusBar con colores de marca

- **package.json**
  - Dependencias: React Native, Expo, AsyncStorage
  - Scripts: start, android, ios, web

- **app.json**
  - Configuración de Expo
  - Colores de splash: #E87722 (naranja TavernaMagica)
  - Bundle identifiers para iOS/Android

### Carpeta models/

- **ProductModel.js** (180 líneas)
  - Clase singleton para gestión de productos
  - Métodos CRUD completos
  - Persistencia con AsyncStorage
  - Búsqueda y filtros
  - Gestión de categorías

### Carpeta controllers/

- **ProductController.js** (230 líneas)
  - Validaciones de negocio
  - Formato estandarizado de respuestas
  - Métodos para todas las operaciones
  - Toggle de disponibilidad
  - Formateo de precios

### Carpeta screens/

- **ProductsScreen.js** (450+ líneas)
  - Vista principal con ABM completo
  - Lista de productos con filtros
  - Modal de creación/edición
  - Modal de confirmación de eliminación
  - Búsqueda en tiempo real
  - Filtros por categoría
  - Estados de carga y error

### Carpeta styles/

- **ProductStyles.js** (400+ líneas)
  - Estilos completos para toda la app
  - Colores de TavernaMagica:
    * Naranja: #E87722
    * Azul: #3B9BD6
    * Azul oscuro: #1B365D
  - Componentes: cards, modals, forms, buttons
  - Responsive design

### Carpeta utils/

- **sampleData.js** (150+ líneas)
  - 12 productos de ejemplo
  - Función para cargar datos de prueba
  - Función para limpiar todos los datos
  - Categorías: Bebidas, Comidas, Tragos, Postres, Aperitivos, Cafetería

## 📊 Estadísticas del proyecto

- **Total de archivos**: 13
- **Líneas de código**: ~1,600+
- **Modelos**: 1 (ProductModel)
- **Controladores**: 1 (ProductController)
- **Pantallas**: 1 (ProductsScreen)
- **Archivos de estilo**: 1
- **Utilidades**: 1

## 🎯 Archivos clave por funcionalidad

### Gestión de datos (CRUD)
```
models/ProductModel.js → Operaciones CRUD
controllers/ProductController.js → Validaciones
```

### Interfaz de usuario
```
screens/ProductsScreen.js → Vista principal
styles/ProductStyles.js → Estilos visuales
```

### Configuración
```
App.js → Entrada
package.json → Dependencias
app.json → Config Expo
```

### Documentación
```
README.md → Guía de uso
ARCHITECTURE.md → Explicación MVC
```

## 🔄 Flujo de archivos

```
Usuario interactúa con:
  ProductsScreen.js (Vista)
    ↓
  Llama a:
    ProductController.js (Controlador)
      ↓
    Valida y llama a:
      ProductModel.js (Modelo)
        ↓
      Guarda/Lee de:
        AsyncStorage (Persistencia)
```

## 📦 Dependencias externas

```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.0",
  "@react-native-async-storage/async-storage": "1.21.0"
}
```

## 🚀 Para empezar

1. Instalar dependencias:
   ```bash
   cd TavernaMagica
   npm install
   ```

2. Iniciar el proyecto:
   ```bash
   npm start
   ```

3. Ver en dispositivo:
   - Escanear QR con Expo Go (móvil)
   - Presionar 'a' para Android
   - Presionar 'i' para iOS

## 📝 Notas

- Todo el código está comentado en español
- Sigue estándares de React Native
- Implementa arquitectura MVC pura
- Sin dependencias innecesarias
- Listo para producción
- Diseño responsive

---

**Proyecto creado para TavernaMagica** 🍺✨
