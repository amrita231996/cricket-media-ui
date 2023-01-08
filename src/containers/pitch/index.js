import { useContext, useState } from "react";

import Feeds from "../../components/feeds";
// import Footer from "../../components/footer";
import Footer from "../../components/footer/Footer.js";
import Header from "../../components/header";
import Suggestions from "../../components/suggestions";
import Events from "../../components/events";
import PostContext from "../../context/post";
import RegistrationBonus from "../../components/registration-bonus";
import "./index.scss";
import { Grid } from "@mui/material";
import SideBar from "../../assets/images/side-bar.png";
import { useMediaQuery } from "@mui/material";
import AppContext from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { PathAction } from "../../redux/reducers/globalPath";
import LeaderBoard from "../../components/leader-board";

const PitchesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isPitch, setIsPitch] = useState(true);
  const [pitchCreated, setPitchcreated] = useState(false);
  const [url, setURL] = useState("");
  const pitchURL = "/pitch";
  const path = window.location.pathname;
  const dispatch = useDispatch();
  dispatch(PathAction.handlePath({ payload: path }));

  const appContext = useContext(AppContext);
  const { setOnlyLogo } = appContext;
  setOnlyLogo(false);

  const handlePostClick = () => {
    // console.log(url);
    if (pitchURL === url) {
      setShowForm(!showForm);
    }
  };

  const handleCancelPost = () => {
    setShowForm(false);
  };

  const mobileView = useMediaQuery("(max-width:959px)");

  return (
    <PostContext.Provider
      value={{
        showForm,
        toggleShowForm: handleCancelPost,
      }}
    >
      <div className="page pitch">
        <main className="pitch-main">
          <Grid container spacing={mobileView ? 0 : 2}>
            <Grid
              item
              sm={12}
              md={3}
              lg={3}
              sx={{ display: `${mobileView ? "none" : ""}` }}
            >
              <img alt="" src={SideBar} style={{ width: "100%" }} />
              <LeaderBoard />
            </Grid>
            <Grid
              item
              sm={12}
              md={5}
              lg={6}
              sx={{ padding: `${mobileView ? "0" : ""}` }}
            >
              <Feeds pitchCreatedProps={pitchCreated} />
            </Grid>
            <Grid item sm={12} md={4} lg={3}>
              <Suggestions />
             
            </Grid>
          </Grid>
          <RegistrationBonus />
        </main>
        <Footer
          handlePostClick={handlePostClick}
          setURL={setURL}
          hprops={() => {
            setPitchcreated(!pitchCreated);
          }}
        />
      </div>
    </PostContext.Provider>
  );
};

export default PitchesPage;
