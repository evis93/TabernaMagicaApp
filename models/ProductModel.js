// models/ProductModel_Supabase.js
// models/ProductModel.js
import { supabase } from '../config/supabase';
import SyncService from '../services/SyncService';

class ProductModel {
  
  // ==================== OBTENER PRODUCTOS ====================
  
  async getAll() {
    try {
      console.log('📡 ProductModel.getAll()');
      
      // Intentar sincronizar
      const result = await SyncService.syncProducts();
      
      return result.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      // Si falla todo, devolver caché
      return await SyncService.getFromCache('@products_cache') || [];
    }
  }

  // ==================== OBTENER POR ID ====================
  
  async getById(id_menu) {
    try {
      // Primero intentar de caché
      const cachedProducts = await SyncService.getFromCache('@products_cache');
      if (cachedProducts) {
        const product = cachedProducts.find(p => p.id === id_menu.toString());
        if (product) return product;
      }

      // Si no está en caché, buscar online
      const { data, error } = await supabase
        .from('menu')
        .select(`
          id_menu,
          precio,
          disponibilidad,
          updated_at,
          productos (
            id_producto,
            nombre,
            descripcion,
            created_at,
            tipo_producto (
              id_tipo,
              descripcion
            )
          )
        `)
        .eq('id_menu', id_menu)
        .single();

      if (error) throw error;

      return {
        id: data.id_menu.toString(),
        id_producto: data.productos.id_producto,
        name: data.productos.nombre,
        description: data.productos.descripcion || '',
        price: parseFloat(data.precio),
        category: data.productos.tipo_producto.descripcion,
        id_tipo: data.productos.tipo_producto.id_tipo,
        available: data.disponibilidad,
        stock: 0,
        createdAt: data.productos.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error al obtener producto:', error);
      return null;
    }
  }

  // ==================== CREAR PRODUCTO ====================
  
  async create(productData) {
    const isOnline = await SyncService.isOnline();

    if (!isOnline) {
      console.log('📴 Sin conexión, guardando operación pendiente');
      
      // Agregar a operaciones pendientes
      await SyncService.addPendingOperation({
        type: 'create',
        data: productData
      });

      // Crear producto temporal en caché
      const tempProduct = {
        id: 'temp_' + Date.now(),
        id_producto: null,
        name: productData.name,
        description: productData.description || '',
        price: parseFloat(productData.price),
        category: productData.category,
        id_tipo: productData.id_tipo,
        available: productData.available !== false,
        stock: parseInt(productData.stock) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _pending: true
      };

      // Agregar a caché
      const cachedProducts = await SyncService.getFromCache('@products_cache') || [];
      cachedProducts.push(tempProduct);
      await SyncService.saveToCache('@products_cache', cachedProducts);

      return tempProduct;
    }

    try {
      // Si hay conexión, crear normalmente
      let id_tipo = productData.id_tipo;
      
      if (!id_tipo) {
        const { data: tipo } = await supabase
          .from('tipo_producto')
          .select('id_tipo')
          .eq('descripcion', productData.category)
          .single();

        id_tipo = tipo?.id_tipo;

        if (!id_tipo) {
          const { data: newTipo } = await supabase
            .from('tipo_producto')
            .insert({ descripcion: productData.category })
            .select()
            .single();
          
          id_tipo = newTipo.id_tipo;
        }
      }

      const { data: producto, error: errorProducto } = await supabase
        .from('productos')
        .insert({
          nombre: productData.name,
          descripcion: productData.description || '',
          id_tipo_producto: id_tipo,
        })
        .select()
        .single();

      if (errorProducto) throw errorProducto;

      const { data: menu, error: errorMenu } = await supabase
        .from('menu')
        .insert({
          id_producto: producto.id_producto,
          precio: parseFloat(productData.price),
          disponibilidad: productData.available !== false,
        })
        .select()
        .single();

      if (errorMenu) throw errorMenu;

      return await this.getById(menu.id_menu);
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  // ==================== ACTUALIZAR PRODUCTO ====================
  
  async update(id_menu, productData) {
    const isOnline = await SyncService.isOnline();

    if (!isOnline) {
      console.log('📴 Sin conexión, guardando operación pendiente');
      
      await SyncService.addPendingOperation({
        type: 'update',
        id: id_menu,
        data: productData
      });

      // Actualizar en caché
      const cachedProducts = await SyncService.getFromCache('@products_cache') || [];
      const index = cachedProducts.findIndex(p => p.id === id_menu.toString());
      
      if (index !== -1) {
        cachedProducts[index] = {
          ...cachedProducts[index],
          ...productData,
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock) || 0,
          updatedAt: new Date().toISOString(),
          _pending: true
        };
        await SyncService.saveToCache('@products_cache', cachedProducts);
        return cachedProducts[index];
      }

      return null;
    }

    try {
      const currentProduct = await this.getById(id_menu);
      if (!currentProduct) {
        throw new Error('Producto no encontrado');
      }

      const id_producto = currentProduct.id_producto;

      let id_tipo = productData.id_tipo || currentProduct.id_tipo;
      if (productData.category && productData.category !== currentProduct.category) {
        const { data: tipo } = await supabase
          .from('tipo_producto')
          .select('id_tipo')
          .eq('descripcion', productData.category)
          .single();

        id_tipo = tipo?.id_tipo;

        if (!id_tipo) {
          const { data: newTipo } = await supabase
            .from('tipo_producto')
            .insert({ descripcion: productData.category })
            .select()
            .single();
          
          id_tipo = newTipo.id_tipo;
        }
      }

      const { error: errorProducto } = await supabase
        .from('productos')
        .update({
          nombre: productData.name,
          descripcion: productData.description || '',
          id_tipo_producto: id_tipo,
        })
        .eq('id_producto', id_producto);

      if (errorProducto) throw errorProducto;

      const { error: errorMenu } = await supabase
        .from('menu')
        .update({
          precio: parseFloat(productData.price),
          disponibilidad: productData.available,
        })
        .eq('id_menu', id_menu);

      if (errorMenu) throw errorMenu;

      return await this.getById(id_menu);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  // ==================== ELIMINAR PRODUCTO ====================
  
  async delete(id_menu) {
    const isOnline = await SyncService.isOnline();

    if (!isOnline) {
      console.log('📴 Sin conexión, guardando operación pendiente');
      
      await SyncService.addPendingOperation({
        type: 'delete',
        id: id_menu
      });

      // Eliminar de caché
      const cachedProducts = await SyncService.getFromCache('@products_cache') || [];
      const filtered = cachedProducts.filter(p => p.id !== id_menu.toString());
      await SyncService.saveToCache('@products_cache', filtered);

      return true;
    }

    try {
      const { error } = await supabase
        .from('menu')
        .delete()
        .eq('id_menu', id_menu);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }

  // ==================== CATEGORÍAS ====================
  
  async getCategories() {
    try {
      return await SyncService.syncCategories();
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return ['Todos'];
    }
  }

  async getCategoriesWithId() {
    const isOnline = await SyncService.isOnline();
    
    if (!isOnline) {
      return await SyncService.getFromCache('@categories_with_id_cache') || [];
    }

    try {
      const { data, error } = await supabase
        .from('tipo_producto')
        .select('id_tipo, descripcion')
        .order('descripcion', { ascending: true });

      if (error) throw error;

      await SyncService.saveToCache('@categories_with_id_cache', data);
      return data || [];
    } catch (error) {
      console.error('Error al obtener categorías con ID:', error);
      return await SyncService.getFromCache('@categories_with_id_cache') || [];
    }
  }
}

export default new ProductModel();