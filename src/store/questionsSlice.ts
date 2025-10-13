import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Question } from '../interfaces';

const initialState: Question[] = [
  {
    id: 'q1',
    subjectId: 'english1',
    teacherId: 'teacher1',
    text: 'What is the synonym of "happy"?',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    answer: 'Joyful',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'q2',
    subjectId: 'english1',
    teacherId: 'teacher1',
    text: 'Which is a noun?',
    options: ['Run', 'Apple', 'Quickly', 'Blue'],
    answer: 'Apple',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'q3',
    subjectId: 'english1',
    teacherId: 'teacher1',
    text: 'Choose the correct spelling:',
    options: ['Recieve', 'Receive', 'Recive', 'Receeve'],
    answer: 'Receive',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'q4',
    subjectId: 'english1',
    teacherId: 'teacher1',
    text: 'Which word is an adjective?',
    options: ['Beautiful', 'Run', 'Apple', 'Quickly'],
    answer: 'Beautiful',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'q5',
    subjectId: 'english1',
    teacherId: 'teacher1',
    text: 'What is the antonym of "cold"?',
    options: ['Hot', 'Cool', 'Warm', 'Freeze'],
    answer: 'Hot',
    createdAt: new Date().toISOString(),
  },
];

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      state.push(action.payload);
    },
    updateQuestion(state, action: PayloadAction<Question>) {
      const idx = state.findIndex(q => q.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    removeQuestion(state, action: PayloadAction<string>) {
      return state.filter(q => q.id !== action.payload);
    },
  },
});

export const { addQuestion, updateQuestion, removeQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
