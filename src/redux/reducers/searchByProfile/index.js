import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  searchByProfileData: null,
  searchByProfileIsLoading: false,
  searchByProfileError: null,
}

export const searchByProfileSlice = createSlice({
  name: 'searchByProfile',
  initialState,
  reducers: {
    fetchSearchByProfileData: (state) => ({
      ...state,
      searchByProfileIsLoading: !initialState.searchByProfileIsLoading,
    }),
    setSearchByProfileData: (state, action) => ({
      ...initialState,
      ...state,
      searchByProfileData: action.payload || initialState.data,
      searchByProfileIsLoading: initialState.searchByProfileIsLoading,
    }),
    setSearchByProfileLoading: (state, action) => ({
      ...initialState,
      ...state,
      searchByProfileIsLoading: (typeof action.payload === 'undefined') ? initialState.searchByProfileIsLoading : action.payload,
    }),
    setSearchByProfileError: (state, action) => ({
      ...initialState,
      ...state,
      searchByProfileError: action.payload || initialState.searchByProfileError,
    }),
    resetSearchByProfile: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchSearchByProfileData, setSearchByProfileLoading, setSearchByProfileData, resetSearchByProfile, setSearchByProfileError,
} = searchByProfileSlice.actions

export default searchByProfileSlice.reducer
