import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  suggestionsData: null,
  suggestionsIsLoading: false,
  suggestionsError: null,
}

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    fetchSuggestionsData: (state) => ({
      ...state,
      suggestionsIsLoading: !initialState.suggestionsIsLoading,
    }),
    setSuggestionsData: (state, action) => ({
      ...initialState,
      ...state,
      suggestionsData: action.payload || initialState.data,
      suggestionsIsLoading: initialState.suggestionsIsLoading,
    }),
    setSuggestionsLoading: (state, action) => ({
      ...initialState,
      ...state,
      suggestionsIsLoading: (typeof action.payload === 'undefined') ? initialState.suggestionsIsLoading : action.payload,
    }),
    setSuggestionsError: (state, action) => ({
      ...initialState,
      ...state,
      suggestionsError: action.payload || initialState.suggestionsError,
    }),
    resetSuggestions: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchSuggestionsData, setSuggestionsLoading, setSuggestionsData, resetSuggestions, setSuggestionsError,
} = suggestionsSlice.actions

export default suggestionsSlice.reducer
