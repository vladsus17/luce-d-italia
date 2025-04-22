/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('pizzas/fetchPizzas', async (params, thunkApi) => {
  const { currentPage, category, sortBy, order, search } = params;
  const { data } = await axios.get(
    `https://67b7308b2bddacfb270e0720.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'idle', // Puede ser 'idle', 'loading', 'succeeded', 'failed'
};

const productsSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
        state.items = [];
      });
  },
});

export const selectProductsData = (state) => state.pizzas;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 👇 Usa tus claves reales (para testing, en producción usá variables de entorno)
const AIRTABLE_API_KEY =
  'patAFJ7HpL2CJVydP.22ddbe6827b003f182b7854aeb4207278e6c7ec57042aa5d348dd32e931a1810';
const BASE_ID = 'app64Gflq9zpPDgwu';
const TABLE_NAME = 'Inventory Items'; // Usa el nombre exacto de tu tabla en Airtable

// 🧠 AsyncThunk para traer los productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  return response.data.records.map((record) => ({
    id: record.id,
    sku: record.fields['SKU'],
    description: record.fields['Description'],
    size: record.fields['Size'],
    color: record.fields['Color'],
    quantity: record.fields['Quantity'],
    salesTransaction: record.fields['Sales Transactions'],
    image: record.fields['Item Photo']?.[0]?.thumbnails?.large?.url || '',
  }));
});

// 🧱 Estado inicial
const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
};

// 🧩 Redux slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
        state.items = [];
      });
  },
});

// 🧪 Selector para acceder a productos desde componentes
export const selectProductsData = (state) => state.products;

export const { setItems } = productsSlice.actions;
export default productsSlice.reducer;
