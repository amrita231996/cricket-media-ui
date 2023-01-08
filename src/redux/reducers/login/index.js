import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loginData: null,
  loginIsLoading: false,
  loginError: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchLoginData: (state) => ({
      ...state,
      loginIsLoading: !initialState.loginIsLoading,
    }),
    setLoginData: (state, action) => ({
      ...initialState,
      ...state,
      loginData: action.payload || initialState.data,
      loginIsLoading: initialState.loginIsLoading,
    }),
    setLoginLoading: (state, action) => ({
      ...initialState,
      ...state,
      loginIsLoading: (typeof action.payload === 'undefined') ? initialState.loginIsLoading : action.payload,
    }),
    setLoginError: (state, action) => ({
      ...initialState,
      ...state,
      loginError: action.payload || initialState.loginError,
    }),
    resetLogin: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchLoginData, setLoginLoading, setLoginData, resetLogin, setLoginError,
} = loginSlice.actions

export default loginSlice.reducer
