import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import resourceReducer from './slices/resourceSlice';
import volunteerReducer from './slices/volunteerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    volunteers: volunteerReducer,
    resources: resourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
