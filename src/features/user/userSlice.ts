import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/domain';

export interface UserState {
  current: User | null;
}

const initialState: UserState = { current: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.current = action.payload;
    },
    clearCurrentUser(state) {
      state.current = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
