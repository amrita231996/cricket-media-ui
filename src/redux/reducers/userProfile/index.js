import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  userProfileData: null,
  userProfileIsLoading: false,
  userProfileError: null,
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    fetchUserProfileData: (state) => ({
      ...state,
      userProfileIsLoading: !initialState.userProfileIsLoading,
    }),
    setUserProfileData: (state, action) => ({
      ...initialState,
      ...state,
      userProfileData: action.payload || initialState.data,
      userProfileIsLoading: initialState.userProfileIsLoading,
    }),
    setUserProfileLoading: (state, action) => ({
      ...initialState,
      ...state,
      userProfileIsLoading: (typeof action.payload === 'undefined') ? initialState.userProfileIsLoading : action.payload,
    }),
    setUserProfileError: (state, action) => ({
      ...initialState,
      ...state,
      userProfileError: action.payload || initialState.userProfileError,
    }),
    resetUserProfile: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchUserProfileData, setUserProfileLoading, setUserProfileData, resetUserProfile, setUserProfileError,
} = userProfileSlice.actions

export default userProfileSlice.reducer
