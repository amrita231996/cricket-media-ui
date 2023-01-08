import { combineReducers } from 'redux'

import forgotPassword from './forgotPassword'
import login from './login'
import logout from './logout'
import myProfile from './myProfile'
import onBoarding from './onBoarding'
import ownFeed from './ownFeed'
import Feed from './feed'
import registration from './registration'
import resetPassword from './resetPassword'
import suggestions from './suggestions'
import userProfile from './userProfile'
import users from './users'
import followingUsers from './followingUsers'
import PathSlice from './globalPath'

const reducers = combineReducers({
  path:PathSlice.reducer,
  forgotPassword,
  login,
  logout,
  myProfile,
  onBoarding,
  ownFeed,
  Feed,
  registration,
  resetPassword,
  suggestions,
  userProfile,
  users,
  followingUsers,
})

export default reducers
