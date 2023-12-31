import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchLoggedInUserOrder,
  updateUser,
  fetchLoggedInUser
} from './userAPI'

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo: null
}
export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async userId => {
    const response = await fetchLoggedInUserOrder(userId)
    return response.data
  }
)
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async update => {
    const response = await updateUser(update)
    return response.data
  }
)
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async userId => {
    const response = await fetchLoggedInUser(userId)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userOrders = action.payload
      })
      .addCase(updateUserAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = action.payload
      })
      .addCase(fetchLoggedInUserAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userInfo = action.payload
      })
  }
})

export const selectUserOrders = state => state.user.userOrders
export const selectedUserInfo = state => state.user.userInfo
export const { increment } = userSlice.actions

export default userSlice.reducer
