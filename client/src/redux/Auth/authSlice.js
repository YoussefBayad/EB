import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: 'youssef',
    profilePicture: 'hello',
    email: 'hello@hallo',
  },
  loading: false,
  error: null,
  message: {
    loading: false,
    content: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authChange(state, action) {
      return (state = action.payload);
    },
  },
});

export const { authChange } = authSlice.actions;

export default authSlice.reducer;
