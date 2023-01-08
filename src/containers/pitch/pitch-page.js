import { useContext, useEffect, useState } from "react";

import Feeds from "../../components/feeds";
// import Footer from "../../components/footer";
import Footer from "../../components/footer/Footer.js";
import Header from "../../components/header";
import Suggestions from "../../components/suggestions";
import PostContext from "../../context/post";
import RegistrationBonus from "../../components/registration-bonus";
import FeedPage from "../../components/posts/feedPage";
import "./index.scss";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const FeedesPage = () => {
  const params = useParams();
  const pid = params.pid;

  const [showForm, setShowForm] = useState(false);
  const [isFeed, setIsFeed] = useState(true);
  const [url, setURL] = useState("");
  const FeedURL = "/feed";

  const appContext = useContext(AppContext);
  const { setShowAdd, setShowFooter } = appContext

  useEffect(() => {
    setShowAdd(true)
    setShowFooter(true)
  }, [])

  const handlePostClick = () => {
    // console.log(url)
    if (FeedURL === url) {
      setShowForm(!showForm);
    }
  };

  const handleCancelPost = () => {
    setShowForm(false);
  };

  return (
    <PostContext.Provider
      value={{
        showForm,
        toggleShowForm: handleCancelPost,
      }}
    >
      <div className="page Feed">
        <RegistrationBonus />
        <main className="Feed-main">
          {pid && <FeedPage pid={pid} test={"Test"} />}
          <Suggestions />
        </main>
        {/* <Footer handlePostClick={handlePostClick} setURL={setURL}/> */}
      </div>
    </PostContext.Provider>
  );
};

export default FeedesPage;
