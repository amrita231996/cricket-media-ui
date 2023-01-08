import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  registrationData: null,
  registrationIsLoading: false,
  registrationError: null,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    fetchRegistrationData: (state) => ({
      ...state,
      registrationIsLoading: !initialState.registrationIsLoading,
    }),
    setRegistrationData: (state, action) => ({
      ...initialState,
      ...state,
      registrationData: action.payload || initialState.data,
      registrationIsLoading: initialState.registrationIsLoading,
    }),
    setRegistrationLoading: (state, action) => ({
      ...initialState,
      ...state,
      registrationIsLoading: (typeof action.payload === 'undefined') ? initialState.registrationIsLoading : action.payload,
    }),
    setRegistrationError: (state, action) => ({
      ...initialState,
      ...state,
      registrationError: action.payload || initialState.registrationError,
    }),
    resetRegistration: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchRegistrationData, setRegistrationLoading, setRegistrationData, resetRegistration, setRegistrationError,
} = registrationSlice.actions

export default registrationSlice.reducer
