import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/post/postSlice'
import userReducer from '../features/users/userSlice'
import notifyReducer from '../features/notify/notifySlice'

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    notify: notifyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
