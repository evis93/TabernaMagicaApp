// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import AuthController from '../controllers/AuthController';
import { loginStyles as styles } from '../styles/LoginStyles';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-completar contraseña para pruebas
  const handleUsernameChange = (text) => {
    setUsername(text);
    const lowerText = text.toLowerCase();

    if (lowerText === 'mozo' || lowerText === 'encargado' || lowerText === 'enc') {
      setPassword('123');
    } else if (text === '') {
      setPassword('');
    }
  };

  const handleLogin = async () => {
    console.log('🔐 Intentando login...');
    setLoading(true);

    try {
      const result = await AuthController.login(username, password);
      
      if (result.success) {
        onLogin(result.data);
      } else {
        Alert.alert('Error de Autenticación', result.message);
      }
    } catch (error) {
      console.error('💥 Exception en login:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.loginBox}>
        <View style={styles.logoContainer}>
          {/* OPCIÓN 1: Con require (si el archivo existe) */}
          {Platform.OS === 'web' ? (
            // En web, usar ruta directa
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ width: 120, height: 120, marginBottom: 15 }}
            />
          ) : (
            // En móvil, usar require
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          )}

          <Text style={styles.subtitle}>Sistema de Gestión</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            value={username}
            onChangeText={handleUsernameChange}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            onSubmitEditing={handleLogin}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <View style={styles.testUsers}>
          <Text style={styles.testTitle}>👤 Usuarios de prueba:</Text>
          <Text style={styles.testUser}>• enc / 123</Text>
          <Text style={styles.testUser}>• mozo / 123</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;