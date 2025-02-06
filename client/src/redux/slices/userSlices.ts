import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  username: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  _id: '',
  username: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
