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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../../form/submit-button";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import defaultAvatar from "../assets/images/profile/default_avatar.png";
import Compressor from "compressorjs";
import GalleryIcon from "../../../assets/images/icons/gallery.svg";
import PollIcon from "../../../assets/images/icons/poll.svg";
import VideoIcon from "../../../assets/images/icons/video.svg";
import "./index.scss";
import defaultAvatar from "../../../assets/images/profile/default_avatar.png";
import { useMediaQuery } from "@mui/material";
import { clearStorage, getStorageItem } from "../../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _ = require("lodash");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 625,
  bgcolor: "#FFFFFF",
  border: "2px solid #F1F1F5",
  borderRadius: "12px",
  boxShadow: 24,
  p: 0,
};
const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 625,
  bgcolor: "#FFFFFF",
  border: "2px solid #F1F1F5",
  boxShadow: 24,
  minHeight: "100%",
  width: "100%",
  p: 0,
};

const tagStyles = {
  // fontFamily: "Poppins",
  // fonStyle: "normal",
  // fontWeight: 500,
  // fontSize: "14px",
  // lineHeight: "21px",
  // color: "#0c5ba0",
};

const MentionStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    input: {
      padding: 9,
      border: "1px solid silver",
      "&focused": {
        border: "1px solid black",
      },
    },
  },

  suggestions: {
    list: {
      fontSize: 14,
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 5px 15px rgba(68, 68, 79, 0.1)",
      borderRadius: 8,
      minWidth: 400,
    },
    item: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: 14,
      lineHeight: 2,
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#d2effa",
      },
    },
  },
};

const PostModal = (props) => {
  const navigate = useNavigate();
  const mobileView = useMediaQuery("(max-width:900px)");
  const { open, handleClose, handleOpen } = props;
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const userName = getStorageItem("user_name");
  const avatar = getStorageItem("avatar");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const [status, setStatus] = useState(true);
  const [formContent, setFormContent] = useState({
    message: "",
    image: "",
    messageValue: "",
    hashtags: [],
    mentions: [],
  });
  const [postMediaUrl, setPostMediaUrl] = useState("");

  // Create PostHashTag
  const createPostHashTag = async (_id, hashTagText, FeedId) => {
    const data = {
      hashTagId: _id,
      hashTagText: hashTagText,
      FeedId: FeedId,
    };
    const options = {
      method: "POST",
      url:
        global.config.ROOTURL.prod +
        "/hash-profile-tag/postHashTag/createPostHashTag",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: data,
    };
    axios(options)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          console.log(error);
        }
      });
  };

  // Create Hashtags
  const createHashTag = async (hashtags, FeedId) => {
    if (hashtags && hashtags.length) {
      for (let index = 0; index < hashtags.length; index += 1) {
        const element = hashtags[index];
        const hashTagText = element.substring(1);
        const createdUserId = userId;
        const createdUserName = `${userInfo.firstName} ${userInfo.lastName}`;
        const data = {
          hashTagText: hashTagText,
          createdUserId: createdUserId,
          createdUserName: createdUserName,
        };
        const options = {
          method: "POST",
          url: global.config.ROOTURL.prod + "/hash-profile-tag/createHashTag",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        };
        axios(options)
          .then(({ data }) => {
            console.log(data);
            createPostHashTag(data._id, data.hashTagText, FeedId);
          })
          .catch((error) => {
            if (error?.response?.status == 401) {
              console.log(error);
            }
          });
      }
    }
  };

  const [mentionedUsers, setMentionedUsers] = useState([]);

  // Create PostTags
  const createProfileTags = async (mentions, FeedDescription, FeedId) => {
    if (mentions && mentions.length) {
      const users = [];
      const mentionedUserDetails = [];
      setMentionedUsers([]);

      const findUserDetails = async (id) => {
        const data = {
          userId: id,
        };
        const options = {
          method: "POST",
          url: global.config.ROOTURL.prod + "/auth/profile",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        };
        await axios(options)
          .then(({ data }) => {
            return data;
          })
          .catch((error) => {
            if (error?.response?.status == 401) {
              console.log(error);
            }
          });
      };

      mentions.forEach((id) => {
        const data = {
          userId: id,
        };
        const options = {
          method: "POST",
          url: global.config.ROOTURL.prod + "/auth/profile",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        };
        axios(options)
          .then(({ data }) => {
            let creationOptions = {
              method: "POST",
              url:
                global.config.ROOTURL.prod +
                `/hash-profile-tag/profileTag/createProfileTag`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              data: {
                createdUserId: userId,
                createdUserName: userName,
                createdUserProfilePhoto: avatar,
                profileTagedUserId: data._id,
                profileTagedUserName: data.firstName + " " + data.lastName,
                profileTagedUserProfilePhoto: data.profilePhoto,
                FeedId: FeedId,
                postMessage: FeedDescription,
              },
            };
            axios(creationOptions)
              .then((response) => {
                console.log("hhf");
                console.log(response);
              })
              .catch((error) => {
                console.log("Creation error" + error);
                if (error?.response?.status == 401) {
                  console.log(error);
                }
              });
          })
          .catch((error) => {
            if (error?.response?.status == 401) {
              console.log(error);
            }
          });
      });
    }
  };

  const handleInputChange = (event, newValue, newPlainTextValue, mentions) => {
    console.log(event, newValue, newPlainTextValue, mentions);
    const mentionedIds = mentions
      ? mentions
          .filter((data) => data.display.includes("@"))
          .map((data) => data.id)
      : [];

    console.log(mentionedIds);

    const hashtags = newPlainTextValue
      ? newPlainTextValue
          .match(/#[^\s#]*/gim)
          ?.filter((x, i, a) => a.indexOf(x) === i)
      : [];

    const { name, value } = event.target;
    if (name === "image") {
      if (event.target.files[0].type.includes("image")) {
        const file = event.target.files[0];
        //...not using compress object to pass service the issue is that after compress object is blob so in service multer is not able to parse it
        new Compressor(file, {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult) => {
            if (compressedResult.size > 5000000) {
              toast.error("Image size greater than 5Mb");
              setStatus(true);
            } else {
              setFormContent({ ...formContent, image: file });
              setStatus(false);
            }
          },
        });
      } else {
        const videoObj = event.target.files[0];
        var video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);

          if (video.duration > 0 && video.duration <= 90) {
            setFormContent({ ...formContent, image: videoObj });
            setStatus(false);
          } else {
            setStatus(true);
          }
        };
        video.src = URL.createObjectURL(videoObj);
      }
    } else {
      setFormContent({
        ...formContent,
        [name]: value,
        message: newValue,
        messageValue: value,
        mentions: mentionedIds,
        hashtags: hashtags,
      });
    }
    setStatus(formContent.message === "" && formContent.image === "");
  };
  const formData = new FormData();

  const savePostText = (optionData) => {
    let submitPostOptions = {
      method: "post",
      url: global.config.ROOTURL.prod + "/feed/create",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: optionData,
    };

    if (
      (optionData.postMessage && optionData.postMessage.trim() !== "") ||
      optionData.postImageURL
    ) {
      axios(submitPostOptions)
        .then(({ data }) => {
          createHashTag(formContent.hashtags, data._id);
          console.log(
            "-------------------formContent.mentions--------------------"
          );
          console.log(formContent.mentions);
          createProfileTags(
            formContent.mentions,
            optionData.postMessage,
            data._id
          );
          // setMentionedUsers([]);
          handleModalClose();
          return data;
        })
        .catch((error) => {
          handleModalClose();
          if (error?.response?.status === 401) {
            navigate("/logisetUserInfon");
          }
        });
    }
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("uploader", formContent.image);
    console.log("This is upload img function call:");
    axios
      .post(`${global.config.ROOTURL.prod}/upload-file`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        if (response.data) {
          console.log("Image saved successfully",response.data);
          console.log(response.data[0].location);
          let optionData = {};
          optionData.postImageURL = `${global.config.ROOTURL.prod}/img/` + response.data[0].filename;
          if (formContent.message.trim() !== "") {
            optionData.postMessage = formContent.message.trim();
          }
          savePostText(optionData);
        } else {
          console.log("error occured:");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostSubmit = _.throttle((e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (formContent.image) {
      uploadImage();
    } else if (formContent.message.trim() !== "") {
      let optionData = {};
      optionData.postMessage = formContent.message.trim();
      // console.log('mentioned users ------------>');
      // console.log(formContent.mentions);
      optionData.mentionedIds = formContent.mentions;
      console.log("optionsData ------>");
      console.log(optionData);
      savePostText(optionData);
    }
  }, 10000);

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
          firstName: response.data.firstName
            ? response.data.PollsIconfirstName
            : "",
          lastName: response.data.lastName ? response.data.lastName : "",
          avatar: response.data.profilePhoto
            ? response.data.profilePhoto
            : defaultAvatar,
        })
      )
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleModalClose = () => {
    setButtonDisabled(false);
    handleClose();
    setFormContent({
      message: "",
      image: "",
    });
  };

  const getUserMentions = async (str, callback) => {
    if (!str) return;
    const nameSearch = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/mention-name-search",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: {
        searchText: str,
        pageNumber: 1,
        pagePerSize: 5,
      },
    };
    axios(nameSearch)
      .then(({ data }) => {
        return data.map((data) => {
          // let following = false;
          // let follower = false;
          // const verifyFollowing = () => {
          //   // data.followers.forEach((follower) => {
          //   //   if (follower.followerUserId === userId) {
          //   //     following = true;
          //   //     return;
          //   //   }
          //   // });
          //   if (data.youFollow) {
          //     following = true;
          //   }
          // };
          // const verifyFollower = () => {
          //   data.followers.forEach((following) => {
          //     if (following.followingUserId === userId) {
          //       follower = true;
          //       return;
          //     }
          //   });
          // };
          // verifyFollowing();
          // verifyFollower();
          return {
            id: data._id,
            display: "@" + data.firstName + " " + data.lastName,
            photo: data.profilePhoto,
            email: data.email,
            followers: 450,
            runs: 13450,
            followersCount: data.followersCount,
            totalRun: data.totalRun,
            following: data.youFollow,
            // follower: follower,
          };
        });
      })
      .then(callback);
  };

  const renderSuggestions = (entry) => {
    return (
      <div className="suggestions1">
        <div className="suggestions1__image">
          <img
            src={
              entry.photo
                ? entry.photo
                : "https://www.umass.edu/philosophy/sites/default/files/store/img/cfm/user_23.png"
            }
            alt="user-profile"
          />
          {entry.following && (
            <div className="following__mark">
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.4362 1.11473C4.18418 1.11473 3.93462 1.16437 3.70178 1.26081C3.46894 1.35726 3.25738 1.49862 3.07917 1.67683C2.90096 1.85503 2.7596 2.0666 2.66316 2.29944C2.56671 2.53228 2.51707 2.78183 2.51707 3.03385C2.51707 3.28588 2.56671 3.53543 2.66316 3.76827C2.7596 4.00111 2.90096 4.21267 3.07917 4.39088C3.25738 4.56909 3.46894 4.71045 3.70178 4.8069C3.93462 4.90334 4.18418 4.95298 4.4362 4.95298C4.94518 4.95298 5.43332 4.75079 5.79323 4.39088C6.15313 4.03098 6.35533 3.54284 6.35533 3.03385C6.35533 2.52487 6.15313 2.03673 5.79323 1.67683C5.43332 1.31692 4.94518 1.11473 4.4362 1.11473ZM1.96875 3.03385C1.96875 2.37945 2.22871 1.75184 2.69145 1.28911C3.15419 0.826369 3.78179 0.566406 4.4362 0.566406C5.09061 0.566406 5.71821 0.826369 6.18095 1.28911C6.64368 1.75184 6.90365 2.37945 6.90365 3.03385C6.90365 3.68826 6.64368 4.31587 6.18095 4.7786C5.71821 5.24134 5.09061 5.5013 4.4362 5.5013C3.78179 5.5013 3.15419 5.24134 2.69145 4.7786C2.22871 4.31587 1.96875 3.68826 1.96875 3.03385Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.87207 8.51673C0.87207 7.57147 1.24757 6.66493 1.91597 5.99653C2.58437 5.32814 3.49091 4.95264 4.43616 4.95264C5.38142 4.95264 6.28796 5.32814 6.95636 5.99653C7.62475 6.66493 8.00026 7.57147 8.00026 8.51673V8.67026C8.00026 8.94607 7.80725 9.18404 7.53747 9.24051L6.57736 9.44284C5.61396 9.64572 4.62862 9.70988 3.65151 9.63585C3.57979 9.62933 3.51352 9.59484 3.46702 9.53986C3.42052 9.48487 3.39752 9.41379 3.40299 9.34198C3.40846 9.27017 3.44197 9.2034 3.49627 9.1561C3.55057 9.1088 3.62131 9.08476 3.69319 9.08918C4.61875 9.15936 5.552 9.0985 6.46441 8.90604L7.42452 8.70425C7.43226 8.70273 7.43923 8.69855 7.44423 8.69245C7.44923 8.68635 7.45196 8.6787 7.45193 8.67081V8.51673C7.45193 7.7169 7.1342 6.94982 6.56863 6.38426C6.00307 5.81869 5.23599 5.50096 4.43616 5.50096C3.63633 5.50096 2.86926 5.81869 2.30369 6.38426C1.73812 6.94982 1.42039 7.7169 1.42039 8.51673V8.67026C1.42039 8.68671 1.43136 8.70042 1.44781 8.70425L2.40792 8.90604C2.44317 8.91345 2.47661 8.92774 2.50633 8.94808C2.53606 8.96842 2.56149 8.99442 2.58117 9.02459C2.60085 9.05475 2.61439 9.0885 2.62103 9.12391C2.62766 9.15931 2.62726 9.19567 2.61985 9.23092C2.61243 9.26616 2.59814 9.29961 2.5778 9.32933C2.55746 9.35906 2.53147 9.38449 2.5013 9.40417C2.47113 9.42385 2.43738 9.43739 2.40198 9.44403C2.36658 9.45066 2.33021 9.45026 2.29497 9.44284L1.33485 9.24051C1.20396 9.21306 1.08651 9.14139 1.00223 9.03754C0.917954 8.93369 0.871993 8.804 0.87207 8.67026V8.51673Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="suggestions1__fullname">
          <h2>{entry.display}</h2>
        </div>
        <div className="suggestions1__followers">
          <svg
            width="10"
            height="13"
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.78301 0.735851C4.44479 0.735851 4.10989 0.802467 3.79741 0.931897C3.48494 1.06133 3.20103 1.25104 2.96187 1.49019C2.72271 1.72935 2.53301 2.01326 2.40358 2.32574C2.27415 2.63821 2.20753 2.97311 2.20753 3.31133C2.20753 3.64954 2.27415 3.98445 2.40358 4.29692C2.53301 4.60939 2.72271 4.89331 2.96187 5.13246C3.20103 5.37162 3.48494 5.56133 3.79741 5.69076C4.10989 5.82019 4.44479 5.8868 4.78301 5.8868C5.46607 5.8868 6.12115 5.61546 6.60414 5.13246C7.08714 4.64947 7.35848 3.99439 7.35848 3.31133C7.35848 2.62827 7.08714 1.97319 6.60414 1.49019C6.12115 1.00719 5.46607 0.735851 4.78301 0.735851ZM1.47168 3.31133C1.47168 2.43311 1.82055 1.59086 2.44154 0.969865C3.06254 0.348871 3.90479 0 4.78301 0C5.66123 0 6.50347 0.348871 7.12447 0.969865C7.74546 1.59086 8.09433 2.43311 8.09433 3.31133C8.09433 4.18955 7.74546 5.03179 7.12447 5.65279C6.50347 6.27378 5.66123 6.62265 4.78301 6.62265C3.90479 6.62265 3.06254 6.27378 2.44154 5.65279C1.82055 5.03179 1.47168 4.18955 1.47168 3.31133Z"
              fill="#718193"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.31369e-07 10.6697C1.31369e-07 9.40121 0.503925 8.18463 1.40092 7.28763C2.29791 6.39064 3.51449 5.88672 4.78303 5.88672C6.05157 5.88672 7.26815 6.39064 8.16514 7.28763C9.06213 8.18463 9.56606 9.40121 9.56606 10.6697V10.8758C9.56606 11.2459 9.30704 11.5653 8.945 11.6411L7.65652 11.9126C6.36363 12.1849 5.04131 12.271 3.73003 12.1716C3.63378 12.1629 3.54484 12.1166 3.48243 12.0428C3.42003 11.969 3.38916 11.8736 3.39651 11.7772C3.40385 11.6809 3.44882 11.5913 3.52169 11.5278C3.59456 11.4643 3.68949 11.432 3.78595 11.438C5.02807 11.5322 6.28048 11.4505 7.50494 11.1922L8.79341 10.9214C8.8038 10.9194 8.81316 10.9138 8.81987 10.9056C8.82658 10.8974 8.83024 10.8871 8.83021 10.8765V10.6697C8.83021 9.59637 8.40381 8.56695 7.64482 7.80796C6.88582 7.04897 5.85641 6.62257 4.78303 6.62257C3.70965 6.62257 2.68023 7.04897 1.92124 7.80796C1.16225 8.56695 0.735851 9.59637 0.735851 10.6697V10.8758C0.735851 10.8979 0.750568 10.9163 0.772643 10.9214L2.06112 11.1922C2.10842 11.2022 2.1533 11.2213 2.19319 11.2486C2.23308 11.2759 2.26721 11.3108 2.29362 11.3513C2.32003 11.3918 2.3382 11.4371 2.34711 11.4846C2.35602 11.5321 2.35548 11.5809 2.34552 11.6282C2.33557 11.6755 2.3164 11.7204 2.2891 11.7603C2.2618 11.8002 2.22692 11.8343 2.18643 11.8607C2.14594 11.8871 2.10065 11.9053 2.05314 11.9142C2.00563 11.9231 1.95683 11.9226 1.90953 11.9126L0.621058 11.6411C0.445399 11.6042 0.287775 11.508 0.174675 11.3687C0.0615764 11.2293 -0.000103895 11.0553 1.31369e-07 10.8758V10.6697Z"
              fill="#718193"
            />
          </svg>
          <p>{entry.followersCount}</p>
        </div>
      </div>
    );
  };

  const getHashtags = async (str, callback) => {
    if (!str) return;
    const nameSearch = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/hash-profile-tag/searchHashTag",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: {
        searchText: str,
        pageNumber: 1,
        pagePerSize: 5,
      },
    };
    axios(nameSearch)
      .then(({ data }) => {
        return data.map((data) => {
          return {
            id: data._id,
            display: "#" + data.hashTagText,
          };
        });
      })
      .then(callback);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ overflow: "scroll" }}
    >
      <Fade in={open}>
        <Box sx={mobileView ? styleMobile : style}>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
          <form>
            <Typography
              id="transition-modal-title"
              export="true"
              default
              variant="h6"
              sx={{ borderBottom: 1, p: 2, borderColor: "#F1F1F5" }}
            >
              Post Something
            </Typography>
            <Box textAlign="center">
              <div className="post-cover">
                <div className="image-cover">
                  <img
                    src={userInfo.avatar}
                    alt=""
                    style={{ width: "50px", height: "53px", borderRadius: 50 }}
                  />
                </div>
                <div className="text-cover">
                  <MentionsInput
                    value={formContent.messageValue}
                    name="message"
                    placeholder="Start typing here"
                    id="postContent"
                    className="post-content"
                    onChange={(
                      event,
                      newValue,
                      newPlainTextValue,
                      mentions
                    ) => {
                      handleInputChange(
                        event,
                        newValue,
                        newPlainTextValue,
                        mentions
                      );
                    }}
                    style={MentionStyle}
                  >
                    <Mention
                      trigger="@"
                      renderSuggestion={renderSuggestions}
                      style={tagStyles}
                      appendSpaceOnAdd={true}
                      allowSpaceInQuery={true}
                      data={getUserMentions}
                      markup="<a class='mentioned' href='/profile/__id__'>__display__</a>"
                    />
                    <Mention
                      trigger="#"
                      style={tagStyles}
                      appendSpaceOnAdd={true}
                      data={getHashtags}
                      markup="<a class='hashtagged' href='/hashtags?id=__id__'>__display__</a>"
                    />
                  </MentionsInput>
                </div>
              </div>
              <div className="attachment-content">
                {formContent.image ? (
                    <img
                      className="attch responsive"
                      src={URL.createObjectURL(formContent.image)}
                      alt=""
                    />
                  ) : (
                  " "
                )}
              </div>
            </Box>
          </form>
          <div>
            <div className="post-modal-bottom-panel">
              <div className="icon-btn-block">
                <IconButton
                  variant="contained"
                  component="label"
                  color="primary"
                >
                  <Tooltip
                    title="Image size must be less than 5 Mb."
                    placement="top"
                  >
                    <img src={GalleryIcon} alt="" />
                  </Tooltip>
                  <input
                    type="file"
                    hidden
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </IconButton>
              </div>
              <div className="submit-btn">
                <SubmitButton
                  label="Submit"
                  onClick={handlePostSubmit}
                  disabled={buttonDisabled}
                />
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PostModal;
