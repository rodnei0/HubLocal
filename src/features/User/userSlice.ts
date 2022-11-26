import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import api, { UserData } from './userAPI'

export const signUp = createAsyncThunk(
  'users/sign-up',
  async (signUpData: UserData, thunkAPI) => {
    try {
      const response = await api.signUp(signUpData)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const signIn = createAsyncThunk(
  'users/sign-in',
  async (signUpData: UserData, thunkAPI) => {
    try {
      const response = await api.signIn(signUpData)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

interface UserInfo {
  email: string
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  token: string
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    message: '',
    token: ''
  },
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false
      state.message = ''

      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.email = action.payload as string
      })
      .addCase(signUp.pending, (state) => {
        state.isFetching = true
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.token = action.payload as string
      })
      .addCase(signIn.pending, (state) => {
        state.isFetching = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { clearState } = userSlice.actions

export const userSelector = (state: RootState): UserInfo => state.user

export default userSlice.reducer
