import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import InviteModal from "../../commons/invitation";
import Followers from "../followers/followers";
import Friend from "../../assets/images/home/friend.svg";
// import ReferFriend from "../../assets/images/home/refer_friend.svg";
import Events from "../../components/events";
import ReferFriend from "../../assets/images/home/refer_friend.png";

import "./index.scss";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

const Suggestions = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [followings, setFollowings] = useState([]);

  const accessToken = getStorageItem("token");

  const url = global.config.ROOTURL.prod + "/auth/following-suggestion-users/";

  const getSuggestionsOptions = {
    method: "get",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const fetchFollowing = () => {
    const getFollowing = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/auth/get-following-user/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(getFollowing)
      .then((response) => {
        setFollowings(response.data ? response.data : []);
      })
      .catch((error) => {
        if (error?.response?.status == 401) { 
          clearStorage()
          navigate('/login'); }
      });
  };

  useEffect(() => {
    fetchFollowing();
    axios(getSuggestionsOptions)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        if (error?.response?.status == 400) {
        } else if (error?.response?.status == 401) {
          navigate("/login");
        }
      });
  }, []);

  const handleInviteModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="component suggestions">
      <InviteModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
      <Grid container spacing={1} sx={{ mt: 0 }}>
        <Grid xs={12}>
          <div className="invite" onClick={handleOpen} style={{cursor:"pointer"}}>
            <img src={ReferFriend} alt="" />
          </div>
         
        </Grid>
         <Grid>
           <Events />
         </Grid>
      </Grid>
      <div className="suggestions-panel">
        <div className="suggest-heading">
          <p>Suggested profiles to follow</p>
          {/* <div className="invite">
            <img src={Friend} alt="" />
            <button className="invite-button" onClick={handleInviteModal}>
              Invite your friends
            </button>
          </div> */}
        </div>
        <Grid container spacing={0} direction="column" item>
          {suggestions.map((suggestion, index) => (
            <Grid item xs={12} sm={12} lg={6} key={index}>
              <Followers
                key={suggestion._id}
                following={suggestion}
                followings={followings}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={12} lg={6}>
            <div className="view-more">
              <Link to={"/suggestions"} className=" view-more-text primary">
                View more
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Suggestions;
