// App.js
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import ManagerScreen from './screens/ManagerScreen';
import WaiterScreen from './screens/WaiterScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('✅ Login exitoso:', userData);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('👋 Logout');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Diferenciar entre mozo y encargado
  if (currentUser?.role === 'waiter') {
    return <WaiterScreen user={currentUser} onLogout={handleLogout} />;
  }

  return <ManagerScreen user={currentUser} onLogout={handleLogout} />;
}
