import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/header/logo.png";
import Plus from "../../assets/images/header/plus.svg";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import Notification from "./notification";
import { Tooltip } from "carbon-components-react";
import axios from "axios";
import SearchBar from "./searchBar";
import Runcard from "../posts/run";
import "./index.scss";
import { resetLogin } from "../../redux/reducers/login";
import { useDispatch } from "react-redux";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import MenuIcon from "@mui/icons-material/Menu";

const Header = (props) => {
  const { onlyLogo, showAdd } = props;
  const [userRuns, setUserRuns] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");

  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const handleSecondaryMenu = () => {
    !showSecondaryMenu
      ? setShowSecondaryMenu(true)
      : setShowSecondaryMenu(false);
  };

  const handleMyProfile = () => {
    navigate("/my-profile");
  };
  const handleAboutUs = () => {
    navigate("/about-us");
  };
  const handlePrivacy = () => {
    navigate("/privacy");
  };
  const handleRules = () => {
    navigate("/rules");
  };
  const handleLogout = () => {
    var logOutOptions = {
      method: "post",
      url: global.config.ROOTURL.prod + "/auth/logout/",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        id: userId,
      },
    };
    axios(logOutOptions)
      .then(() => {
        dispatch(resetLogin());
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const secondaryMenuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!secondaryMenuRef.current.contains(e.target)) {
        setShowSecondaryMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  const getRuns = () => {
    const getTotalRun = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/feed/getTotalRun",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(getTotalRun)
      .then((response) => {
        setUserRuns(response.data);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage();
          navigate("/login");
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
      .then((response) =>
        setUserInfo({
          firstName: response.data.firstName ? response.data.firstName : "",
          lastName: response.data.lastName ? response.data.lastName : "",
          avatar: response.data.profilePhoto
            ? response.data.profilePhoto
            : defaultAvatar,
        })
      )
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
    getRuns();
    global.config.socketInstance.on(
      "onTotalRunChange",
      async (updatedValue) => {
        try {
          console.log("updatedValue header", updatedValue);
          if (updatedValue.userId === userId) {
            setUserRuns(updatedValue.totalRun);
          }
        } catch (err) {
          // console.log('error on run change', err);
        }
      }
    );
  }, []);

  return (
    <header className="header">
      <div className="header-cnt">
        <div className="logo-block">
          <NavLink to="/feed">
            <img src={Logo} alt="CricketMedia" />
            <span className="label title-label">Cricket Media</span>
          </NavLink>
        </div>

        {!onlyLogo && (
          <div className="search-block">
            <SearchBar
              onSearchTextChange={(searchText) =>
                props.onSearchTextChange(searchText)
              }
            />
          </div>
        )}
       
        {showAdd && (
          <div className="desktop-only add-funds">
            <div className="add-button">
              <img src={Plus} alt="" />
            </div>
            <p className="money">0.00</p>
          </div>
        )}
        {!onlyLogo && (
          <div className="desktop-only nav-links">
            <NavLink
              to="/feed"
              className={`nav-link ${
                window.location.pathname.includes("/feed") ? "active" : ""
              }`}
            >
              Feed
            </NavLink>
            <NavLink
              to="/deals"
              className={`nav-link ${
                window.location.pathname.includes("/deals") ? "active" : ""
              }`}
            >
              Deals
            </NavLink>

            <NavLink
              to="/jobs"
              className={`nav-link ${
                window.location.pathname.includes("/jobs") ? "active" : ""
              }`}
            >
              Jobs
            </NavLink>
          </div>
        )}

        {!onlyLogo && (
          <div className="desktop-only profile-block">
            <Runcard run={userRuns} />
            <Notification />
            <div className="avatar">
              <img
                src={userInfo.avatar}
                alt=""
                style={{ width: "50px", height: "53px", borderRadius: 50 }}
              />
            </div>
            <div>
              <div className="primary">
                {/* {userInfo.firstName + " " + userInfo.lastName} */}
                <i className="arrow down"></i>
                <Tooltip direction="bottom" className="header-options">
                  <div className="caret"></div>
                  <div className="options">
                    <ul>
                      <li onClick={handleMyProfile}>My Profile</li>
                    </ul>
                    <ul>
                      <li onClick={handleAboutUs}>About us</li>
                    </ul>
                    <ul>
                      <li onClick={handlePrivacy}>privacy</li>
                    </ul>
                    <ul>
                      <li onClick={handleRules}>Rules</li>
                    </ul>
                    <ul>
                      <li onClick={handleLogout}>Sign Out</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
