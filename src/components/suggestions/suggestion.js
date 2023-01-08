import Button from "../../commons/form/button";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "../../assets/images/header/avatar.png";
import { Link } from "react-router-dom";

import "./index.scss";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

const Suggestion = (props) => {
  // const { profilePhoto, runs, followers, firstName, lastName, role, following_id } = props;
  const { profile } = props;
  const [showSugestionBox, setShowSuggestionBox] = useState(true);
  const [changeTextToFollowing, setchangeTextToFollowing] = useState(false);
  const profileUrl = "";
  const accessToken = getStorageItem("token");
  const [runs, setRuns] = useState();
  const [followings, setFollowings] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

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
          navigate('/login');
        }
      });
  };

  const handleFollow = () => {
    const follow = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/add-following-user/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: {
        followingUserId: profile._id,
      },
    };
    if (profile._id != null) {
      axios(follow)
        .then(() => setIsFollowing(true))
        .then(() => window.location.reload(false))
        .catch((error) => {
          if (error?.response?.status == 401) {
            clearStorage()
            navigate('/login');
          }
        });
    }
  };

  const checkFollower = () => {
    for (let i = 0; i < followings.length; i++) {
      if (profile._id == followings[i]._id) {
        setIsFollowing(true);
      }
    }
  };

  // Need to add total runs in user's object and remove this API. This API will run as many times as there are search results.

  useEffect(() => {
    fetchFollowing();
    checkFollower();
    const getTotalRun = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/feed/getTotalRun",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        id: profile._id,
      },
    };
    axios(getTotalRun)
      .then((response) => {
        setRuns(response.data);
      })
      .catch((error) => {
        if (error?.response?.status == 401) { 
          clearStorage()
          navigate('/login'); }
      });
  }, []);

  return (
    <div>
      {!isFollowing && (
        <div
          className={`suggestion ${showSugestionBox ? "visible" : "hidden"}`}
          style={{ maxWidth: "400px" }}
        >
          <div className="left-block">
            <Link to={profileUrl} style={{ textDecoration: "none" }}>
              <div className="profile-info">
                <img src={profile.profilePhoto} alt="" className="avatar" />
                <p className="name primary">
                  {profile.firstName + " " + profile.lastName}
                  <span className="role">{/* { role } */}</span>
                </p>
              </div>
            </Link>
            {!isFollowing && (
              <div className="button-block">
                <Button
                  label={changeTextToFollowing ? "Following" : "Follow"}
                  classes="follow"
                  onClick={() => handleFollow(profile._id)}
                />
              </div>
            )}
          </div>
          <div className="right-block">
            <div className="stats-block">
              <div className="stat">
                <div className="number followers">{/* {followers} */}</div>
                <p className="label primary">Followers</p>
              </div>
              <div className="stat">
                <div className="number runs">
                  {profile.totalRun ? profile.totalRun : runs}
                </div>
                <p className="label primary">Runs</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestion;
