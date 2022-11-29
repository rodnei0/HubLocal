import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import api, { AddLocationData, LocationData } from './locationAPI'

export const addLocation = createAsyncThunk(
  'location/create',
  async (data: AddLocationData, thunkAPI) => {
    try {
      const response = await api.addLocation(data)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const getLocation = createAsyncThunk(
  'location/getLocation',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.getLocation(id)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const getLocations = createAsyncThunk(
  'location/getLocations',
  async (_, thunkAPI) => {
    try {
      const response = await api.getLocations()
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const deleteLocation = createAsyncThunk(
  'location/delete',
  async (id: number, thunkAPI) => {
    try {
      const response = await api.deleteLocation(id)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const updateLocation = createAsyncThunk(
  'location/update',
  async (data: AddLocationData, thunkAPI) => {
    try {
      const response = await api.updateLocation(data)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

interface LocationInfo {
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  locationData: LocationData
  locationList: LocationData[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const locationDataObject = {} as LocationData

const initialState: LocationInfo = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: '',
  locationData: locationDataObject,
  locationList: []
}

export const locationSlice = createSlice({
  name: 'location',
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
      .addCase(addLocation.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(addLocation.pending, (state) => {
        state.isFetching = true
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.locationList = action.payload as LocationData[]
      })
      .addCase(getLocations.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isFetching = true
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isFetching = false
        state.locationData = action.payload as LocationData
      })
      .addCase(getLocation.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(updateLocation.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { clearState } = locationSlice.actions

export const locationSelector = (state: RootState): LocationInfo => state.location

export default locationSlice.reducer
