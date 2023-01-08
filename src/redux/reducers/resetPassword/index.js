import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  resetPasswordData: null,
  resetPasswordIsLoading: false,
  resetPasswordError: null,
}

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    fetchResetPasswordData: (state) => ({
      ...state,
      resetPasswordIsLoading: !initialState.resetPasswordIsLoading,
    }),
    setResetPasswordData: (state, action) => ({
      ...initialState,
      ...state,
      resetPasswordData: action.payload || initialState.data,
      resetPasswordIsLoading: initialState.resetPasswordIsLoading,
    }),
    setResetPasswordLoading: (state, action) => ({
      ...initialState,
      ...state,
      resetPasswordIsLoading: (typeof action.payload === 'undefined') ? initialState.resetPasswordIsLoading : action.payload,
    }),
    setResetPasswordError: (state, action) => ({
      ...initialState,
      ...state,
      resetPasswordError: action.payload || initialState.resetPasswordError,
    }),
    resetResetPassword: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchResetPasswordData, setResetPasswordLoading, setResetPasswordData, resetResetPassword, setResetPasswordError,
} = resetPasswordSlice.actions

export default resetPasswordSlice.reducer
