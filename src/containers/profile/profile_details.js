import Deals from "../../components/deals";
import Profile from "../../components/profile";
import Header from "../../components/header";
import Activities from "../../components/activities/activities";
import Preferences from "../../components/preferences/preferences";

import "./index.scss";
import AppContext from "../../context/AppContext";
import { useContext, useEffect } from "react";

const ProfileDetailsPage = () => {
  const appContext = useContext(AppContext);
  const { setShowAdd, setShowFooter } = appContext

  useEffect(() => {
    setShowAdd(true)
    setShowFooter(true)
  }, [])

  return (
    <div className="page profile">
      <main className="profile-main-page">
        <Profile />
        <div className="side-panel">
          {/* <Activities /> */}
          {/* <Preferences /> */}
        </div>
      </main>
    </div>
  );
};

export default ProfileDetailsPage;
