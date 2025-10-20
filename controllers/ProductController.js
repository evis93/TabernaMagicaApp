// controllers/ProductController.js
import ProductModel from '../models/ProductModel';

class ProductController {
  validateProduct(data) {
    const errors = {};

    if (!data.name || data.name.trim() === '') {
      errors.name = 'El nombre es obligatorio';
    }

    if (!data.price || isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
      errors.price = 'El precio debe ser un número mayor a 0';
    }

    if (data.stock !== undefined && (isNaN(parseInt(data.stock)) || parseInt(data.stock) < 0)) {
      errors.stock = 'El stock debe ser un número mayor o igual a 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  async getAllProducts() {
    try {
      const products = await ProductModel.getAll();
      return {
        success: true,
        data: products,
        message: `${products.length} productos cargados`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Error al cargar productos',
        error: error.message
      };
    }
  }

  async getProduct(id) {
    try {
      const product = await ProductModel.getById(id);
      if (!product) {
        return {
          success: false,
          data: null,
          message: 'Producto no encontrado'
        };
      }
      return {
        success: true,
        data: product,
        message: 'Producto encontrado'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error al obtener producto',
        error: error.message
      };
    }
  }

  async createProduct(productData) {
    try {
      const validation = this.validateProduct(productData);
      if (!validation.isValid) {
        return {
          success: false,
          data: null,
          message: 'Datos inválidos',
          errors: validation.errors
        };
      }

      const newProduct = await ProductModel.create(productData);
      return {
        success: true,
        data: newProduct,
        message: 'Producto creado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error al crear producto',
        error: error.message
      };
    }
  }

  async updateProduct(id, productData) {
    try {
      const validation = this.validateProduct(productData);
      if (!validation.isValid) {
        return {
          success: false,
          data: null,
          message: 'Datos inválidos',
          errors: validation.errors
        };
      }

      const updatedProduct = await ProductModel.update(id, productData);
      return {
        success: true,
        data: updatedProduct,
        message: 'Producto actualizado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error al actualizar producto',
        error: error.message
      };
    }
  }

  async deleteProduct(id) {
    try {
      await ProductModel.delete(id);
      return {
        success: true,
        data: null,
        message: 'Producto eliminado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error al eliminar producto',
        error: error.message
      };
    }
  }

  async searchProducts(query) {
    try {
      const products = await ProductModel.search(query);
      return {
        success: true,
        data: products,
        message: `${products.length} productos encontrados`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Error al buscar productos',
        error: error.message
      };
    }
  }

  async filterByCategory(category) {
    try {
      const products = await ProductModel.filterByCategory(category);
      return {
        success: true,
        data: products,
        message: `${products.length} productos en ${category}`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Error al filtrar productos',
        error: error.message
      };
    }
  }

  async getCategories() {
    try {
      const categories = await ProductModel.getCategories();
      return {
        success: true,
        data: categories,
        message: `${categories.length} categorías disponibles`
      };
    } catch (error) {
      return {
        success: false,
        data: ['Todos'],
        message: 'Error al cargar categorías',
        error: error.message
      };
    }
  }

  async toggleAvailability(id) {
    try {
      const product = await ProductModel.getById(id);
      if (!product) {
        return {
          success: false,
          data: null,
          message: 'Producto no encontrado'
        };
      }

      const updatedProduct = await ProductModel.update(id, {
        available: !product.available
      });

      return {
        success: true,
        data: updatedProduct,
        message: `Producto ${updatedProduct.available ? 'activado' : 'desactivado'}`
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error al cambiar disponibilidad',
        error: error.message
      };
    }
  }

  formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
  }
}

export default new ProductController();