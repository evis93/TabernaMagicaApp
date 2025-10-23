// services/SyncService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';

const CACHE_KEYS = {
  PRODUCTS: '@products_cache',
  CATEGORIES: '@categories_cache',
  PENDING_OPERATIONS: '@pending_operations',
  LAST_SYNC: '@last_sync_time',
};

class SyncService {
  
  // ========== CACHE MANAGEMENT ==========
  
  async saveToCache(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('💾 Guardado en caché:', key);
      return true;
    } catch (error) {
      console.error('Error guardando en caché:', error);
      return false;
    }
  }

  async getFromCache(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        console.log('📂 Recuperado de caché:', key);
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error leyendo caché:', error);
      return null;
    }
  }

  async clearCache(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error limpiando caché:', error);
      return false;
    }
  }

  // ========== PENDING OPERATIONS ==========
  
  async addPendingOperation(operation) {
    try {
      const pending = await this.getFromCache(CACHE_KEYS.PENDING_OPERATIONS) || [];
      const newOperation = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...operation
      };
      pending.push(newOperation);
      await this.saveToCache(CACHE_KEYS.PENDING_OPERATIONS, pending);
      console.log('📝 Operación pendiente agregada:', operation.type);
      return true;
    } catch (error) {
      console.error('Error agregando operación pendiente:', error);
      return false;
    }
  }

  async getPendingOperations() {
    return await this.getFromCache(CACHE_KEYS.PENDING_OPERATIONS) || [];
  }

  async clearPendingOperations() {
    await this.saveToCache(CACHE_KEYS.PENDING_OPERATIONS, []);
  }

  async removePendingOperation(operationId) {
    try {
      const pending = await this.getPendingOperations();
      const filtered = pending.filter(op => op.id !== operationId);
      await this.saveToCache(CACHE_KEYS.PENDING_OPERATIONS, filtered);
      return true;
    } catch (error) {
      console.error('Error removiendo operación pendiente:', error);
      return false;
    }
  }

  // ========== NETWORK STATUS ==========
  
  async isOnline() {
    try {
      // Intenta hacer una consulta simple
      const { error } = await supabase
        .from('tipo_producto')
        .select('count')
        .limit(1);
      
      return !error;
    } catch (error) {
      return false;
    }
  }

  // ========== SYNC FUNCTIONS ==========
  
  async syncProducts() {
    console.log('🔄 Iniciando sincronización de productos...');
    
    const isOnline = await this.isOnline();
    
    if (!isOnline) {
      console.log('📴 Sin conexión, usando caché');
      return {
        success: true,
        fromCache: true,
        data: await this.getFromCache(CACHE_KEYS.PRODUCTS) || []
      };
    }

    try {
      // Primero sincronizar operaciones pendientes
      await this.syncPendingOperations();

      // Luego obtener datos actualizados
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
        .order('id_menu', { ascending: true });

      if (error) throw error;

      const products = data.map(item => ({
        id: item.id_menu.toString(),
        id_producto: item.productos.id_producto,
        name: item.productos.nombre,
        description: item.productos.descripcion || '',
        price: parseFloat(item.precio),
        category: item.productos.tipo_producto.descripcion,
        id_tipo: item.productos.tipo_producto.id_tipo,
        available: item.disponibilidad,
        stock: 0,
        createdAt: item.productos.created_at,
        updatedAt: item.updated_at,
      }));

      // Guardar en caché
      await this.saveToCache(CACHE_KEYS.PRODUCTS, products);
      await this.saveToCache(CACHE_KEYS.LAST_SYNC, new Date().toISOString());

      console.log('✅ Sincronización completada');

      return {
        success: true,
        fromCache: false,
        data: products
      };

    } catch (error) {
      console.error('Error en sincronización:', error);
      
      // Si falla, devolver caché
      const cachedData = await this.getFromCache(CACHE_KEYS.PRODUCTS) || [];
      return {
        success: true,
        fromCache: true,
        data: cachedData,
        error: error.message
      };
    }
  }

  async syncCategories() {
    const isOnline = await this.isOnline();
    
    if (!isOnline) {
      return await this.getFromCache(CACHE_KEYS.CATEGORIES) || ['Todos'];
    }

    try {
      const { data, error } = await supabase
        .from('tipo_producto')
        .select('id_tipo, descripcion')
        .order('descripcion', { ascending: true });

      if (error) throw error;

      const categories = ['Todos', ...data.map(t => t.descripcion)];
      await this.saveToCache(CACHE_KEYS.CATEGORIES, categories);

      return categories;
    } catch (error) {
      console.error('Error sincronizando categorías:', error);
      return await this.getFromCache(CACHE_KEYS.CATEGORIES) || ['Todos'];
    }
  }

  async syncPendingOperations() {
    const pending = await this.getPendingOperations();
    
    if (pending.length === 0) {
      console.log('✅ No hay operaciones pendientes');
      return;
    }

    console.log(`🔄 Sincronizando ${pending.length} operaciones pendientes...`);

    for (const operation of pending) {
      try {
        let success = false;

        switch (operation.type) {
          case 'create':
            success = await this.executePendingCreate(operation.data);
            break;
          case 'update':
            success = await this.executePendingUpdate(operation.id, operation.data);
            break;
          case 'delete':
            success = await this.executePendingDelete(operation.id);
            break;
          case 'toggle':
            success = await this.executePendingToggle(operation.id);
            break;
        }

        if (success) {
          await this.removePendingOperation(operation.id);
          console.log('✅ Operación sincronizada:', operation.type);
        }
      } catch (error) {
        console.error('Error sincronizando operación:', error);
      }
    }
  }

  async executePendingCreate(productData) {
    try {
      // Buscar o crear tipo de producto
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

      // Crear producto
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

      // Crear entrada en menu
      const { error: errorMenu } = await supabase
        .from('menu')
        .insert({
          id_producto: producto.id_producto,
          precio: parseFloat(productData.price),
          disponibilidad: productData.available !== false,
        });

      if (errorMenu) throw errorMenu;

      return true;
    } catch (error) {
      console.error('Error ejecutando create pendiente:', error);
      return false;
    }
  }

  async executePendingUpdate(id_menu, productData) {
    try {
      // Obtener producto actual
      const { data: menu } = await supabase
        .from('menu')
        .select('id_producto')
        .eq('id_menu', id_menu)
        .single();

      if (!menu) return false;

      // Actualizar producto
      const { error: errorProducto } = await supabase
        .from('productos')
        .update({
          nombre: productData.name,
          descripcion: productData.description || '',
        })
        .eq('id_producto', menu.id_producto);

      if (errorProducto) throw errorProducto;

      // Actualizar menu
      const { error: errorMenu } = await supabase
        .from('menu')
        .update({
          precio: parseFloat(productData.price),
          disponibilidad: productData.available,
        })
        .eq('id_menu', id_menu);

      if (errorMenu) throw errorMenu;

      return true;
    } catch (error) {
      console.error('Error ejecutando update pendiente:', error);
      return false;
    }
  }

  async executePendingDelete(id_menu) {
    try {
      const { error } = await supabase
        .from('menu')
        .delete()
        .eq('id_menu', id_menu);

      return !error;
    } catch (error) {
      console.error('Error ejecutando delete pendiente:', error);
      return false;
    }
  }

  async executePendingToggle(id_menu) {
    try {
      const { data: menu } = await supabase
        .from('menu')
        .select('disponibilidad')
        .eq('id_menu', id_menu)
        .single();

      if (!menu) return false;

      const { error } = await supabase
        .from('menu')
        .update({ disponibilidad: !menu.disponibilidad })
        .eq('id_menu', id_menu);

      return !error;
    } catch (error) {
      console.error('Error ejecutando toggle pendiente:', error);
      return false;
    }
  }

  // ========== UTILITIES ==========
  
  async getLastSyncTime() {
    return await this.getFromCache(CACHE_KEYS.LAST_SYNC);
  }

  async clearAllCache() {
    await this.clearCache(CACHE_KEYS.PRODUCTS);
    await this.clearCache(CACHE_KEYS.CATEGORIES);
    await this.clearCache(CACHE_KEYS.PENDING_OPERATIONS);
    await this.clearCache(CACHE_KEYS.LAST_SYNC);
    console.log('🗑️ Caché limpiado completamente');
  }
}

export default new SyncService();