import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Teacher } from '../interfaces';

const initialState: Teacher[] = [
  {
    id: 'teacher1',
    subjectId: 'english1',
    title: 'Mrs',
    firstname: 'Grace',
    lastname: 'Johnson',
    isActive: true,
    email: 'grace.johnson@example.com',
  },
];

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    addTeacher(state, action: PayloadAction<Teacher>) {
      state.push(action.payload);
    },
    updateTeacher(state, action: PayloadAction<Teacher>) {
      const idx = state.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    removeTeacher(state, action: PayloadAction<string>) {
      return state.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTeacher, updateTeacher, removeTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;
