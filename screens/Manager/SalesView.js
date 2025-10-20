// screens/Manager/SalesView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SalesTab = ({ sales }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas</Text>
      {sales.map((sale) => (
        <View key={sale.id} style={styles.saleCard}>
          <Text>Mesa: {sale.table}</Text>
          <Text>Mozo: {sale.waiter}</Text>
          <Text>Total: ${sale.total}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saleCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default SalesTab;