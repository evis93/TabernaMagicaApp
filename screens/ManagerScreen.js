// screens/ManagerScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ProductsMenuTab from './ProductsMenuTab';
import TableController from '../controllers/TableController';
import { managerStyles as styles } from '../styles/ManagerStyles';

const ManagerScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('menu');
  const [salesSummary, setSalesSummary] = useState(null);
  const [loadingSales, setLoadingSales] = useState(false);

  useEffect(() => {
    if (activeTab === 'ventas') {
      loadSalesSummary();
    }
  }, [activeTab]);

  const loadSalesSummary = async () => {
    setLoadingSales(true);
    const result = await TableController.getSalesSummary();
    if (result.success) {
      setSalesSummary(result.data);
    }
    setLoadingSales(false);
  };

  const handleClearSales = () => {
    Alert.alert(
      'Limpiar Historial',
      '¿Estás seguro de que deseas eliminar todo el historial de ventas? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await TableController.clearSalesHistory();
            if (result.success) {
              Alert.alert('Éxito', result.message);
              loadSalesSummary();
            } else {
              Alert.alert('Error', result.message);
            }
          }
        }
      ]
    );
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
              Encargado: {user?.name || user?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.tabActive]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}>
            📋 Menú
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ventas' && styles.tabActive]}
          onPress={() => setActiveTab('ventas')}
        >
          <Text style={[styles.tabText, activeTab === 'ventas' && styles.tabTextActive]}>
            💰 Ventas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'menu' ? (
          <ProductsMenuTab />
        ) : (
          <ScrollView style={styles.salesContainer}>
            {loadingSales ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text style={styles.loadingText}>Cargando ventas...</Text>
              </View>
            ) : !salesSummary || salesSummary.salesCount === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>💰</Text>
                <Text style={styles.emptyStateText}>No hay ventas registradas</Text>
                <Text style={styles.emptyStateSubtext}>
                  Las ventas aparecerán aquí cuando los mozos cierren mesas
                </Text>
              </View>
            ) : (
              <View style={styles.salesContent}>
                {/* Resumen General */}
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Resumen General</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total vendido:</Text>
                    <Text style={styles.summaryValueMain}>
                      {TableController.formatPrice(salesSummary.totalSalesWithoutCommission)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Comisión (10%):</Text>
                    <Text style={styles.summaryValueCommission}>
                      {TableController.formatPrice(salesSummary.totalCommission)}
                    </Text>
                  </View>
                </View>

                {/* Botón para limpiar historial */}
                <TouchableOpacity
                  style={styles.clearHistoryButton}
                  onPress={handleClearSales}
                >
                  <Text style={styles.clearHistoryButtonText}>🗑️ Limpiar Historial</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManagerScreen;