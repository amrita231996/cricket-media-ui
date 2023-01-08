// import Deals from "../../components/deals";
import EditProfilePage from "../../components/profile/edit-page";
import Header from "../../components/header";
// import Activities from "../../components/activities/activities";
// import Preferences from "../../components/preferences/preferences";
import "./index.scss";
import AppContext from "../../context/AppContext";
import { useContext, useEffect } from "react";

const EditProfile = () => {
  const appContext = useContext(AppContext);
  const { setShowAdd, setShowFooter } = appContext

  useEffect(() => {
      setShowAdd(true)
      setShowFooter(true)
  }, [])
  return (
    <div className="page profile">
      <EditProfilePage />
    </div>
  );
};

export default EditProfile;
