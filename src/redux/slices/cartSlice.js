import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    total: 0,
    items: []
}



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findPizza = state.items.find((obj) => obj.id === action.payload.id )
      if(findPizza) {
        findPizza.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
      })
      }
      state.total = state.items.reduce((currentSum, obj) => {
        return (obj.price * obj.count) + currentSum
      }, 0)
    },
    removePizza(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
        state.total = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearPizzas(state) {
        state.items = [];
        state.total = 0
    },
    plusPizza(state, action) {
      const findPizza = state.items.find((obj) => obj.id === action.payload )
      if(findPizza) {
        findPizza.count++
      }
      state.total = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    minusPizza(state, action) {
      const findPizza = state.items.find((obj) => obj.id === action.payload )
      if(findPizza) {
        findPizza.count--
      }
      state.total = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    }
  },
})

export const { addPizza, removePizza, clearPizzas, plusPizza, minusPizza } = cartSlice.actions

export default cartSlice.reducer