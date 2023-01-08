import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  ownFeedData: null,
  ownFeedIsLoading: false,
  ownFeedError: null,
}

export const ownFeedSlice = createSlice({
  name: 'ownFeed',
  initialState,
  reducers: {
    fetchOwnFeedData: (state) => ({
      ...state,
      ownFeedIsLoading: !initialState.ownFeedIsLoading,
    }),
    setOwnFeedData: (state, action) => ({
      ...initialState,
      ...state,
      ownFeedData: action.payload || initialState.data,
      ownFeedIsLoading: initialState.ownFeedIsLoading,
    }),
    setOwnFeedLoading: (state, action) => ({
      ...initialState,
      ...state,
      ownFeedIsLoading: (typeof action.payload === 'undefined') ? initialState.ownFeedIsLoading : action.payload,
    }),
    setOwnFeedError: (state, action) => ({
      ...initialState,
      ...state,
      ownFeedError: action.payload || initialState.ownFeedError,
    }),
    resetOwnFeed: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchOwnFeedData, setOwnFeedLoading, setOwnFeedData, resetOwnFeed, setOwnFeedError,
} = ownFeedSlice.actions

export default ownFeedSlice.reducer
