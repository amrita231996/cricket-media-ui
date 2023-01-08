import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  pitchData: null,
  pitchIsLoading: false,
  pitchError: null,
}

export const pitchSlice = createSlice({
  name: 'pitch',
  initialState,
  reducers: {
    fetchPitchData: (state) => ({
      ...state,
      pitchIsLoading: !initialState.pitchIsLoading,
    }),
    setPitchData: (state, action) => ({
      ...initialState,
      ...state,
      pitchData: action.payload || initialState.data,
      pitchIsLoading: initialState.pitchIsLoading,
    }),
    setPitchLoading: (state, action) => ({
      ...initialState,
      ...state,
      pitchIsLoading: (typeof action.payload === 'undefined') ? initialState.pitchIsLoading : action.payload,
    }),
    setPitchError: (state, action) => ({
      ...initialState,
      ...state,
      pitchError: action.payload || initialState.pitchError,
    }),
    resetPitch: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchPitchData, setPitchLoading, setPitchData, resetPitch, setPitchError,
} = pitchSlice.actions

export default pitchSlice.reducer
