// utils/sampleData.js
// Datos de ejemplo para probar la aplicación

export const sampleProducts = [
  {
    name: 'Cerveza Artesanal IPA',
    description: 'Cerveza India Pale Ale con notas cítricas y amargor balanceado',
    price: 350.00,
    category: 'Bebidas',
    stock: 45,
    available: true,
  },
  {
    name: 'Hamburguesa Mágica',
    description: 'Burger de 200g con queso cheddar, bacon, lechuga, tomate y salsa especial',
    price: 580.00,
    category: 'Comidas',
    stock: 30,
    available: true,
  },
  {
    name: 'Vino Tinto Reserva',
    description: 'Vino tinto de la casa, cosecha 2019. Ideal para carnes',
    price: 420.00,
    category: 'Bebidas',
    stock: 20,
    available: true,
  },
  {
    name: 'Pizza Margarita',
    description: 'Pizza clásica con salsa de tomate, mozzarella y albahaca fresca',
    price: 450.00,
    category: 'Comidas',
    stock: 25,
    available: true,
  },
  {
    name: 'Mojito Clásico',
    description: 'Ron blanco, menta fresca, lima, azúcar y soda',
    price: 320.00,
    category: 'Tragos',
    stock: 0,
    available: false,
  },
  {
    name: 'Brownie con Helado',
    description: 'Brownie de chocolate caliente con helado de vainilla y salsa de chocolate',
    price: 280.00,
    category: 'Postres',
    stock: 15,
    available: true,
  },
  {
    name: 'Agua Mineral',
    description: 'Agua mineral sin gas, 500ml',
    price: 80.00,
    category: 'Bebidas',
    stock: 100,
    available: true,
  },
  {
    name: 'Papas Fritas Grandes',
    description: 'Porción grande de papas fritas crocantes con ketchup y mayonesa',
    price: 220.00,
    category: 'Aperitivos',
    stock: 50,
    available: true,
  },
  {
    name: 'Café Espresso',
    description: 'Café espresso italiano, doble shot',
    price: 120.00,
    category: 'Cafetería',
    stock: 200,
    available: true,
  },
  {
    name: 'Ensalada César',
    description: 'Lechuga romana, pollo grillado, crutones, parmesano y salsa césar',
    price: 380.00,
    category: 'Comidas',
    stock: 18,
    available: true,
  },
  {
    name: 'Cerveza Rubia Tirada',
    description: 'Cerveza rubia tirada de 500ml, bien fría',
    price: 280.00,
    category: 'Bebidas',
    stock: 60,
    available: true,
  },
  {
    name: 'Tabla de Quesos',
    description: 'Selección de quesos artesanales con frutos secos y mermelada',
    price: 520.00,
    category: 'Aperitivos',
    stock: 8,
    available: true,
  },
];

// Función para importar datos de ejemplo
import ProductController from '../controllers/ProductController';

export const loadSampleData = async () => {
  try {
    let successCount = 0;
    let errorCount = 0;

    for (const product of sampleProducts) {
      const result = await ProductController.createProduct(product);
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    return {
      success: true,
      message: `${successCount} productos creados correctamente, ${errorCount} errores`,
      successCount,
      errorCount,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al cargar datos de ejemplo',
      error: error.message,
    };
  }
};

// Función para limpiar todos los datos
import ProductModel from '../models/ProductModel';

export const clearAllData = async () => {
  try {
    await ProductModel.clearAll();
    return {
      success: true,
      message: 'Todos los datos han sido eliminados',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al limpiar datos',
      error: error.message,
    };
  }
};
