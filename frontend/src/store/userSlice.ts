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
    signin(state, action: PayloadAction<UserInfo>) {
      state = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state));
    },
    signout(state) {
      state = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { signin } = userSlice.actions;
export const { signout } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo;

export const userReducer = userSlice.reducer;
