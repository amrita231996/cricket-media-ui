import React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../../constants/appConstants";

import AuthGuardRoute from "../AuthGuard";
import UnAuthGuardRoute from "../UnAuthGuard";
import UnAuthContainer from "../UnAuthContainer";
import AuthContainer from "../AuthContainer";

import Onboarding from "../../containers/onboarding";
import FeedesPage from "../../containers/feed/index";
import FeedPage from "../../containers/feed/feed-page";
import SearchPage from "../../containers/search";
import AdminDashboard from "../../containers/admin";
import AboutUs from "../../containers/aboutus";
import OwnProfileDetailsPage from "../../containers/profile/index";
import ActivateUserPage from "../../containers/activateuser";
import SuggestionsPage from "../../containers/suggestions/SuggestionsPage";
import EditProfile from "../../containers/editProfile";
import LandingPage from "../../containers/landingPage";

import SignIn from "../../components/signin-signup/signin/signin.component";
import SignUp from "../../components/signin-signup/signup/signup.component";
import NotFound from "../../components/notfound";
import ResetPassword from "../../components/signin-signup/fgt-pwd/resetpwd.component";
import ForgotPassword from "../../components/signin-signup/fgt-pwd/fgtpwd.component";
import Verification from "../../components/signin-signup/verfication/verification";

const AppRoutes = () => {

  

  const PublicRoutes = () => (
    <Routes>
      <Route path={appRoutes.home} element={<UnAuthContainer />}>
        <Route
          path={"/login"}
          element={
            <UnAuthGuardRoute>
              <SignIn />
            </UnAuthGuardRoute>
          }
        />
        <Route
          path={"/signup"}
          element={
            <UnAuthGuardRoute>
              <SignUp />
            </UnAuthGuardRoute>
          }
        />
        <Route
          path={"/reset-pwd"}
          element={
            <UnAuthGuardRoute>
              <ResetPassword />
            </UnAuthGuardRoute>
          }
        />
        
    
        <Route
          path={`${appRoutes.passwordReset}/:uid`}
          element={
            <UnAuthGuardRoute>
              <ForgotPassword />
            </UnAuthGuardRoute>
          }
        />
        <Route
          path={"/"}
          exact
          element={
            <UnAuthGuardRoute>
              <LandingPage />
            </UnAuthGuardRoute>
          }
        />

        <Route
          path={"/verification"}
          element={
            <UnAuthGuardRoute>
              <Verification />
            </UnAuthGuardRoute>
          }
        />
      </Route>
      <Route path={appRoutes.any} element={<AuthenticatedRoutes />} />
    </Routes>
  );

  const AuthenticatedRoutes = () => (
    <Routes>
      <Route path={appRoutes.home} element={<AuthContainer />}>
  
        <Route
          path={"/admin"}
          element={
            <AuthGuardRoute>
              <AdminDashboard />
            </AuthGuardRoute>
          }
        />
      
        <Route
          path={"/my-profile"}
          element={
            <AuthGuardRoute>
              
              <OwnProfileDetailsPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/my-profile/edit"}
          element={
            <AuthGuardRoute>
              <EditProfile />
            </AuthGuardRoute>
          }
        />
     

        <Route
          path={"/onboarding"}
          element={
            <AuthGuardRoute>
              <Onboarding />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/feed"}
          element={
            <AuthGuardRoute>
              <FeedesPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/feed/:pid"}
          element={
            <AuthGuardRoute>
              <FeedPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/profile/:uid"}
          element={
            <AuthGuardRoute>
              <OwnProfileDetailsPage />
            </AuthGuardRoute>
          }
        />
    <Route
          path={"/search"}
          element={
            <AuthGuardRoute>
              <SearchPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/suggestions"}
          element={
            <AuthGuardRoute>
              <SuggestionsPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/verify/:uid"}
          element={
            <AuthGuardRoute>
              <ActivateUserPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/about-us"}
          element={
            <AuthGuardRoute>
              <AboutUs />
            </AuthGuardRoute>
          }
        />
      
      

    
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );

  const render = () => (
    <Routes>
      {/* <Route path={appRoutes.Feed} element={<AuthGuardRoute><Navigate to={appRoutes.Feed} replace /></AuthGuardRoute>} /> */}
      <Route path={appRoutes.any} element={<PublicRoutes />} />
    </Routes>
  );
  return render();
};

export default AppRoutes;
