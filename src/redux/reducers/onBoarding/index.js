import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  onBoardingData: null,
  onBoardingIsLoading: false,
  onBoardingError: null,
}

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {
    fetchOnBoardingData: (state) => ({
      ...state,
      onBoardingIsLoading: !initialState.onBoardingIsLoading,
    }),
    setOnBoardingData: (state, action) => ({
      ...initialState,
      ...state,
      onBoardingData: action.payload || initialState.data,
      onBoardingIsLoading: initialState.onBoardingIsLoading,
    }),
    setOnBoardingLoading: (state, action) => ({
      ...initialState,
      ...state,
      onBoardingIsLoading: (typeof action.payload === 'undefined') ? initialState.onBoardingIsLoading : action.payload,
    }),
    setOnBoardingError: (state, action) => ({
      ...initialState,
      ...state,
      onBoardingError: action.payload || initialState.onBoardingError,
    }),
    resetOnBoarding: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchOnBoardingData, setOnBoardingLoading, setOnBoardingData, resetOnBoarding, setOnBoardingError,
} = onBoardingSlice.actions

export default onBoardingSlice.reducer
