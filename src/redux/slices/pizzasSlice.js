import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async ({category, sortType, currentPage, searchValue}) => {
      const res = await axios.get(`https://66938633c6be000fa07bdc44.mockapi.io/items?page=${currentPage}&limit=4&${
          category === "All" ? '' : `category=${category}`
          }&sortBy=${sortType.sort.replace('-', '')}&order=${sortType.sort.includes('-') ? 'desc' : 'asc'}&search=${searchValue ? searchValue : ''}`)
      return res.data
    },
  )

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error';
        state.items = [];
    })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer