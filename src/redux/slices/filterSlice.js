import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: "",
    category: "All",
    sortType: {
        name: 'popularity', 
        sort: 'rating'  
    },
    currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    },
    setSortType(state, action) {
      state.sortType = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.category = action.payload.category
      state.sortType = action.payload.sortType
    }
  },
})

export const { setSearchValue, setCategory, setSortType, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer