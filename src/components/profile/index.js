// import profileAvatar from "../../assets/images/header/Ellipse_73@2x.png";
// import editIcon from "../../assets/images/profile/edit_icon.svg";
import editIcon from "../../assets/images/icons/edit.svg";
import Followings from "../followers/followers";
import StateDropDown from "../state-dropdown/stateDropDown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  TextField,
  Input,
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  Grid,
  Paper,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import UploadBtn from "../upload-button/uploadBtn";
import validator from "validator";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "../loading-button/LoadingButton";
import { useRef } from "react";
import Posts from "../posts";
import useScroller from "../../commons/useScroller.js";
import { BallTriangle } from "react-loader-spinner";
import FollowerPanel from "./get-follower";
import FollowingPanel from "./get-following";
import BGImage from "../../assets/images/profile/bg.jpg";
import Run from "../posts/run";
import SubmenuInLine from "../submenu_inline/index";
import Post from "../posts/post";
import UserCard from "../followers/followers";
import ProfileList from "../../commons/components/ProfileList";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import ImageModal from "../../commons/components/image-modal";

const styleDesktop = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  py: 1,
  px: 4,
};

const styleMobile = {
  position: "absolute",
  width: "90%",
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  py: 1,
  px: 4,
  height: "100%",
  width: "100%",
};

const buttonMobile = {
  borderRadius: 2,
  width: "70%",
  height: "35px",
  // m: "2.5%",
  backgroundColor: "transparent",
  border: "1px solid",
  // mt: "18px",
  color: "white",
  display: "flex",
  alignItems: "flex-start",
  minWidth: "136px",
  // maxWidth: "100%"
};

const buttonDesktop = {
  borderRadius: 2,
  width: "70%",
  height: "35px",
  m: "2.5%",
  backgroundColor: "transparent",
  border: "1px solid",
  mt: "18px",
  color: "white",
  display: "flex",
  alignItems: "flex-start",
  minWidth: "136px",
  // maxWidth: "100%"
};

const Profile = (props) => {
  const [style, setStyle] = useState();
  const [profileRole, setProfileRole] = useState("");
  const [profileInitialData, setProfileInitialData] = useState({
    first_name: "",
    last_name: "",
    full_name: "",
    address: "",
    address2: "",
    zip_code: "",
    state: "",
    about_me: "",
    email: getStorageItem("user_email"),
    avatar: defaultAvatar,
    followersCount: 0,
    followingCount: 0,
    totalRun: 0,
  });
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const navigate = useNavigate();
  const accessToken = getStorageItem("token");
  let userId = null;
  let canEditProfile = true;
  const matches = useMediaQuery("(min-width:600px)");
  const mobile = useMediaQuery("(max-width: 460px)");
  const [profileInfo, setProfileInfo] = useState([]);
  const params = useParams();
  const uid = params.uid;
  const [ownProfile, setOwnProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonValue, setButtonValue] = useState("Loading..");
  const [ownFollowings, setOwnFollowings] = useState([]);
  const [buttonStyle, setButtonStyle] = useState({});
  const timer = useRef();
  const [followingPanel, setFollowingPanel] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState("mypost");
  const [nameSearchResults, setNameSearchResults] = useState([]);
  const subMenus = [
    { name: "My Post", key: "My Post".replaceAll(" ", "").toLowerCase() },
    { name: "Followers", key: "Followers".replaceAll(" ", "").toLowerCase() },
    { name: "Following", key: "Following".replaceAll(" ", "").toLowerCase() },
    { name: "About Me", key: "About Me".replaceAll(" ", "").toLowerCase() },
  ];
  const [toggleSubmenu, setToggleSubmenu] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false)};

  if (params.uid) {
    userId = uid;
    canEditProfile = false;
  } else {
    userId = getStorageItem("user_id");
  }

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pagePerSize, setPagePerSize] = useState(global.config.pagePerSize);
  const [url, setUrl] = useState(
    global.config.ROOTURL.prod +
    "/feed/feedByUserId/" +
    userId +
    "/" +
    pageNum +
    "/" +
    pagePerSize
  );


  const fetchOwnFollowing = () => {
    const getOwnFollowing = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/auth/get-following-user/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(getOwnFollowing)
      .then((response) => {
        setOwnFollowings(response.data ? response.data : []);
      })
      .then(() => checkFollower())
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  const fetchUserInfo = () => {
    const getUserInfo = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/profile/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: {
        userId: userId,
      },
    };
    axios(getUserInfo)
      .then((response) => {
        setProfileInitialData({
          first_name: response.data.firstName ? response.data.firstName : "",
          last_name: response.data.lastName ? response.data.lastName : "",
          full_name: response.data.firstName + " " + response.data.lastName,
          address: "",
          address2: "",
          zip_code: "",
          state: response.data.state ? response.data.state : "",
          about_me: response.data.aboutMe ? response.data.aboutMe : "",
          email: response.data.email ? response.data.email : "",
          avatar: response.data.profilePhoto ? response.data.profilePhoto : "",
          followingCount: response.data.followingCount
            ? response.data.followingCount
            : 0,
          followersCount: response.data.followersCount
            ? response.data.followersCount
            : 0,
          totalRun: response.data.totalRun ? response.data.totalRun : 0,
          FeedCount: response.data.FeedCount ? response.data.FeedCount : 0,
        });
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage()
          navigate('/login');
        }
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
        followingUserId: uid,
      },
    };

    if (uid != null) {
      axios(unfollow)
        .then(() => setIsFollowing(false))
        .then(() => {
          if (!loading) {
            timer.current = window.setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            clearStorage()
            navigate('/login');
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
        followingUserId: uid,
      },
    };

    if (uid != null) {
      axios(follow)
        .then(() => setIsFollowing(true))
        .then(() => {
          if (!loading) {
            timer.current = window.setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            clearStorage()
            navigate('/login');
          }
        });
    }
  };

  const checkFollower = () => {
    if (ownFollowings?.length > 0) {
      for (let i = 0; i < ownFollowings.length; i++) {
        if (uid == ownFollowings[i]?._id) {
          setIsFollowing(true);
        }
      }
    }
  };

  const handleSubmenuChange = (selectedMenu) => {
    setSelectedSubmenu(selectedMenu)
    setToggleSubmenu(selectedMenu);
    switch (selectedMenu) {
      case subMenus[0].key:
        break;
      case subMenus[1].key:
        break;
      case subMenus[2].key:
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    if (!matches) {
      setStyle(styleMobile);
      setButtonStyle(buttonMobile);
    } else {
      setStyle(styleDesktop);
      setButtonStyle(buttonDesktop);
    }
  }, [matches]);

  useEffect(() => {
    setToggleSubmenu(subMenus[0].key);
    fetchUserInfo();
    fetchOwnFollowing();
    if (uid === getStorageItem("user_id")) {
      setOwnProfile(true);
    }
    if (!uid) {
      setOwnProfile(true);
    }
  }, [uid]);

  useEffect(() => {
    // if (isFollowing) {
    //   setButtonValue("Unfollow");
    // } else if (!isFollowing) {
    //   setButtonValue("Follow");
    // }
    // fetchOwnFollowing();
  }, [isFollowing]);

  useEffect(() => {
    checkFollower();
  }, [ownFollowings])

  useEffect(() => {
    global.config.socketInstance.on('onTotalRunChange', async (updatedValue) => {
      try {
        console.log('updatedValue prfile',updatedValue);
        if (updatedValue.userId === userId) {
          setProfileInitialData((prev) => (
            {
              ...prev,
              totalRun: updatedValue.totalRun
            }
          ));
        }
      } catch (err) {
        // console.log('error on run change', err);
      }
    });
  }, []);

  // // console.log(toggleSubmenu)
  return (
    <>
      <Grid container className="profile_detail">
        <Grid item xs={12} sm={6} md={2} lg={2} className="avatar_container">
          <div
            style={{
              backgroundImage: `url(${profileInitialData.avatar
                ? profileInitialData.avatar
                : defaultAvatar
                })`, cursor: "pointer"
            }}
            alt=""
            className="profile_img"
            onClick={() => handleOpen()}
          >
            {canEditProfile && (
              <button
                className="btn edit-btn"
                onClick={() => {
                  navigate("/my-profile/edit");
                }}
              >
                <img src={editIcon} className="edit-icon" alt="" />
              </button>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={10} lg={10} className="profile_content_container">
          <Grid container>
            <Grid item xs={12} md={5} className="profile_name_container">
              <label className="profile_name">
                {profileInitialData.first_name +
                  " " +
                  profileInitialData.last_name}
              </label>
              <div className="follow_container">
                {!ownProfile && !isFollowing && (
                  <label
                    className="follow_btn"
                    onClick={() => {
                      handleFollow();
                    }}
                  >
                    {" "}
                    Follow
                  </label>
                )}
                {!ownProfile && isFollowing && (
                  <label
                    className="follow_btn"
                    onClick={() => {
                      handleUnfollow();
                    }}
                  >
                    {" "}
                    UnFollow
                  </label>

                )}
                <div className="total_run_mobile">
                  <Run run={profileInitialData.totalRun} />
                </div>
              </div>
            </Grid>
            <Grid item md={2} className="total_run">
              <div className="profile_run">
                <Run run={profileInitialData.totalRun} />
              </div>
            </Grid>
          </Grid>
          <Grid container className="profile_stats">
            <Grid item md={2}>
              <div className="profile_label" onClick={() => handleSubmenuChange("mypost")}>
                <div className="label_container">
                  <label className="profile_lable_text">Post</label>
                  <label className="profile_lable_number">
                    {profileInitialData.FeedCount}
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <div className="profile_label" onClick={() => handleSubmenuChange("followers")}>
                <label className="profile_lable_text">Followers</label>
                <label className="profile_lable_number">
                  {profileInitialData.followersCount}
                </label>
              </div>
            </Grid>
            <Grid item md={1}>
              <div className="profile_label" onClick={() => handleSubmenuChange("following")}>
                <label className="profile_lable_text">Following</label>
                <label className="profile_lable_number">
                  {profileInitialData.followingCount}
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: "10px" }}>
            <Grid item md={12} sx={{ borderTop: "1px solid #F1F1F5", pt: "10px", width: "100%" }}>
              <div className="profile_about_us">{profileInitialData.about_me}</div>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

      <Grid container className="profile_submenu" sx={{ pt: "20px" }}>
        <SubmenuInLine
          subMenus={subMenus}
          onSubmenuChange={handleSubmenuChange}
          selectedSubmenu={selectedSubmenu}
        />
      </Grid>

      <Grid container sx={{ pt: "20px" }}>
        {toggleSubmenu === subMenus[0].key && (
          <ProfileList userId={userId} page="profile" />
        )}
        {toggleSubmenu === subMenus[1].key && (
          <FollowerPanel uid={userId} ownFollowings={ownFollowings}
            onFolloUnFollowToggle={() => { fetchOwnFollowing(); }} />
        )}
        {toggleSubmenu === subMenus[2].key && (
          <FollowingPanel uid={userId} ownFollowings={ownFollowings}
            onFolloUnFollowToggle={() => { fetchOwnFollowing(); }} />
        )}
        {toggleSubmenu === subMenus[3].key && (
          <Grid item md={12} className="about_me">
            {profileInitialData.about_me}
          </Grid>
        )}
      </Grid>
      <ImageModal avatar={profileInitialData.avatar} open={open} handleClose={handleClose}/>
    </>
  );
};

export default Profile;
