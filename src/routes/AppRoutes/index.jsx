import React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../../constants/appConstants";

import AuthGuardRoute from "../AuthGuard";
import UnAuthGuardRoute from "../UnAuthGuard";
import UnAuthContainer from "../UnAuthContainer";
import AuthContainer from "../AuthContainer";

import Onboarding from "../../containers/onboarding";
import PitchesPage from "../../containers/pitch/index";
import PitchPage from "../../containers/pitch/pitch-page";
import SearchPage from "../../containers/search";
import AdminDashboard from "../../containers/admin";
import AllEvents from '../../containers/all-events';
import EventsCreate from "../../containers/events-create";
import FindEvent from "../../containers/find-event";
import FindAllEvents from "../../containers/find-all-events";
import SingleEvent from "../../containers/single-event"
import EditEvent from "../../containers/edit-event-admin";
import UpdateEvent from "../../containers/update-event";
import DeleteEvent from "../../containers/delete-event";
import EventRegistration from "../../containers/event-registration";
import RegistrationSuccessful from "../../containers/event-registration/registrationSuccessful";
import RegistrationWelcome from "../../containers/event-registration/registrationWelcome";
import DealsPage from "../../containers/deals";
import AboutUs from "../../containers/aboutus";
import Jobs from "../../containers/jobs";
import OwnProfileDetailsPage from "../../containers/profile/index";
import ActivateUserPage from "../../containers/activateuser";
import SuggestionsPage from "../../containers/suggestions/SuggestionsPage";
import UserCount from "../../containers/user-count";
import ReferralPage from "../../containers/referral";
import NotificationPage from "../../containers/notification";
import EditProfile from "../../containers/editProfile";
import LandingPage from "../../containers/landingPage";

import ArticlePage from "../../components/news/articles";
import SignIn from "../../components/signin-signup/signin/signin.component";
import SignUp from "../../components/signin-signup/signup/signup.component";
import NotFound from "../../components/notfound";
import ResetPassword from "../../components/signin-signup/fgt-pwd/resetpwd.component";
import ForgotPassword from "../../components/signin-signup/fgt-pwd/fgtpwd.component";
import PostedJob from "../../components/posted-job";
import PostJob from "../../components/post-job";
import EasyApply from "../../components/easy-apply";
import JobDescription from "../../components/job-description";
import MyJob from "../../components/my-job";
import SavedJob from "../../components/saved-job";
import Hashtags from "../../containers/hashtags";
import Privacy from "../../components/privacy/privacy";
import Verification from "../../components/signin-signup/verfication/verification";
import Rules from "../../components/rules/rules";
import Leaderboard from "../../components/leader-board/index";
import { useSelector } from "react-redux";

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
          path={"/invite/:uid/:key"}
          element={
            <UnAuthGuardRoute>
              <ReferralPage />
            </UnAuthGuardRoute>
          }
        />
        <Route
          path={"/users"}
          element={
            <UnAuthGuardRoute>
              <UserCount />
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
          path={"/hashtags"}
          element={
            <UnAuthGuardRoute>
              <Hashtags />
            </UnAuthGuardRoute>
          }
        />
        <Route
          path={"/privacy"}
          element={
            <UnAuthGuardRoute>
              <Privacy />
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
        <Route path={"/all-events"} element={
          <AuthGuardRoute>
            <AllEvents />
          </AuthGuardRoute>
        } />
        <Route path={"/events/:event_id"} element={
          <AuthGuardRoute>
            <SingleEvent />
          </AuthGuardRoute>
        } />
        <Route
          path={"/event-register/:event_id"}
          element={
            <AuthGuardRoute>
              <EventRegistration />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/registration-successful/:jersey_number"}
          element={
            <AuthGuardRoute>
              <RegistrationSuccessful />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/registration-welcome/:jersey_number"}
          element={
            <AuthGuardRoute>
              <RegistrationWelcome />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/admin"}
          element={
            <AuthGuardRoute>
              <AdminDashboard />
            </AuthGuardRoute>
          }
        >
          <Route
            path={"find-event/:id"}
            element={
              <AuthGuardRoute>
                <FindEvent />
              </AuthGuardRoute>
            }
          />
          <Route
            path={"find-all-events"}
            element={
              <AuthGuardRoute>
                <FindAllEvents />
              </AuthGuardRoute>
            }
          />
          <Route
            path={"create-event"}
            element={
              <AuthGuardRoute>
                <EventsCreate />
              </AuthGuardRoute>
            }
          />
           <Route
            path={"edit-event-admin/:id"}
            element={
              <AuthGuardRoute>
                <EditEvent />
              </AuthGuardRoute>
            }
          />
          <Route
            path={"update-event"}
            element={
              <AuthGuardRoute>
                <UpdateEvent />
              </AuthGuardRoute>
            }
          />
          <Route
            path={"delete-event"}
            element={
              <AuthGuardRoute>
                <DeleteEvent />
              </AuthGuardRoute>
            }
          />
        </Route>
        <Route
          path={"/deals"}
          element={
            <AuthGuardRoute>
              <DealsPage />
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
          path={"/news/:article_id"}
          element={
            <AuthGuardRoute>
              <ArticlePage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/notification"}
          element={
            <AuthGuardRoute>
           
              <NotificationPage />
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
          path={"/pitch"}
          element={
            <AuthGuardRoute>
              <PitchesPage />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/pitch/:pid"}
          element={
            <AuthGuardRoute>
              <PitchPage />
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
        <Route
          path={"/jobs"}
          element={
            <AuthGuardRoute>
              <Jobs />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/leader-board"}
          element={
            <AuthGuardRoute>
              < Leaderboard/>
            </AuthGuardRoute>
          }
        />

        <Route
          path={"/posted-job"}
          element={
            <AuthGuardRoute>
              <PostedJob />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/post-job"}
          element={
            <AuthGuardRoute>
              <PostJob />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/easy-apply/:id"}
          element={
            <AuthGuardRoute>
              <EasyApply />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/job-description/:id"}
          element={
            <AuthGuardRoute>
              <JobDescription />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/my-job"}
          element={
            <AuthGuardRoute>
              <MyJob />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/saved-job"}
          element={
            <AuthGuardRoute>
              <SavedJob />
            </AuthGuardRoute>
          }
        />
        <Route
          path={"/rules"}
          element={
            <AuthGuardRoute>
              <Rules />
            </AuthGuardRoute>
          }
        />

        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );

  const render = () => (
    <Routes>
      {/* <Route path={appRoutes.pitch} element={<AuthGuardRoute><Navigate to={appRoutes.pitch} replace /></AuthGuardRoute>} /> */}
      <Route path={appRoutes.any} element={<PublicRoutes />} />
    </Routes>
  );
  return render();
};

export default AppRoutes;
