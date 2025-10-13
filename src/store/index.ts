import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import teachersReducer from './teachersSlice';
import subjectsReducer from './subjectsSlice';
import questionsReducer from './questionsSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    teachers: teachersReducer,
    subjects: subjectsReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
