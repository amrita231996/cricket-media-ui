import { useEffect, useState } from "react";
import React from "react";
import Input from "../../commons/form/input";
import Upload from "../../assets/images/onboarding/upload.svg";
import Avatar from "../../assets/images/onboarding/avatar.svg";

import Batsmen from "../../assets/images/onboarding/batsmen.svg";
import Keeper from "../../assets/images/onboarding/keeper.svg";
import Umpire from "../../assets/images/onboarding/umpire.svg";
import Bowler from "../../assets/images/onboarding/bowler.svg";

import BatsmenSelected from "../../assets/images/onboarding/batsmen-selected.svg";
import KeeperSelected from "../../assets/images/onboarding/keeper-selected.svg";
import UmpireSelected from "../../assets/images/onboarding/umpire-selected.svg";
import BowlerSelected from "../../assets/images/onboarding/bowler-selected.svg";
import LogoWithTitle from "../signin-signup/logo.component";
import "./index.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../loading-button/LoadingButton";
import { getStorageItem } from "../../utils/sessionStorage";
import { width } from "@mui/system";

const OnboardingComponent = () => {
  const loginOptionPassword = getStorageItem('loginOptionPassword');
  const profileEmail = getStorageItem("user_email");
  const userName = getStorageItem("user_name");
  const userID = getStorageItem("user_id");
  const accessToken = getStorageItem("token");
  const uid = getStorageItem("uid");
  const inviteKey = getStorageItem("inviteKey");
  const navigate = useNavigate();
  // if (firstName && lastName){navigate('/pitch');}
  const [image, setImage] = useState(Avatar);
  const [disabled, setDisabled] = useState(true);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    profilePhoto: "",
    state: "",
    user: "",
    interests: {
      batsmen: false,
      bowler: false,
      keeper: false,
      umpire: false,
    },
  });
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [style, setStyle] = useState({});


  const updateToken = () => {
    var loginOptions = {
      method: "post",
      url: global.config.ROOTURL.prod + "/auth/login/",

      data: { email: profileEmail, password: loginOptionPassword.toString() },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      json: true,
    };
    console.log('loginOptions', loginOptions);
    axios(loginOptions)
      .then((response) => {
        console.log('loginOptions0000', response.data);
        if (response.data.data.match) {
          localStorage.setItem("token", response.data.data.token);
          navigate("/feed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleLater = () => {
    window.location.href = "/pitch";
  };


  const handleNext = () => {
    setDisabled(true);

    if (step === 1) {
      userInfo.user = userID;
    }

    let profileData = new FormData();

    profileData.append("firstName", userInfo.first_name);
    profileData.append("lastName", userInfo.last_name);
    profileData.append("uploader", userInfo.profilePhoto);
    if (uid != null) {
      profileData.append("referredUserId", uid);
      profileData.append("secretCode", inviteKey);
    }

    var saveProfileOptions = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/update/",
      data: profileData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(saveProfileOptions)
      .then(() => {
        localStorage.setItem("first_name", userInfo.first_name);
        localStorage.setItem("last_name", userInfo.last_name);
        localStorage.setItem(
          "full_name",
          userInfo.first_name + " " + userInfo.last_name
        );
        localStorage.setItem("avatar", image);
        updateToken();
      })
      .catch(() => { });

    if (step === 2) {
      handleLater();
    }
  };
  const onImageChange = (event) => {
    console.log("event", event);
    if (event.target.files && event.target.files[0]) {
      userInfo.profilePhoto = event.target.files[0];
      setImage(URL.createObjectURL(event.target.files[0]));
      console.log("image", image);
      console.log("event.target.files[0]",  event.target.files[0]);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const updateInterests = (key) => {
    const interests = {
      ...userInfo.interests,
      [key]: !userInfo.interests[key],
    };

    setUserInfo({
      ...userInfo,
      interests,
    });
  };

  useEffect(() => {
    setStyle({
      background: `${!disabled && !loading
          ? "#0c5ba0"
          : "#747452"
        }`,
      color: "white",
      width: "95%",
      padding: "6px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      "&.MuiButtonBase-root:hover": {
        bgcolor: "rgb(21, 101, 192)",
        border: "none",
      },
      "&.MuiButton-root.Mui-disabled": {
        color: "darkgrey",
      },
    });
  }, [disabled]);

  const getGtkmMarkup = () => {
    let markup;

    switch (step) {
      case 1:
        markup = (
          <>
            <LogoWithTitle fontSize={"100"} />

            <p className="center greeting">
              <span>Hello, </span>
              <span>{profileEmail}</span>
            </p>
            <p className="center others-know">Let others know about you</p>
            <div className="onboarding gtkm form">
              <Input
                classes=" gtkm-name"
                placeholder="First Name"
                id="first_name"
                name="first_name"
                onChange={handleOnChange}
              />
              <Input
                classes=" gtkm-name"
                placeholder="Last Name"
                id="last_name"
                name="last_name"
                onChange={handleOnChange}
              />

              <div className="gtkm-upload-container">

                <p className="add-pic">
                  Add a photo to better connect with friends and the like minded
                  ones. People love your smile
                </p>
                <div className="gtkm-upload">
                  <div className="avatar">
                    <div className="image-upload">
                      <label for="file-input">

                        <img  className="profile-avatar image-user" 
                               
                                 src={image}
                                 alt="Upload your avatar" />
                      </label>

                      <input id="file-input" type="file" onChange={onImageChange} />
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      default:
        const { batsmen, bowler, keeper, umpire } = userInfo.interests;

        markup = (
          <>
            <p className="center ">Hello , {userName}</p>
            <span className="center limit ">
              Meet new people {"&"} discover activities , news and much more of
              your interest. What are you interested in ?
            </span>
            <form className="onboarding gtkm form">
              <div className="interests">
                <div className="interest">
                  <img
                    src={batsmen ? BatsmenSelected : Batsmen}
                    onClick={() => {
                      updateInterests("batsmen");
                    }}
                    alt=""
                  />
                </div>
                <div className="interest">
                  <img
                    src={keeper ? KeeperSelected : Keeper}
                    onClick={() => {
                      updateInterests("keeper");
                    }}
                    alt=""
                  />
                </div>
                <div className="interest">
                  <img
                    src={bowler ? BowlerSelected : Bowler}
                    onClick={() => {
                      updateInterests("bowler");
                    }}
                    alt=""
                  />
                </div>
                <div className="interest">
                  <img
                    src={umpire ? UmpireSelected : Umpire}
                    onClick={() => {
                      updateInterests("umpire");
                    }}
                    alt=""
                  />
                </div>
              </div>
            </form>
          </>
        );
    }
    return markup;
  };

  useEffect(() => {
    if ((userInfo.first_name && userInfo.last_name) || step === 2) {
      setDisabled(false);
    }
  }, [userInfo]);

  return (
    <div className="component on-boarding">
      {getGtkmMarkup()}
      <div className="gtkm-footer btn-block">
        <LoadingButton
          disabled={disabled}
          style={style}
          buttonValue={"Next"}
          setSuccess={setSuccess}
          setLoading={setLoading}
          handleClick={handleNext}
          loading={loading}
          success={success}
        ></LoadingButton>
      </div>
    </div>
  );
};

export default OnboardingComponent;
