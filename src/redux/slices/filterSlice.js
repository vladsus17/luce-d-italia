import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'popular ↑',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
