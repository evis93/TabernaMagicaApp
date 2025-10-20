# 📱 Vista Previa de la Interfaz

## 🏠 Pantalla Principal

```
╔══════════════════════════════════════════╗
║  🍺 A Taberna Mágica                     ║
║  ┌────────────────────────────┐  ┌───┐  ║
║  │ 🔍 Buscar productos...     │  │ + │  ║
║  └────────────────────────────┘  └───┘  ║
╠══════════════════════════════════════════╣
║  [Todos] [Bebidas] [Comidas] [Tragos] → ║
╠══════════════════════════════════════════╣
║                                          ║
║  ┌──────────────────────────────────┐   ║
║  │ Cerveza Artesanal IPA            │   ║
║  │ Bebidas                 [Disponible] │
║  │ Cerveza India Pale Ale con...    │   ║
║  │                                   │   ║
║  │ $350.00        Stock: 45          │   ║
║  │                      [✏️] [🗑️]    │   ║
║  └──────────────────────────────────┘   ║
║                                          ║
║  ┌──────────────────────────────────┐   ║
║  │ Hamburguesa Mágica               │   ║
║  │ Comidas                 [Disponible] │
║  │ Burger de 200g con queso...      │   ║
║  │                                   │   ║
║  │ $580.00        Stock: 30          │   ║
║  │                      [✏️] [🗑️]    │   ║
║  └──────────────────────────────────┘   ║
║                                          ║
║  ┌──────────────────────────────────┐   ║
║  │ Pizza Margarita                  │   ║
║  │ Comidas                 [Disponible] │
║  │ Pizza clásica con salsa de...    │   ║
║  │                                   │   ║
║  │ $450.00        Stock: 25          │   ║
║  │                      [✏️] [🗑️]    │   ║
║  └──────────────────────────────────┘   ║
║                                          ║
╚══════════════════════════════════════════╝
```

## ➕ Modal de Crear/Editar Producto

```
╔══════════════════════════════════════════╗
║                                          ║
║    ┌────────────────────────────┐       ║
║    │                            │       ║
║    │  Nuevo Producto        [×] │       ║
║    ├────────────────────────────┤       ║
║    │                            │       ║
║    │  Nombre *                  │       ║
║    │  ┌──────────────────────┐ │       ║
║    │  │ Ej: Cerveza IPA      │ │       ║
║    │  └──────────────────────┘ │       ║
║    │                            │       ║
║    │  Descripción               │       ║
║    │  ┌──────────────────────┐ │       ║
║    │  │ Descripción...       │ │       ║
║    │  │                      │ │       ║
║    │  └──────────────────────┘ │       ║
║    │                            │       ║
║    │  Precio *      Stock       │       ║
║    │  ┌─────────┐  ┌─────────┐ │       ║
║    │  │  0.00   │  │    0    │ │       ║
║    │  └─────────┘  └─────────┘ │       ║
║    │                            │       ║
║    │  Categoría                 │       ║
║    │  ┌──────────────────────┐ │       ║
║    │  │ Bebidas              │ │       ║
║    │  └──────────────────────┘ │       ║
║    │                            │       ║
║    │  Producto disponible  ☑️   │       ║
║    │                            │       ║
║    │  ┌─────────┐  ┌─────────┐ │       ║
║    │  │Cancelar │  │ Crear   │ │       ║
║    │  └─────────┘  └─────────┘ │       ║
║    │                            │       ║
║    └────────────────────────────┘       ║
║                                          ║
╚══════════════════════════════════════════╝
```

## 🗑️ Modal de Confirmación de Eliminación

```
╔══════════════════════════════════════════╗
║                                          ║
║            ┌──────────────┐             ║
║            │              │             ║
║            │   ¿Eliminar  │             ║
║            │   producto?  │             ║
║            │              │             ║
║            │ ¿Estás seguro│             ║
║            │ de eliminar  │             ║
║            │ "Pizza"?     │             ║
║            │              │             ║
║            │ Esta acción  │             ║
║            │ no se puede  │             ║
║            │ deshacer.    │             ║
║            │              │             ║
║            │  ┌────────┐  │             ║
║            │  │Cancelar│  │             ║
║            │  └────────┘  │             ║
║            │  ┌────────┐  │             ║
║            │  │Eliminar│  │             ║
║            │  └────────┘  │             ║
║            │              │             ║
║            └──────────────┘             ║
║                                          ║
╚══════════════════════════════════════════╝
```

## 📦 Estado Vacío

```
╔══════════════════════════════════════════╗
║  🍺 A Taberna Mágica                     ║
║  ┌────────────────────────────┐  ┌───┐  ║
║  │ 🔍 Buscar productos...     │  │ + │  ║
║  └────────────────────────────┘  └───┘  ║
╠══════════════════════════════════════════╣
║  [Todos] [Bebidas] [Comidas] [Tragos] → ║
╠══════════════════════════════════════════╣
║                                          ║
║                                          ║
║                                          ║
║                  📦                      ║
║                                          ║
║            No hay productos              ║
║                                          ║
║         Agrega tu primer producto        ║
║                                          ║
║                                          ║
║                                          ║
║                                          ║
╚══════════════════════════════════════════╝
```

## 🎨 Paleta de Colores

```
┌─────────────────────────────────────────┐
│                                         │
│  🟠 Naranja Principal (#E87722)         │
│     • Header                            │
│     • Botón Crear/Actualizar            │
│     • Precio destacado                  │
│                                         │
│  🔵 Azul Secundario (#3B9BD6)           │
│     • Botón editar                      │
│     • Categoría activa                  │
│                                         │
│  🔷 Azul Oscuro (#1B365D)               │
│     • Títulos                           │
│     • Texto principal                   │
│                                         │
│  🟢 Verde Éxito (#10B981)               │
│     • Badge "Disponible"                │
│                                         │
│  🔴 Rojo Peligro (#EF4444)              │
│     • Botón eliminar                    │
│     • Badge "No disponible"             │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Componentes Principales

### 1. Header
```
╔═══════════════════════════════════╗
║ 🍺 A Taberna Mágica              ║ ← Naranja #E87722
║ ┌───────────────────┐  ┌───┐    ║
║ │ 🔍 Buscar...      │  │ + │    ║
║ └───────────────────┘  └───┘    ║
╚═══════════════════════════════════╝
```

### 2. Filtros de Categoría
```
┌─────────────────────────────────────┐
│ [Todos] [Bebidas] [Comidas] [→]    │ ← Scroll horizontal
└─────────────────────────────────────┘
  Active  Inactive  Inactive
```

### 3. Card de Producto
```
┌───────────────────────────────────┐
│ Nombre del Producto               │ ← Bold, 18px
│ Categoría         [Badge Estado]  │ ← 12px, Badge 
│ Descripción del producto...       │ ← Gray, 14px
│ ─────────────────────────────────│
│ $XXX.XX      Stock: XX    [✏️] [🗑️]│
└───────────────────────────────────┘
```

### 4. Formulario
```
┌────────────────────────────┐
│ Label del campo            │
│ ┌────────────────────────┐│
│ │ Input...               ││ ← Border radius 12px
│ └────────────────────────┘│
│ ⚠️ Mensaje de error        │ ← Solo si hay error
└────────────────────────────┘
```

## 🎯 Flujo de Usuario

```
Inicio
  │
  ├─→ Ver lista de productos
  │   ├─→ Buscar producto
  │   ├─→ Filtrar por categoría
  │   └─→ Ver detalle en card
  │
  ├─→ Tocar [+]
  │   ├─→ Completar formulario
  │   ├─→ Tocar [Crear]
  │   └─→ Ver producto en lista
  │
  ├─→ Tocar [✏️]
  │   ├─→ Modificar campos
  │   ├─→ Tocar [Actualizar]
  │   └─→ Ver cambios reflejados
  │
  ├─→ Tocar [🗑️]
  │   ├─→ Confirmar eliminación
  │   └─→ Producto eliminado
  │
  └─→ Tocar [Badge Estado]
      └─→ Toggle disponibilidad
```

## 📐 Dimensiones Clave

- **Botón principal (+)**: 50×50px
- **Botones de acción (✏️🗑️)**: 40×40px
- **Card de producto**: Ancho completo, padding 15px
- **Input de formulario**: Alto 50px, radius 12px
- **Badge de estado**: padding 6×12px, radius 12px
- **Header**: padding top 50px

## ✨ Animaciones y Efectos

```
• Modal entrada/salida: Slide from bottom
• Cards: Shadow & elevation
• Botones: Scale on press (0.95)
• Búsqueda: Filtro en tiempo real
• Switch: Animación nativa de iOS/Android
```

---

**Interfaz diseñada para ser intuitiva y eficiente** 🎨
