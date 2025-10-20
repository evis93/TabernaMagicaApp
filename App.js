// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import ProductsScreen from './screens/ProductsScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#E87722" />
      <ProductsScreen />
    </>
  );
}
