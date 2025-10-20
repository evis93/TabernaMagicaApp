# 🏗️ Arquitectura MVC - TavernaMagica

Esta guía explica cómo funciona la arquitectura MVC implementada en este proyecto.

## 📐 Patrón MVC (Model-View-Controller)

El patrón MVC divide la aplicación en tres componentes principales:

```
┌─────────────┐
│    VIEW     │ ← Usuario interactúa
│  (Screen)   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ CONTROLLER  │ ← Maneja lógica de negocio
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    MODEL    │ ← Gestiona datos
└─────────────┘
```

## 🔵 MODEL (Modelo)

**Archivo:** `models/ProductModel.js`

**Responsabilidades:**
- Gestionar los datos de productos
- Operaciones CRUD (Create, Read, Update, Delete)
- Persistencia con AsyncStorage
- No contiene lógica de UI ni validaciones de negocio

**Métodos principales:**
```javascript
// Cargar productos desde storage
await ProductModel.loadProducts();

// Guardar productos en storage
await ProductModel.saveProducts();

// Obtener todos
await ProductModel.getAll();

// Obtener por ID
await ProductModel.getById(id);

// Crear
await ProductModel.create(data);

// Actualizar
await ProductModel.update(id, data);

// Eliminar
await ProductModel.delete(id);

// Buscar
await ProductModel.search(query);

// Filtrar por categoría
await ProductModel.filterByCategory(category);

// Obtener categorías
await ProductModel.getCategories();
```

**Ejemplo de uso directo:**
```javascript
import ProductModel from '../models/ProductModel';

// Crear un producto
const newProduct = await ProductModel.create({
  name: 'Pizza Napolitana',
  price: 450,
  category: 'Comidas',
  stock: 10,
  available: true
});

// Obtener todos los productos
const products = await ProductModel.getAll();
```

## 🟢 CONTROLLER (Controlador)

**Archivo:** `controllers/ProductController.js`

**Responsabilidades:**
- Validar datos antes de enviar al modelo
- Manejar lógica de negocio
- Formatear respuestas para la vista
- Actuar como intermediario entre Model y View

**Métodos principales:**
```javascript
// Validar producto
ProductController.validateProduct(data);

// Obtener todos (con formato de respuesta)
await ProductController.getAllProducts();

// Obtener uno
await ProductController.getProduct(id);

// Crear con validación
await ProductController.createProduct(data);

// Actualizar con validación
await ProductController.updateProduct(id, data);

// Eliminar
await ProductController.deleteProduct(id);

// Buscar
await ProductController.searchProducts(query);

// Filtrar por categoría
await ProductController.filterByCategory(category);

// Toggle disponibilidad
await ProductController.toggleAvailability(id);

// Formatear precio
ProductController.formatPrice(price);
```

**Formato de respuesta estandarizado:**
```javascript
{
  success: boolean,     // ¿Operación exitosa?
  data: any,           // Datos retornados
  message: string,     // Mensaje descriptivo
  errors?: object      // Errores (si hay)
}
```

**Ejemplo de uso:**
```javascript
import ProductController from '../controllers/ProductController';

// Crear producto con validación automática
const result = await ProductController.createProduct({
  name: 'Coca Cola',
  price: 150,
  category: 'Bebidas',
  stock: 50
});

if (result.success) {
  console.log('Producto creado:', result.data);
  Alert.alert('Éxito', result.message);
} else {
  console.log('Errores:', result.errors);
  Alert.alert('Error', result.message);
}
```

**Validaciones automáticas:**
```javascript
// El controlador valida:
- Nombre no vacío ✓
- Precio > 0 ✓
- Stock >= 0 ✓
- Tipos de datos correctos ✓

// Ejemplo de error:
{
  success: false,
  message: 'Datos inválidos',
  errors: {
    name: 'El nombre es obligatorio',
    price: 'El precio debe ser un número mayor a 0'
  }
}
```

## 🟣 VIEW (Vista)

**Archivo:** `screens/ProductsScreen.js`

**Responsabilidades:**
- Renderizar la interfaz de usuario
- Capturar interacciones del usuario
- Llamar al Controller para operaciones
- Mostrar feedback visual al usuario

**Estructura del componente:**
```javascript
const ProductsScreen = () => {
  // 1. ESTADOS
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({...});
  
  // 2. EFECTOS
  useEffect(() => {
    loadProducts(); // Cargar al iniciar
  }, []);
  
  // 3. FUNCIONES QUE LLAMAN AL CONTROLLER
  const loadProducts = async () => {
    const result = await ProductController.getAllProducts();
    if (result.success) {
      setProducts(result.data);
    }
  };
  
  const saveProduct = async () => {
    const result = await ProductController.createProduct(formData);
    if (result.success) {
      setModalVisible(false);
      await loadProducts();
      Alert.alert('Éxito', result.message);
    }
  };
  
  // 4. RENDER
  return (
    <View>
      {/* UI Components */}
    </View>
  );
};
```

**Flujo de datos:**
```
Usuario toca "Crear" 
  → Vista llama saveProduct()
    → saveProduct() llama ProductController.createProduct()
      → Controller valida datos
        → Controller llama ProductModel.create()
          → Model guarda en AsyncStorage
            → Model retorna producto creado
              → Controller retorna {success, data, message}
                → Vista actualiza UI y muestra mensaje
```

## 🔄 Flujo completo de ejemplo

### Crear un producto:

1. **Vista (ProductsScreen.js)**
```javascript
const saveProduct = async () => {
  // Vista llama al controller
  const result = await ProductController.createProduct({
    name: 'Pizza',
    price: 450,
    category: 'Comidas',
    stock: 10
  });
  
  if (result.success) {
    Alert.alert('Éxito', result.message);
    loadProducts(); // Recargar lista
  }
};
```

2. **Controller (ProductController.js)**
```javascript
async createProduct(productData) {
  // Valida los datos
  const validation = this.validateProduct(productData);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      message: 'Datos inválidos'
    };
  }
  
  // Llama al modelo
  const newProduct = await ProductModel.create(productData);
  
  return {
    success: true,
    data: newProduct,
    message: 'Producto creado exitosamente'
  };
}
```

3. **Model (ProductModel.js)**
```javascript
async create(productData) {
  await this.loadProducts();
  
  const newProduct = {
    id: this.generateId(),
    ...productData,
    createdAt: new Date().toISOString(),
  };
  
  this.products.push(newProduct);
  await this.saveProducts(); // Guarda en AsyncStorage
  
  return newProduct;
}
```

## 📊 Beneficios de esta arquitectura

### ✅ Separación de responsabilidades
- Cada capa tiene una función específica
- Fácil de entender y mantener

### ✅ Reutilización
- El Controller y Model pueden usarse en diferentes Views
- Ejemplo: Podrías crear una nueva pantalla de reportes que use el mismo Controller

### ✅ Testeable
- Puedes testear cada capa independientemente
- Model sin UI
- Controller sin datos reales
- View con datos mockeados

### ✅ Escalable
- Fácil agregar nuevas funcionalidades
- Ejemplo: Agregar un nuevo modelo de "Categorías"

### ✅ Mantenible
- Cambios en la UI no afectan la lógica de negocio
- Cambios en storage no afectan la UI

## 🎯 Buenas prácticas aplicadas

### 1. La Vista NO tiene lógica de negocio
```javascript
// ❌ MAL - Lógica en la vista
const saveProduct = async () => {
  if (!formData.name || formData.name.trim() === '') {
    Alert.alert('Error', 'Nombre obligatorio');
    return;
  }
  // más validaciones...
};

// ✅ BIEN - Delegar al controller
const saveProduct = async () => {
  const result = await ProductController.createProduct(formData);
  Alert.alert(result.success ? 'Éxito' : 'Error', result.message);
};
```

### 2. El Controller NO maneja AsyncStorage
```javascript
// ❌ MAL - Controller con AsyncStorage
async createProduct(data) {
  const products = await AsyncStorage.getItem('@products');
  // ...
}

// ✅ BIEN - Controller llama al modelo
async createProduct(data) {
  const newProduct = await ProductModel.create(data);
  return { success: true, data: newProduct };
}
```

### 3. El Model NO valida reglas de negocio
```javascript
// ❌ MAL - Modelo con validaciones
async create(data) {
  if (data.price <= 0) throw new Error('Precio inválido');
  // ...
}

// ✅ BIEN - Modelo solo gestiona datos
async create(data) {
  const newProduct = { id: this.generateId(), ...data };
  this.products.push(newProduct);
  await this.saveProducts();
  return newProduct;
}
```

## 🚀 Extender la aplicación

### Agregar un nuevo campo (ej: "código de barras")

**1. Actualizar Model:**
```javascript
// models/ProductModel.js
async create(productData) {
  const newProduct = {
    id: this.generateId(),
    name: productData.name,
    barcode: productData.barcode, // ← Nuevo campo
    // ... resto de campos
  };
  // ...
}
```

**2. Actualizar Controller (si requiere validación):**
```javascript
// controllers/ProductController.js
validateProduct(data) {
  const errors = {};
  
  if (data.barcode && data.barcode.length !== 13) {
    errors.barcode = 'El código debe tener 13 dígitos';
  }
  
  // ... resto de validaciones
}
```

**3. Actualizar View:**
```javascript
// screens/ProductsScreen.js
<TextInput
  placeholder="Código de barras"
  value={formData.barcode}
  onChangeText={(text) => setFormData({...formData, barcode: text})}
  keyboardType="number-pad"
/>
```

## 📚 Recursos adicionales

- **React Native Docs**: https://reactnative.dev/
- **Expo Docs**: https://docs.expo.dev/
- **AsyncStorage**: https://react-native-async-storage.github.io/async-storage/

---

Esta arquitectura MVC hace que TavernaMagica sea mantenible, escalable y profesional. 🍺✨
