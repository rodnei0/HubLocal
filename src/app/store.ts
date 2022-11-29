import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import companySlice from '../features/Company/companySlice'
import locationSlice from '../features/Location/locationSlice'
import userSlice from '../features/User/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    company: companySlice,
    location: locationSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
