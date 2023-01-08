import React from "react";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "react";
import LoadingButton from "../loading-button/LoadingButton";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import FollowersIcon from "../../assets/images/icons/followers.svg";
import RunsIcon from "../../assets/images/icons/ball-black.svg";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { successToast } from "../../commons/toast";
// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
const Followers = (props) => {
  const navigate = useNavigate();
  const accessToken = getStorageItem("token");
  const { following, onFolloUnFollowToggle } = props;
  const userId = getStorageItem("user_id");
  const userEmail = getStorageItem("user_email");
  const [isFollowing, setIsFollowing] = useState(false);
  const [ownPost, setOwnPost] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [givenRuns, setGivenRuns] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonValue, setButtonValue] = useState("Loading..");
  const timer = React.useRef();

  const buttonStyle = {
    background: "rgba(254, 204, 8, 0.2)",
    border: "1px solid #FECC08",
    borderRadius: "4px",
    color: "#00247B",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
  };

  const handleGiveRuns = (userId, runs) => {
    const giveRuns = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/given-runs/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: {
        userId: userId,
        givenRun: runs,
      },
    };
    axios(giveRuns)
      .then((data) => {
        console.log(data.data);
        successToast(data.data);
        setGivenRuns("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = () => {
    const unfollow = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/remove-following-user/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: {
        followingUserId: following._id,
      },
    };

    if (following._id != null) {
      axios(unfollow)
        .then(() => setIsFollowing(false))
        .then(() => {
          if (!loading) {
            timer.current = window.setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
          onFolloUnFollowToggle();
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            clearStorage();
            navigate("/login");
          }
        });
    }
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
        followingUserId: following._id,
      },
    };

    if (following._id != null) {
      axios(follow)
        .then(() => setIsFollowing(true))
        .then(() => {
          if (!loading) {
            timer.current = window.setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
          onFolloUnFollowToggle();
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            clearStorage();
            navigate("/login");
          }
        });
    }
  };

  const followings = props.followings ? props.followings : [];

  const checkFollower = () => {
    for (let i = 0; i < followings.length; i++) {
      if (following?._id == followings[i]?._id) {
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    if (following?._id == userId) {
      setOwnPost(true);
    }
    checkFollower();
  }, [isFollowing]);

  useEffect(() => {
    if (
      userEmail === "shreenath.pillai11@gmail.com" ||
      userEmail === "sameer.kanva11@gmail.com"||
      userEmail === "mitesh21jun@gmail.com"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (isFollowing) {
      setButtonValue("Unfollow");
    } else if (!isFollowing) {
      setButtonValue("Follow");
    }
  }, [isFollowing]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    checkFollower();
  }, [followings]);

  return (
    following && ( // <Grid item xs={12} sm={12} lg={4}>
      <div className="followers">
        <div>
          <div className="follower">
            <div className="profile-info-block">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link
                  to={`/profile/${following?._id}`}
                  className="show-pointer"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    window.location.href =
                      window.location.origin + `/profile/${following._id}`;
                  }}
                >
                  <div className="left-block">
                    <div className="profile-info">
                      <img
                        src={
                          following?.profilePhoto
                            ? following.profilePhoto
                            : defaultAvatar
                        }
                        alt={""}
                        className="avatar"
                        style={{ width: "45px", height: "45px" }}
                      />

                      <div className="name-block">
                        <p className="name primary">
                          {following?.firstName} {following?.lastName}
                          {/* <span className="role">{player_profile}</span> */}
                        </p>
                        <ul className="profile-stats-info">
                          <li className="stats-list-item">
                            <a>
                              <div className="profile-stats-row">
                                <img
                                  src={FollowersIcon}
                                  className="stats-icon-btn"
                                  alt=""
                                />
                                <div className="span-count">
                                  {following?.followersCount}
                                </div>
                              </div>
                            </a>
                          </li>
                          <li className="stats-list-item">
                            <a>
                              <div className="profile-stats-row">
                                <img
                                  src={RunsIcon}
                                  className="stats-icon-btn"
                                  alt=""
                                />
                                <div className="span-count">
                                  {following?.totalRun}
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
                {isAdmin && (
                  <div style={{ marginTop: "15px" }} className="span-count">
                    <input
                      value={givenRuns}
                      type={"number"}
                      min={0}
                      onChange={(e) => {
                        setGivenRuns(e.target.value);
                      }}
                      placeholder="Give runs"
                    />
                    <button
                      onClick={() => {
                        if (parseInt(givenRuns)) {
                          handleGiveRuns(following._id, givenRuns);
                        }
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Give Runs
                    </button>
                  </div>
                )}

                {/* <div className="right-block">
                <div className="stats-block">
                  <div className="stat followers-value">
                    <div className="number ">{following.followersCount}</div>
                    <p className="label primary">Followers</p>
                  </div>
                  <div className="stat runs">
                    <div className="number">{following.totalRun}</div>
                    <p className="label primary">Runs</p>
                  </div>
                </div>
              </div> */}
              </div>
              {!ownPost && (
                <div className="btn-block">
                  <LoadingButton
                    // type="submit"
                    // variant="outlined"
                    // className="btn follow"
                    // sx={{
                    //   borderRadius: 2,
                    //   width: "45%",
                    //   height: "35px",
                    //   m: "2.5%",
                    // }}
                    setSuccess={setSuccess}
                    setLoading={setLoading}
                    handleClick={isFollowing ? handleUnfollow : handleFollow}
                    buttonValue={buttonValue}
                    loading={loading}
                    success={success}
                    style={buttonStyle}
                  ></LoadingButton>
                </div>
              )}
            </div>
            {/* <div className="about-me-info">
            {following.aboutMe}
          </div> */}
          </div>
        </div>
      </div>
      // </Grid>
    )
  );
};

export default Followers;
