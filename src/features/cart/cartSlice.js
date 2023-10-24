import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addToCart ,fetchItemsByUserId,updateCartItems,deleteCartItems,resetCart} from './cartAPI'

const initialState = {
  items: [],
  status: 'idle'
}
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item)
    return response.data
  }
)
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId)
    return response.data
  }
)
export const updateCartItemsAsync = createAsyncThunk(
  'cart/updateCartItems',
  async (update) => {
    const response = await updateCartItems(update)
    return response.data
  }
)
export const deleteCartItemsAsync = createAsyncThunk(
  'cart/deleteCartItems',
  async (itemId) => {
    const response = await deleteCartItems(itemId)
    return response.data
  }
)
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId)
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addToCartAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload;
      })
      .addCase(updateCartItemsAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        const index =state.items.findIndex((item)=> item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemsAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        const index =state.items.findIndex((item)=> item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      state.items = []
      })
  }
})

export const { increment} = counterSlice.actions

export const selectedItems = (state) => state.cart.items

export default counterSlice.reducer
