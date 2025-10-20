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
} from 'react-native';
import ProductController from '../controllers/ProductController';
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
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const loadProducts = async () => {
    const result = await ProductController.getAllProducts();
    if (result.success) {
      setProducts(result.data);
    }
  };

  const loadCategories = async () => {
    const result = await ProductController.getCategories();
    if (result.success) {
      setCategories(result.data);
    }
  };

  const filterProducts = async () => {
    let filtered = [...products];

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
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
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      available: product.available,
    });
    setFormErrors({});
    setModalVisible(true);
  };

  const saveProduct = async () => {
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
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    const result = await ProductController.deleteProduct(productToDelete.id);
    
    setDeleteModalVisible(false);
    setProductToDelete(null);

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingTop: 20 }]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={openCreateModal}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={renderEmptyState}
      />

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
                    style={[
                      styles.formInput,
                      formErrors.stock && styles.formInputError
                    ]}
                    placeholder="0"
                    value={formData.stock}
                    onChangeText={(text) => setFormData({ ...formData, stock: text })}
                    keyboardType="number-pad"
                  />
                  {formErrors.stock && (
                    <Text style={styles.formError}>{formErrors.stock}</Text>
                  )}
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
                >
                  <Text style={[styles.formButtonText, styles.cancelButtonText]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={saveProduct}
                >
                  <Text style={[styles.formButtonText, styles.saveButtonText]}>
                    {editingProduct ? 'Actualizar' : 'Crear'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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
              >
                <Text style={[styles.formButtonText, styles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: colors.error }]}
                onPress={deleteProduct}
              >
                <Text style={[styles.formButtonText, styles.saveButtonText]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductsMenuTab;