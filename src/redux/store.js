import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cart from './slices/cartSlice';
import products from './slices/productsSlice';

export const store = configureStore({
  reducer: { filter: filterReducer, cart, products },
});
