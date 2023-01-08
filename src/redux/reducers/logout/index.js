import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  logoutData: null,
  logoutIsLoading: false,
  logoutError: null,
}

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    fetchLogoutData: (state) => ({
      ...state,
      logoutIsLoading: !initialState.logoutIsLoading,
    }),
    setLogoutData: (state, action) => ({
      ...initialState,
      ...state,
      logoutData: action.payload || initialState.data,
      logoutIsLoading: initialState.logoutIsLoading,
    }),
    setLogoutLoading: (state, action) => ({
      ...initialState,
      ...state,
      logoutIsLoading: (typeof action.payload === 'undefined') ? initialState.logoutIsLoading : action.payload,
    }),
    setLogoutError: (state, action) => ({
      ...initialState,
      ...state,
      logoutError: action.payload || initialState.logoutError,
    }),
    resetLogout: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchLogoutData, setLogoutLoading, setLogoutData, resetLogout, setLogoutError,
} = logoutSlice.actions

export default logoutSlice.reducer
