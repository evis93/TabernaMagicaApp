// controllers/TableController.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TABLES_STORAGE_KEY = '@tables';
const TABLE_COUNT_KEY = '@table_count';
const SALES_HISTORY_KEY = '@sales_history';

class TableController {
  constructor() {
    this.tables = [];
    this.tableCount = 4; // Número inicial de mesas
  }

  async initialize() {
    try {
      const tablesData = await AsyncStorage.getItem(TABLES_STORAGE_KEY);
      const tableCountData = await AsyncStorage.getItem(TABLE_COUNT_KEY);

      if (tablesData) {
        this.tables = JSON.parse(tablesData);
      } else {
        this.tables = [];
      }

      if (tableCountData) {
        this.tableCount = parseInt(tableCountData);
      }

      console.log('✅ TableController inicializado');
      return { success: true };
    } catch (error) {
      console.error('❌ Error inicializando TableController:', error);
      return { success: false, message: error.message };
    }
  }

  async saveTables() {
    try {
      await AsyncStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(this.tables));
      await AsyncStorage.setItem(TABLE_COUNT_KEY, this.tableCount.toString());
      return { success: true };
    } catch (error) {
      console.error('❌ Error guardando mesas:', error);
      return { success: false, message: error.message };
    }
  }

  async getTableCount() {
    await this.initialize();
    return {
      success: true,
      data: this.tableCount
    };
  }

  async addNewTable() {
    await this.initialize();
    this.tableCount++;
    await this.saveTables();
    return {
      success: true,
      message: `Mesa ${this.tableCount} agregada`,
      data: this.tableCount
    };
  }

  async getAllTables() {
    await this.initialize();

    // Retornar array con info de cada mesa
    const tablesInfo = [];
    for (let i = 1; i <= this.tableCount; i++) {
      const tableData = this.tables.find(t => t.tableNumber === i);
      if (tableData && tableData.isOpen) {
        tablesInfo.push(tableData);
      } else {
        tablesInfo.push({
          tableNumber: i,
          isOpen: false,
          products: [],
          subtotal: 0,
          service: 0,
          total: 0
        });
      }
    }

    return {
      success: true,
      data: tablesInfo
    };
  }

  async openTable(tableNumber, waiterInfo = null) {
    await this.initialize();

    const existingTableIndex = this.tables.findIndex(t => t.tableNumber === tableNumber);

    if (existingTableIndex !== -1 && this.tables[existingTableIndex].isOpen) {
      return {
        success: false,
        message: 'La mesa ya está abierta'
      };
    }

    const tableData = {
      tableNumber,
      isOpen: true,
      products: [],
      subtotal: 0,
      service: 0,
      total: 0,
      openedAt: new Date().toISOString(),
      waiter: waiterInfo ? {
        id: waiterInfo.id,
        username: waiterInfo.username
      } : null
    };

    if (existingTableIndex !== -1) {
      this.tables[existingTableIndex] = tableData;
    } else {
      this.tables.push(tableData);
    }

    await this.saveTables();

    return {
      success: true,
      message: `Mesa ${tableNumber} abierta`,
      data: tableData
    };
  }

  async addProductToTable(tableNumber, product, quantity = 1) {
    await this.initialize();

    const tableIndex = this.tables.findIndex(t => t.tableNumber === tableNumber && t.isOpen);

    if (tableIndex === -1) {
      return {
        success: false,
        message: 'La mesa no está abierta'
      };
    }

    const table = this.tables[tableIndex];

    // Verificar si el producto ya existe en la mesa
    const existingProductIndex = table.products.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      table.products[existingProductIndex].quantity += quantity;
    } else {
      table.products.push({
        ...product,
        quantity
      });
    }

    // Recalcular totales
    this.calculateTableTotal(table);

    await this.saveTables();

    return {
      success: true,
      message: `${product.name} agregado a mesa ${tableNumber}`,
      data: table
    };
  }

  async removeProductFromTable(tableNumber, productId) {
    await this.initialize();

    const tableIndex = this.tables.findIndex(t => t.tableNumber === tableNumber && t.isOpen);

    if (tableIndex === -1) {
      return {
        success: false,
        message: 'La mesa no está abierta'
      };
    }

    const table = this.tables[tableIndex];
    const productIndex = table.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return {
        success: false,
        message: 'Producto no encontrado en la mesa'
      };
    }

    // Si la cantidad es mayor a 1, decrementar, sino eliminar
    if (table.products[productIndex].quantity > 1) {
      table.products[productIndex].quantity--;
    } else {
      table.products.splice(productIndex, 1);
    }

    // Recalcular totales
    this.calculateTableTotal(table);

    await this.saveTables();

    return {
      success: true,
      message: 'Producto eliminado',
      data: table
    };
  }

  calculateTableTotal(table) {
    const subtotal = table.products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);

    const service = subtotal * 0.10; // 10% de servicio
    const total = subtotal + service;

    table.subtotal = subtotal;
    table.service = service;
    table.total = total;
  }

  async getTable(tableNumber) {
    await this.initialize();

    const table = this.tables.find(t => t.tableNumber === tableNumber);

    if (!table) {
      return {
        success: true,
        data: {
          tableNumber,
          isOpen: false,
          products: [],
          subtotal: 0,
          service: 0,
          total: 0
        }
      };
    }

    return {
      success: true,
      data: table
    };
  }

  async closeTable(tableNumber) {
    await this.initialize();

    const tableIndex = this.tables.findIndex(t => t.tableNumber === tableNumber && t.isOpen);

    if (tableIndex === -1) {
      return {
        success: false,
        message: 'La mesa no está abierta'
      };
    }

    const table = this.tables[tableIndex];

    // Guardar para historial
    const closedTable = {
      ...table,
      isOpen: false,
      closedAt: new Date().toISOString()
    };

    // Guardar en historial de ventas
    await this.saveSaleToHistory(closedTable);

    // Eliminar de las mesas activas
    this.tables.splice(tableIndex, 1);

    await this.saveTables();

    return {
      success: true,
      message: `Mesa ${tableNumber} cerrada. Total: $${table.total.toFixed(2)}`,
      data: closedTable
    };
  }

  async saveSaleToHistory(saleData) {
    try {
      const historyData = await AsyncStorage.getItem(SALES_HISTORY_KEY);
      let history = historyData ? JSON.parse(historyData) : [];

      history.push(saleData);

      await AsyncStorage.setItem(SALES_HISTORY_KEY, JSON.stringify(history));
      return { success: true };
    } catch (error) {
      console.error('❌ Error guardando venta en historial:', error);
      return { success: false, message: error.message };
    }
  }

  async getSalesHistory() {
    try {
      const historyData = await AsyncStorage.getItem(SALES_HISTORY_KEY);
      const history = historyData ? JSON.parse(historyData) : [];

      return {
        success: true,
        data: history
      };
    } catch (error) {
      console.error('❌ Error obteniendo historial de ventas:', error);
      return {
        success: false,
        data: [],
        message: error.message
      };
    }
  }

  async getSalesSummary() {
    try {
      const historyResult = await this.getSalesHistory();
      if (!historyResult.success) {
        return historyResult;
      }

      const history = historyResult.data;

      // Calcular totales por mozo
      const waiterSales = {};
      let totalSalesWithoutCommission = 0;

      history.forEach(sale => {
        const waiterUsername = sale.waiter?.username || 'Sin asignar';

        if (!waiterSales[waiterUsername]) {
          waiterSales[waiterUsername] = {
            username: waiterUsername,
            totalSales: 0,
            commission: 0,
            salesCount: 0
          };
        }

        waiterSales[waiterUsername].totalSales += sale.total;
        waiterSales[waiterUsername].commission += sale.service; // El service es el 10%
        waiterSales[waiterUsername].salesCount++;

        totalSalesWithoutCommission += sale.subtotal;
      });

      const totalCommission = totalSalesWithoutCommission * 0.10;

      return {
        success: true,
        data: {
          waiterSales: Object.values(waiterSales),
          totalSalesWithoutCommission,
          totalCommission,
          totalSales: totalSalesWithoutCommission + totalCommission,
          salesCount: history.length
        }
      };
    } catch (error) {
      console.error('❌ Error calculando resumen de ventas:', error);
      return {
        success: false,
        data: null,
        message: error.message
      };
    }
  }

  async clearSalesHistory() {
    try {
      await AsyncStorage.removeItem(SALES_HISTORY_KEY);
      return {
        success: true,
        message: 'Historial de ventas limpiado'
      };
    } catch (error) {
      console.error('❌ Error limpiando historial:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
  }
}

export default new TableController();
