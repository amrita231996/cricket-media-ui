import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  myProfileData: null,
  myProfileIsLoading: false,
  myProfileError: null,
}

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    fetchMyProfileData: (state) => ({
      ...state,
      myProfileIsLoading: !initialState.myProfileIsLoading,
    }),
    setMyProfileData: (state, action) => ({
      ...initialState,
      ...state,
      myProfileData: action.payload || initialState.data,
      myProfileIsLoading: initialState.myProfileIsLoading,
    }),
    setMyProfileLoading: (state, action) => ({
      ...initialState,
      ...state,
      myProfileIsLoading: (typeof action.payload === 'undefined') ? initialState.myProfileIsLoading : action.payload,
    }),
    setMyProfileError: (state, action) => ({
      ...initialState,
      ...state,
      myProfileError: action.payload || initialState.myProfileError,
    }),
    resetMyProfile: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchMyProfileData, setMyProfileLoading, setMyProfileData, resetMyProfile, setMyProfileError,
} = myProfileSlice.actions

export default myProfileSlice.reducer
