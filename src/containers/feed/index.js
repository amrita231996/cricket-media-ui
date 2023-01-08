import { useContext, useState } from "react";

import Feeds from "../../components/feeds";
// import Footer from "../../components/footer";
import Footer from "../../components/footer/Footer.js";
import Suggestions from "../../components/suggestions";
import PostContext from "../../context/post";
import RegistrationBonus from "../../components/registration-bonus";
import "./index.scss";
import { Grid } from "@mui/material";
import SideBar from "../../assets/images/side-bar.png";
import { useMediaQuery } from "@mui/material";
import AppContext from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { PathAction } from "../../redux/reducers/globalPath";

const FeedesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isFeed, setIsFeed] = useState(true);
  const [FeedCreated, setFeedcreated] = useState(false);
  const [url, setURL] = useState("");
  const FeedURL = "/feed";
  const path = window.location.pathname;
  const dispatch = useDispatch();
  dispatch(PathAction.handlePath({ payload: path }));

  const appContext = useContext(AppContext);
  const { setOnlyLogo } = appContext;
  setOnlyLogo(false);

  const handlePostClick = () => {
    // console.log(url);
    if (FeedURL === url) {
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
      <div className="page Feed">
        <main className="Feed-main">
          <Grid container spacing={mobileView ? 0 : 2}>
            <Grid
              item
              sm={12}
              md={3}
              lg={3}
              sx={{ display: `${mobileView ? "none" : ""}` }}
            >
              <img alt="" src={SideBar} style={{ width: "100%" }} />
            </Grid>
            <Grid
              item
              sm={12}
              md={5}
              lg={6}
              sx={{ padding: `${mobileView ? "0" : ""}` }}
            >
              <Feeds FeedCreatedProps={FeedCreated} />
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
            setFeedcreated(!FeedCreated);
          }}
        />
      </div>
    </PostContext.Provider>
  );
};

export default FeedesPage;
