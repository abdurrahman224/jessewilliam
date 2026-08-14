import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },

    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const { setIsMobileMenuOpen, toggleMobileMenu } = commonSlice.actions;
export default commonSlice.reducer;
