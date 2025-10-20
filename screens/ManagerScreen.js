// screens/ManagerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles/styles';
import ProductsMenuTab from './ProductsMenuTab'; // ← USA ESTE
import SalesTab from './Manager/SalesView';
const ManagerScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [activeTab, setActiveTab] = useState('menu');
  
  const [sales] = useState([
    { id: 1, table: 3, waiter: 'mozo1', total: 4500, timestamp: new Date().toISOString() },
    { id: 2, table: 7, waiter: 'mozo1', total: 3600, timestamp: new Date().toISOString() },
    { id: 3, table: 1, waiter: 'mozo2', total: 2800, timestamp: new Date().toISOString() },
  ]);

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerIcon}>👨‍🍳</Text>
          <View>
            <Text style={styles.headerTitleText}>Panel de Encargado</Text>
            <Text style={styles.headerSubtitle}>{user.username}</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>🚪 Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('menu')}
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
            📋 Menú
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setActiveTab('sales')}
          style={[styles.tab, activeTab === 'sales' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'sales' && styles.activeTabText]}>
            💰 Ventas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'menu' ? (
          <ProductsMenuTab />  
        ) : (
          <SalesTab sales={sales} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManagerScreen;