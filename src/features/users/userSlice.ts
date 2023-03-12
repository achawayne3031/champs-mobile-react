import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getRequest,
  postRequest,
  deleteRequest,
  updateRequest,
  displayNotify,
} from './userApi'
import { UserData } from './model'
import { useAppSelector, useAppDispatch } from '../../app/hook'
import { notifyMsg } from '../notify/notifySlice'

interface UserState {
  user: {
    data: {
      data: []
      status: boolean
      success: boolean
      message: string
      debug: null
      token: null
    }
    loading: boolean
    error: boolean
    save: boolean
    saveState: boolean
  }
}

const initialState = {
  data: {
    data: [],
    status: 0,
    success: false,
    message: '',
    debug: null,
    token: null,
  },
  loading: false,
  error: false,
  saveState: false,
}

export const getAllUsers = createAsyncThunk('users/getAllusers', async () => {
  const response = await getRequest('/users')

  return response.data
})

export const AddNewUser = createAsyncThunk(
  'users/addNewUser',
  async (data: UserData) => {
    const response = await postRequest('/create', data)
    if (response != null) {
      displayNotify(`${response.data.message}`, response.data.success)
    }
    return response.data
  },
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (user: number) => {
    const response = await deleteRequest(`/users/${user}`)
    if (response.status) {
      displayNotify(`${response.data.message}`, response.data.success)
    }
    return response.data
  },
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: UserData) => {
    const response = await postRequest(`/users/${data.id}`, data)

    if (response != null) {
      displayNotify(`${response.data.message}`, response.data.success)
    }
    return response.data
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: () => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true
        state.saveState = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.saveState = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.saveState = false
      })

      ////////////// ADD USER CASE //////////
      .addCase(AddNewUser.pending, (state, action) => {
        state.loading = true
        state.saveState = false
      })
      .addCase(AddNewUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.saveState = true
      })
      .addCase(AddNewUser.rejected, (state, action) => {
        state.loading = false
        state.saveState = false
      })

      ////// Delete User /////////
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true
        state.saveState = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.saveState = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.saveState = false
      })

      ////// Update User /////////
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true
        state.saveState = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.saveState = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.saveState = false
      })
  },
})

export const { getUsers } = userSlice.actions

export const selectUser = (state: UserState) => state.user

export default userSlice.reducer
