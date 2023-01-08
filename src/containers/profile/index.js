import Profile from "../../components/profile";
import "./index.scss";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { PathAction } from "../../redux/reducers/globalPath";

const OwnProfileDetailsPage = () => {
  const appContext = useContext(AppContext);
  const { setShowAdd, setShowFooter } = appContext
  
  const path=window.location.pathname;
  const dispatch=useDispatch();
  dispatch(PathAction.handlePath({payload:path}))


  useEffect(() => {
    setShowAdd(true)
    setShowFooter(true)
  }, [])
  return (
    <div className="page profile">
      <div className="bg" />
      <Profile />
    </div>
  );
};

export default OwnProfileDetailsPage;
