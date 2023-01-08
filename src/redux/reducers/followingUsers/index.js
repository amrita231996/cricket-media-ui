import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  followingUsersData: [],
  followingUsersIsLoading: false,
  followingUsersError: null,
}

export const followingUsersSlice = createSlice({
  name: 'followingUsers',
  initialState,
  reducers: {
    fetchFollowingUsers: (state) => ({
      ...state,
      followingUsersIsLoading: !initialState.followingUsersIsLoading,
    }),
    setFollowingUsersData: (state, action) => ({
      ...initialState,
      ...state,
      followingUsersData: action.payload,
      followingUsersIsLoading: initialState.followingUsersIsLoading,
    }),
    setFollowingUsersLoading: (state, action) => ({
      ...initialState,
      ...state,
      followingUsersIsLoading: (typeof action.payload === 'undefined') ? initialState.followingUsersIsLoading : action.payload,
    }),
    setFollowingUsersError: (state, action) => ({
      ...initialState,
      ...state,
      followingUsersError: action.payload || initialState.followingUsersError,
    }),
    resetFollowingUsers: (state) => ({
      ...initialState,
    }),
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchFollowingUsers, setFollowingUsersLoading, setFollowingUsersData, resetFollowingUsers, setFollowingUsersError,
} = followingUsersSlice.actions

export default followingUsersSlice.reducer
