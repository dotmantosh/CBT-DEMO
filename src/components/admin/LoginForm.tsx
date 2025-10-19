import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { updateAdmin } from "../../store/adminSlice";

const LoginForm: React.FC = () => {
  const [error, setError] = useState(false);
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements[0] as HTMLInputElement).value.trim();
    const password = (form.elements[1] as HTMLInputElement).value.trim();

    if (username === admin.username && password === admin.password) {
      dispatch(updateAdmin({ isLoggedIn: true }));
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 admin-login admin-container">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4 margin-bottom-10px">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6 margin-bottom-10px">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {error && (
            <small className="text-red-500 text-sm error">
              Username or Password Incorrect
            </small>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
