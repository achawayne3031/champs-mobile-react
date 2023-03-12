import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import notifyReducer from '../features/notify/notifySlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
