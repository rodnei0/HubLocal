import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import api, { UpdateTicketData, TicketData } from './ticketAPI'

export const getTicket = createAsyncThunk(
  'ticket/getTicket',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.getTicket(id)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const getTickets = createAsyncThunk(
  'ticket/getTickets',
  async (_, thunkAPI) => {
    try {
      const response = await api.getTickets()
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const updateTicket = createAsyncThunk(
  'ticket/update',
  async (data: UpdateTicketData, thunkAPI) => {
    try {
      const response = await api.updateTicket(data)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

interface TicketInfo {
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  ticketData: TicketData
  ticketList: TicketData[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ticketDataObject = {} as TicketData

const initialState: TicketInfo = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: '',
  ticketData: ticketDataObject,
  ticketList: []
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
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
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.ticketList = action.payload as TicketData[]
      })
      .addCase(getTickets.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isFetching = false
        state.ticketData = action.payload as TicketData
      })
      .addCase(getTicket.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(updateTicket.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { clearState } = ticketSlice.actions

export const ticketSelector = (state: RootState): TicketInfo => state.ticket

export default ticketSlice.reducer
