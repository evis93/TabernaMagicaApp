// models/ProductModel.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@taverna_products';

class ProductModel {
  constructor() {
    this.products = [];
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async loadProducts() {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      this.products = jsonValue != null ? JSON.parse(jsonValue) : [];
      return this.products;
    } catch (e) {
      console.error('Error loading products:', e);
      return [];
    }
  }

  async saveProducts() {
    try {
      const jsonValue = JSON.stringify(this.products);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('Error saving products:', e);
      return false;
    }
  }

  async getAll() {
    return await this.loadProducts();
  }

  async getById(id) {
    await this.loadProducts();
    return this.products.find(product => product.id === id);
  }

  async create(productData) {
    await this.loadProducts();
    
    const newProduct = {
      id: this.generateId(),
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price),
      category: productData.category || 'General',
      stock: parseInt(productData.stock) || 0,
      available: productData.available !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async update(id, productData) {
    await this.loadProducts();
    
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products[index] = {
      ...this.products[index],
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      updatedAt: new Date().toISOString(),
    };

    await this.saveProducts();
    return this.products[index];
  }

  async delete(id) {
    await this.loadProducts();
    
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    
    if (this.products.length === initialLength) {
      throw new Error('Producto no encontrado');
    }

    await this.saveProducts();
    return true;
  }

  async search(query) {
    await this.loadProducts();
    
    if (!query) return this.products;

    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  }

  async filterByCategory(category) {
    await this.loadProducts();
    
    if (!category || category === 'Todos') return this.products;
    
    return this.products.filter(product => product.category === category);
  }

  async getCategories() {
    await this.loadProducts();
    
    const categories = ['Todos', ...new Set(this.products.map(p => p.category))];
    return categories;
  }

  async clearAll() {
    this.products = [];
    await this.saveProducts();
    return true;
  }
}

export default new ProductModel();