import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Subject } from '../interfaces';

const initialState: Subject[] = [
  {
    id: 'english1',
    name: 'English',
    description: 'English Language subject',
    teacherId: 'teacher1',
    createdAt: new Date().toISOString(),
  },
];

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    addSubject(state, action: PayloadAction<Subject>) {
      state.push(action.payload);
    },
    updateSubject(state, action: PayloadAction<Subject>) {
      const idx = state.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    removeSubject(state, action: PayloadAction<string>) {
      return state.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSubject, updateSubject, removeSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
