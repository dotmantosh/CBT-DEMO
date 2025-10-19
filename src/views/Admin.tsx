import React from 'react';
import LoginForm from '../components/admin/LoginForm';
import Dashboard from '../components/admin/Dashboard';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Admin: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.admin.isLoggedIn);
  

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <LoginForm />
  );
};

export default Admin;
