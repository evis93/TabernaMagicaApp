// screens/ManagerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import ProductsMenuTab from './ProductsMenuTab';
import { managerStyles as styles } from '../styles/ManagerStyles';

const ManagerScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('menu');

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
            <Text style={styles.headerTitle}>A Taberna Mágica</Text>
            <Text style={styles.headerSubtitle}>
              Bienvenido, {user?.name || user?.username}
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
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>💰</Text>
            <Text style={styles.comingSoonTitle}>Ventas</Text>
            <Text style={styles.comingSoonSubtitle}>Próximamente...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManagerScreen;