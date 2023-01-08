import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  forgotPasswordData: null,
  forgotPasswordIsLoading: false,
  forgotPasswordError: null,
}

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    fetchForgotPasswordData: (state) => ({
      ...state,
      forgotPasswordIsLoading: !initialState.forgotPasswordIsLoading,
    }),
    setForgotPasswordData: (state, action) => ({
      ...initialState,
      ...state,
      forgotPasswordData: action.payload || initialState.data,
      forgotPasswordIsLoading: initialState.forgotPasswordIsLoading,
    }),
    setForgotPasswordLoading: (state, action) => ({
      ...initialState,
      ...state,
      forgotPasswordIsLoading: (typeof action.payload === 'undefined') ? initialState.forgotPasswordIsLoading : action.payload,
    }),
    setForgotPasswordError: (state, action) => ({
      ...initialState,
      ...state,
      forgotPasswordError: action.payload || initialState.forgotPasswordError,
    }),
    resetForgotPassword: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchForgotPasswordData, setForgotPasswordLoading, setForgotPasswordData, resetForgotPassword, setForgotPasswordError,
} = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
