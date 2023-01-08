import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  ownPitchData: null,
  ownPitchIsLoading: false,
  ownPitchError: null,
}

export const ownPitchSlice = createSlice({
  name: 'ownPitch',
  initialState,
  reducers: {
    fetchOwnPitchData: (state) => ({
      ...state,
      ownPitchIsLoading: !initialState.ownPitchIsLoading,
    }),
    setOwnPitchData: (state, action) => ({
      ...initialState,
      ...state,
      ownPitchData: action.payload || initialState.data,
      ownPitchIsLoading: initialState.ownPitchIsLoading,
    }),
    setOwnPitchLoading: (state, action) => ({
      ...initialState,
      ...state,
      ownPitchIsLoading: (typeof action.payload === 'undefined') ? initialState.ownPitchIsLoading : action.payload,
    }),
    setOwnPitchError: (state, action) => ({
      ...initialState,
      ...state,
      ownPitchError: action.payload || initialState.ownPitchError,
    }),
    resetOwnPitch: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchOwnPitchData, setOwnPitchLoading, setOwnPitchData, resetOwnPitch, setOwnPitchError,
} = ownPitchSlice.actions

export default ownPitchSlice.reducer
