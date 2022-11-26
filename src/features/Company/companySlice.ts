import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import api, { AddCompanyData, CompanyData } from './companyAPI'

export const addCompany = createAsyncThunk(
  'company/create',
  async (data: AddCompanyData, thunkAPI) => {
    try {
      const response = await api.addCompany(data)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (id: string, thunkAPI) => {
    try {
      const response = await api.getCompany(id)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async (_, thunkAPI) => {
    try {
      const response = await api.getCompanies()
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const deleteCompany = createAsyncThunk(
  'company/delete',
  async (id: number, thunkAPI) => {
    try {
      const response = await api.deleteCompany(id)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

export const updateCompany = createAsyncThunk(
  'company/update',
  async (data: AddCompanyData, thunkAPI) => {
    try {
      const response = await api.updateCompany(data)
      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  }
)

interface CompanyInfo {
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  companyData: CompanyData
  companyList: CompanyData[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const companyDataObject = {} as CompanyData

const initialState: CompanyInfo = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  message: '',
  companyData: companyDataObject,
  companyList: []
}

export const companySlice = createSlice({
  name: 'company',
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
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(addCompany.pending, (state) => {
        state.isFetching = true
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.companyList = action.payload as CompanyData[]
      })
      .addCase(getCompanies.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isFetching = true
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isFetching = false
        state.companyData = action.payload as CompanyData
      })
      .addCase(getCompany.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
      })
      .addCase(updateCompany.pending, (state) => {
        state.isFetching = true
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.message = action.payload as string
      })
  }
})

export const { clearState } = companySlice.actions

export const companySelector = (state: RootState): CompanyInfo => state.company

export default companySlice.reducer
