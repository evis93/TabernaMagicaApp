// screens/WaiterScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  FlatList,
  Modal,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import TableController from '../controllers/TableController';
import ProductController from '../controllers/ProductController';
import { waiterStyles as styles } from '../styles/WaiterStyles';

const WaiterScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('mesas');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tableCount, setTableCount] = useState(4);
  const [debugInfo, setDebugInfo] = useState('Iniciando...');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNoTablesWarning, setShowNoTablesWarning] = useState(false);
  const [expandedTables, setExpandedTables] = useState({});

  useEffect(() => {
    console.log('🚀 WaiterScreen montado, iniciando carga...');
    const init = async () => {
      setLoading(true);
      await loadTables();
      await loadProducts();
      setLoading(false);
    };
    init();
  }, []);

  const loadTables = async () => {
    const result = await TableController.getAllTables();
    if (result.success) {
      setTables(result.data);
    }

    const countResult = await TableController.getTableCount();
    if (countResult.success) {
      setTableCount(countResult.data);
    }
  };

  const loadProducts = async () => {
    console.log('🔵 Cargando productos para mozo...');
    setDebugInfo('Cargando productos...');

    try {
      const result = await ProductController.getAllProducts();
      console.log('📊 Result:', result);
      setDebugInfo(`Result success: ${result.success}, data: ${result.data?.length || 0}`);

      if (result.success) {
        console.log('✅ Productos cargados:', result.data.length);
        setDebugInfo(`✅ ${result.data.length} productos cargados`);
        // Mostrar TODOS los productos, sin filtrar por disponibilidad
        setProducts(result.data);
      } else {
        console.log('❌ Error cargando productos:', result.message);
        setDebugInfo(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error('💥 Exception:', error);
      setDebugInfo(`💥 Exception: ${error.message}`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: onLogout, style: 'destructive' },
      ]
    );
  };

  const handleTablePress = async (table) => {
    if (!table.isOpen) {
      Alert.alert(
        'Abrir Mesa',
        `¿Deseas abrir la Mesa ${table.tableNumber}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Abrir',
            onPress: async () => {
              const result = await TableController.openTable(table.tableNumber, user);
              if (result.success) {
                await loadTables();
                setSelectedTable(result.data);
              } else {
                Alert.alert('Error', result.message);
              }
            }
          }
        ]
      );
    } else {
      setSelectedTable(table);
    }
  };

  const handleAddTable = async () => {
    Alert.alert(
      'Agregar Mesa',
      '¿Deseas agregar una nueva mesa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Agregar',
          onPress: async () => {
            const result = await TableController.addNewTable();
            if (result.success) {
              await loadTables();
              Alert.alert('Éxito', result.message);
            }
          }
        }
      ]
    );
  };

  const handleAddProductToTable = async (product) => {
    if (!selectedTable || !selectedTable.isOpen) {
      Alert.alert('Error', 'Selecciona una mesa abierta primero');
      return;
    }

    setLoading(true);
    const result = await TableController.addProductToTable(
      selectedTable.tableNumber,
      product,
      1
    );
    setLoading(false);

    if (result.success) {
      setSelectedTable(result.data);
      await loadTables();
      setShowProductsModal(false);
      Alert.alert('Éxito', `${product.name} agregado a Mesa ${selectedTable.tableNumber}`);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleSelectTableForProduct = (product) => {
    console.log('🔍 handleSelectTableForProduct - Tables:', tables);
    console.log('🔍 Tables length:', tables.length);

    const openTables = tables.filter(t => t.isOpen);
    console.log('🔍 Open tables:', openTables);
    console.log('🔍 Open tables length:', openTables.length);

    // Si no hay mesas abiertas, mostrar mensaje
    if (openTables.length === 0) {
      console.log('⚠️ Mostrando alerta: No hay mesas abiertas');

      // Mostrar warning visual (funciona mejor en web)
      setShowNoTablesWarning(true);
      setTimeout(() => setShowNoTablesWarning(false), 4000);

      // También mostrar Alert (funciona en móvil)
      Alert.alert(
        'Sin mesas abiertas',
        'Debes abrir una mesa desde la pestaña "Mesas" antes de agregar productos.',
        [{ text: 'Entendido' }]
      );
      return;
    }

    // Si solo hay una mesa abierta, usarla directamente
    if (openTables.length === 1) {
      Alert.alert(
        'Agregar Producto',
        `¿Agregar ${product.name} a Mesa ${openTables[0].tableNumber}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Agregar',
            onPress: async () => {
              setSelectedTable(openTables[0]);
              const result = await TableController.addProductToTable(
                openTables[0].tableNumber,
                product,
                1
              );
              if (result.success) {
                setSelectedTable(result.data);
                await loadTables();
                Alert.alert('Éxito', result.message);
              }
            }
          }
        ]
      );
      return;
    }

    // Si hay varias mesas abiertas, mostrar opciones
    const buttons = openTables.map(table => ({
      text: `Mesa ${table.tableNumber} (${table.products.length} productos)`,
      onPress: async () => {
        setSelectedTable(table);
        const result = await TableController.addProductToTable(
          table.tableNumber,
          product,
          1
        );
        if (result.success) {
          setSelectedTable(result.data);
          await loadTables();
          Alert.alert('Éxito', result.message);
        }
      }
    }));
    buttons.push({ text: 'Cancelar', style: 'cancel' });

    Alert.alert('Seleccionar Mesa', `¿A qué mesa deseas agregar ${product.name}?`, buttons);
  };

  const toggleTableExpanded = (tableNumber) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableNumber]: !prev[tableNumber]
    }));
  };

  const handleCloseTableFromCard = async (table) => {
    Alert.alert(
      'Cerrar Mesa',
      `Total a cobrar: ${TableController.formatPrice(table.total)}\n\n¿Confirmar cierre de Mesa ${table.tableNumber}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar',
          onPress: async () => {
            const result = await TableController.closeTable(table.tableNumber);
            if (result.success) {
              Alert.alert('Éxito', result.message);
              setSelectedTable(null);
              await loadTables();
            } else {
              Alert.alert('Error', result.message);
            }
          }
        }
      ]
    );
  };

  const renderTableCard = ({ item }) => {
    const isOpen = item.isOpen;
    const isExpanded = expandedTables[item.tableNumber];

    return (
      <View
        style={[
          styles.tableCard,
          isOpen && styles.tableCardOpen,
          selectedTable?.tableNumber === item.tableNumber && styles.tableCardSelected
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            if (isOpen) {
              toggleTableExpanded(item.tableNumber);
            } else {
              handleTablePress(item);
            }
          }}
        >
          <View style={styles.tableHeader}>
            <Text style={styles.tableNumber}>Mesa {item.tableNumber}</Text>
            <View style={[
              styles.tableStatus,
              isOpen ? styles.tableStatusOpen : styles.tableStatusClosed
            ]}>
              <Text style={styles.tableStatusText}>
                {isOpen ? 'Abierta' : 'Disponible'}
              </Text>
            </View>
          </View>

          {isOpen && (
            <View style={styles.tableInfo}>
              <Text style={styles.tableInfoText}>
                {item.products.length} producto{item.products.length !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.tableTotal}>
                {TableController.formatPrice(item.total)}
              </Text>
            </View>
          )}

          {isOpen && item.products.length > 0 && (
            <Text style={styles.expandIndicator}>
              {isExpanded ? '▼ Ver menos' : '▶ Ver productos'}
            </Text>
          )}
        </TouchableOpacity>

        {isOpen && isExpanded && item.products.length > 0 && (
          <View style={styles.expandedProductsList}>
            {item.products.map((product, index) => (
              <View key={`${product.id}-${index}`} style={styles.expandedProductItem}>
                <View style={styles.expandedProductInfo}>
                  <Text style={styles.expandedProductName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.expandedProductQuantity}>
                    x{product.quantity}
                  </Text>
                  <Text style={styles.expandedProductPrice}>
                    {ProductController.formatPrice(product.price * product.quantity)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.expandedRemoveButton}
                  onPress={async () => {
                    const result = await TableController.removeProductFromTable(
                      item.tableNumber,
                      product.id
                    );
                    if (result.success) {
                      await loadTables();
                      if (selectedTable?.tableNumber === item.tableNumber) {
                        setSelectedTable(result.data);
                      }
                    }
                  }}
                >
                  <Text style={styles.expandedRemoveButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Totales y botón cerrar mesa */}
            <View style={styles.tableCardFooter}>
              <View style={styles.tableCardTotalRow}>
                <Text style={styles.tableCardTotalLabel}>Subtotal:</Text>
                <Text style={styles.tableCardTotalValue}>
                  {TableController.formatPrice(item.subtotal)}
                </Text>
              </View>
              <View style={styles.tableCardTotalRow}>
                <Text style={styles.tableCardTotalLabel}>Servicio (10%):</Text>
                <Text style={styles.tableCardTotalValue}>
                  {TableController.formatPrice(item.service)}
                </Text>
              </View>
              <View style={[styles.tableCardTotalRow, styles.tableCardTotalRowFinal]}>
                <Text style={styles.tableCardTotalLabelFinal}>Total:</Text>
                <Text style={styles.tableCardTotalValueFinal}>
                  {TableController.formatPrice(item.total)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeTableButtonInCard}
                onPress={() => handleCloseTableFromCard(item)}
              >
                <Text style={styles.closeTableButtonInCardText}>Cerrar Mesa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleSelectTableForProduct(item)}
      disabled={loading}
    >
      <View style={styles.productItemInfo}>
        <Text style={styles.productItemName}>{item.name}</Text>
        <Text style={styles.productItemPrice}>
          {ProductController.formatPrice(item.price)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addToTableButton}
        onPress={() => handleSelectTableForProduct(item)}
        disabled={loading}
      >
        <Text style={styles.addToTableButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderMenuView = () => {
    // Filtrar productos por búsqueda
    const filteredProducts = products.filter(product => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query)
      );
    });

    return (
      <View style={{ flex: 1 }}>
        {/* Warning de sin mesas */}
        {showNoTablesWarning && (
          <View style={{ backgroundColor: '#FEE2E2', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EF4444' }}>
            <Text style={{ color: '#991B1B', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
              ⚠️ Sin mesas abiertas
            </Text>
            <Text style={{ color: '#7F1D1D', fontSize: 13, textAlign: 'center', marginTop: 5 }}>
              Abre una mesa desde la pestaña "Mesas" antes de agregar productos
            </Text>
          </View>
        )}

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading && products.length === 0 ? (
          <View style={styles.emptyState}>
            <ActivityIndicator size="large" color="#8B5CF6" />
            <Text style={styles.emptyStateText}>Cargando productos...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No se encontraron productos' : 'No hay productos'}
            </Text>
            {searchQuery && (
              <TouchableOpacity
                style={{ marginTop: 20, padding: 10, backgroundColor: '#8B5CF6', borderRadius: 8 }}
                onPress={() => setSearchQuery('')}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Limpiar búsqueda</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>
                Menú ({filteredProducts.length}{searchQuery ? ` de ${products.length}` : ''})
              </Text>
              {selectedTable?.isOpen && (
                <Text style={styles.selectedTableBadge}>
                  Mesa {selectedTable.tableNumber} seleccionada
                </Text>
              )}
            </View>
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.productsList}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerSubtitle}>
              Mozo: {user?.name || user?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mesas' && styles.tabActive]}
          onPress={() => setActiveTab('mesas')}
        >
          <Text style={[styles.tabText, activeTab === 'mesas' && styles.tabTextActive]}>
            🪑 Mesas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.tabActive]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}>
            📋 Menú
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'mesas' ? (
          <View style={{ flex: 1 }}>
            <View style={styles.mesasHeader}>
              <Text style={styles.mesasTitle}>Mesas Disponibles</Text>
              <TouchableOpacity
                style={styles.addTableButton}
                onPress={handleAddTable}
              >
                <Text style={styles.addTableButtonText}>+ Mesa</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={tables}
              renderItem={renderTableCard}
              keyExtractor={(item) => item.tableNumber.toString()}
              contentContainerStyle={styles.tablesList}
            />
          </View>
        ) : (
          renderMenuView()
        )}
      </View>

      {/* Modal de Productos */}
      <Modal
        visible={showProductsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProductsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Producto</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowProductsModal(false)}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.productsList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WaiterScreen;
