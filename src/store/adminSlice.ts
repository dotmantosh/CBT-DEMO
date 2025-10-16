import { createSlice } from '@reduxjs/toolkit';
import type { Admin } from '../interfaces';

const initialState: Admin = {
  id: 'admin123',
  username: 'admin',
  password: 'admin',
  role: 'admin',
  email: 'admin@example.com',
  isLoggedIn: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateAdmin(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateAdmin } = adminSlice.actions;
export default adminSlice.reducer;
