import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  usersData: null,
  usersIsLoading: false,
  usersError: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersData: (state) => ({
      ...state,
      usersIsLoading: !initialState.usersIsLoading,
    }),
    setUsersData: (state, action) => ({
      ...initialState,
      ...state,
      usersData: action.payload || initialState.data,
      usersIsLoading: initialState.usersIsLoading,
    }),
    setUsersLoading: (state, action) => ({
      ...initialState,
      ...state,
      usersIsLoading: (typeof action.payload === 'undefined') ? initialState.usersIsLoading : action.payload,
    }),
    setUsersError: (state, action) => ({
      ...initialState,
      ...state,
      usersError: action.payload || initialState.usersError,
    }),
    resetUsers: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchUsersData, setUsersLoading, setUsersData, resetUsers, setUsersError,
} = usersSlice.actions

export default usersSlice.reducer
