import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  years: [1900, 2025],
};

const releaseYearsSlice = createSlice({
  name: 'years',
  initialState,
  reducers: {
    setYears: (state, action) => {
      state.years = action.payload;
    },
  },
});

export const { setYears } = releaseYearsSlice.actions;
export default releaseYearsSlice.reducer;