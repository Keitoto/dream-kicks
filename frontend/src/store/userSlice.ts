import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { UserInfo } from '@/types/UserInfo';

const initialState: UserInfo | null = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<UserInfo>) {
      state = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state));
    },
    signOut(state) {
      state = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo;
export const selectIsAdmin = (state: RootState) =>
  state.userInfo?.isAdmin === true;

export const userReducer = userSlice.reducer;
