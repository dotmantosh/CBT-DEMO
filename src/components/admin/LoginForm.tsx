import React from 'react';

const LoginForm: React.FC<{ onSubmit: (e: React.FormEvent) => void }> = ({ onSubmit }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
          <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;