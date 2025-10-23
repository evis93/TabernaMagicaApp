// App.js
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import ManagerScreen from './screens/ManagerScreen';

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

  return <ManagerScreen user={currentUser} onLogout={handleLogout} />;
}
