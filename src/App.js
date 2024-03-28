import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <div className="app">
      {!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <HomePage />}
    </div>
  );
}

export default App;
