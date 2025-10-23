// screens/ProductsMenuTab.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../config/supabase';
import ProductController from '../controllers/ProductController';
import SyncService from '../services/SyncService';
import { productStyles as styles, colors } from '../styles/ProductStyles';

const ProductsMenuTab = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Bebidas',
    stock: '0',
    available: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log('🟢 ProductsMenuTab montado');
    loadProducts();
    loadCategories();
    checkConnection();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const checkConnection = async () => {
    const online = await SyncService.isOnline();
    setIsOnline(online);
  };

  const loadProducts = async () => {
    console.log('🔵 Cargando productos...');
    setLoading(true);
    try {
      const result = await ProductController.getAllProducts();
      console.log('📊 Resultado:', result);
      
      if (result.success) {
        console.log('✅ Productos:', result.data.length);
        setProducts(result.data);
      }
    } catch (error) {
      console.error('💥 Error:', error);
      Alert.alert('Error', 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const result = await ProductController.getCategories();
    if (result.success) {
      setCategories(result.data);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Bebidas',
      stock: '0',
      available: true,
    });
    setFormErrors({});
    setModalVisible(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price != null ? product.price.toString() : '',
      category: product.category || '',
      stock: product.stock != null ? product.stock.toString() : '0',
      available: product.available !== false,
    });
    setFormErrors({});
    setModalVisible(true);
  };

  const saveProduct = async () => {
    console.log('💾 Guardando producto...');
    setLoading(true);
    
    try {
      let result;
      if (editingProduct) {
        result = await ProductController.updateProduct(editingProduct.id, formData);
      } else {
        result = await ProductController.createProduct(formData);
      }

      if (result.success) {
        setModalVisible(false);
        await loadProducts();
        await loadCategories();
        Alert.alert('Éxito', result.message);
      } else {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('💥 Error:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    setLoading(true);
    const result = await ProductController.deleteProduct(productToDelete.id);
    
    setDeleteModalVisible(false);
    setProductToDelete(null);
    setLoading(false);

    if (result.success) {
      await loadProducts();
      await loadCategories();
      Alert.alert('Éxito', result.message);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const toggleAvailability = async (product) => {
    const result = await ProductController.toggleAvailability(product.id);
    if (result.success) {
      await loadProducts();
    }
  };

  const testConnection = async () => {
    Alert.alert('Testeando...', 'Verificando conexión...');
    
    try {
      const startTime = Date.now();
      const { data, error } = await supabase
        .from('tipo_producto')
        .select('count')
        .limit(1);
      
      const duration = Date.now() - startTime;
      
      if (error) {
        Alert.alert('Error ❌', `No conectado\n\n${error.message}`);
        setIsOnline(false);
      } else {
        Alert.alert('Éxito ✅', `Conectado\n\nTiempo: ${duration}ms`);
        setIsOnline(true);
      }
    } catch (err) {
      Alert.alert('Error de Red', err.message);
      setIsOnline(false);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          {item.description ? (
            <Text style={styles.productDescription} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
          {item._pending && (
            <Text style={styles.pendingBadge}>⏳ Pendiente de sincronizar</Text>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.availabilityBadge,
            item.available ? styles.availableBadge : styles.unavailableBadge
          ]}
          onPress={() => toggleAvailability(item)}
        >
          <Text style={[
            styles.availabilityText,
            { color: item.available ? colors.success : colors.error }
          ]}>
            {item.available ? 'Disponible' : 'No disponible'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productFooter}>
        <View>
          <Text style={styles.productPrice}>
            {ProductController.formatPrice(item.price)}
          </Text>
          <Text style={styles.productStock}>Stock: {item.stock}</Text>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => openEditModal(item)}
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => confirmDelete(item)}
          >
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📦</Text>
      <Text style={styles.emptyStateText}>No hay productos</Text>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery || selectedCategory !== 'Todos'
          ? 'Prueba con otros filtros'
          : 'Agrega tu primer producto'}
      </Text>
    </View>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={[styles.statusIndicator, { backgroundColor: isOnline ? '#10B981' : '#EF4444' }]}>
          <Text style={styles.statusText}>
            {isOnline ? '🌐 En línea' : '📴 Sin conexión'}
          </Text>
        </View>
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: 20 }]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: 'orange', marginRight: 8 }]}
            onPress={testConnection}
          >
            <Text style={styles.addButtonText}>📡</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openCreateModal}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Modal de Formulario */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nombre *</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    formErrors.name && styles.formInputError
                  ]}
                  placeholder="Ej: Cerveza Artesanal IPA"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                {formErrors.name && (
                  <Text style={styles.formError}>{formErrors.name}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Descripción</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputMultiline]}
                  placeholder="Descripción del producto..."
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.formRow}>
                <View style={styles.formColumn}>
                  <Text style={styles.formLabel}>Precio *</Text>
                  <TextInput
                    style={[
                      styles.formInput,
                      formErrors.price && styles.formInputError
                    ]}
                    placeholder="0.00"
                    value={formData.price}
                    onChangeText={(text) => setFormData({ ...formData, price: text })}
                    keyboardType="decimal-pad"
                  />
                  {formErrors.price && (
                    <Text style={styles.formError}>{formErrors.price}</Text>
                  )}
                </View>

                <View style={styles.formColumn}>
                  <Text style={styles.formLabel}>Stock</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="0"
                    value={formData.stock}
                    onChangeText={(text) => setFormData({ ...formData, stock: text })}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Categoría</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Ej: Bebidas, Comidas, Postres..."
                  value={formData.category}
                  onChangeText={(text) => setFormData({ ...formData, category: text })}
                />
              </View>

              <View style={styles.formGroup}>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>Producto disponible</Text>
                  <Switch
                    value={formData.available}
                    onValueChange={(value) => setFormData({ ...formData, available: value })}
                    trackColor={{ false: colors.lightGray, true: colors.success }}
                    thumbColor={formData.available ? colors.white : colors.white}
                  />
                </View>
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                  disabled={loading}
                >
                  <Text style={[styles.formButtonText, styles.cancelButtonText]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton, loading && styles.saveButtonDisabled]}
                  onPress={saveProduct}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={[styles.formButtonText, styles.saveButtonText]}>
                      {editingProduct ? 'Actualizar' : 'Crear'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Confirmación */}
      <Modal
        visible={deleteModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalTitle}>¿Eliminar producto?</Text>
            <Text style={styles.deleteModalText}>
              ¿Estás seguro de que deseas eliminar "{productToDelete?.name}"?
              Esta acción no se puede deshacer.
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
                disabled={loading}
              >
                <Text style={[styles.formButtonText, styles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: colors.error }]}
                onPress={deleteProduct}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={[styles.formButtonText, styles.saveButtonText]}>
                    Eliminar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductsMenuTab;