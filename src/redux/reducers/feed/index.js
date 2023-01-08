import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  FeedData: null,
  FeedIsLoading: false,
  FeedError: null,
}

export const FeedSlice = createSlice({
  name: 'Feed',
  initialState,
  reducers: {
    fetchFeedData: (state) => ({
      ...state,
      FeedIsLoading: !initialState.FeedIsLoading,
    }),
    setFeedData: (state, action) => ({
      ...initialState,
      ...state,
      FeedData: action.payload || initialState.data,
      FeedIsLoading: initialState.FeedIsLoading,
    }),
    setFeedLoading: (state, action) => ({
      ...initialState,
      ...state,
      FeedIsLoading: (typeof action.payload === 'undefined') ? initialState.FeedIsLoading : action.payload,
    }),
    setFeedError: (state, action) => ({
      ...initialState,
      ...state,
      FeedError: action.payload || initialState.FeedError,
    }),
    resetFeed: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchFeedData, setFeedLoading, setFeedData, resetFeed, setFeedError,
} = FeedSlice.actions

export default FeedSlice.reducer
