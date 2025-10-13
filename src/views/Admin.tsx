import React, { useState } from 'react';
import LoginForm from '../components/admin/LoginForm';
import Dashboard from '../components/admin/Dashboard';

const Admin: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Temporary login handler for demo
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return loggedIn ? (
    <Dashboard />
  ) : (
    <LoginForm onSubmit={handleLogin} />
  );
};

export default Admin;
