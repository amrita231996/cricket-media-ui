import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import Runs from "../../assets/images/icons/post-action.png";
import TwoRuns from "../../assets/images/icons/2run.png";
import FourRuns from "../../assets/images/icons/4run.png";
import SixRuns from "../../assets/images/icons/6run.png";
import axios from "axios";
import "./PostPopupStyle.scss";
import "./PostPopupStyle.css";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import SendIcon from "@mui/icons-material/Send";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import DropdownMenu from "./../dropdown-menu/dropdownMenu";

import { IconButton, useMediaQuery } from "@mui/material";
import ShareModal from "../../commons/components/share-modal/PostModal";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import Commentpagination from "./Commentpagination";

import { AiOutlineClose } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MentionsInput, Mention } from "react-mentions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "75vh",
  borderRadius: "12px",
};

const styleNoImage = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "75vh",
  borderRadius: "12px",
};

const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  height: "90vh",
  overflow: "scroll",
};

const PostPopup = ({ props, open, setOpen, handleclose, sharedetail }) => {
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const mobileView = useMediaQuery("(max-width:450px)");
  const { post } = props;
  const [postObj, setPostObj] = useState(props.post);
  const [showRuns, setShowRuns] = useState(false);
  const [sharing, setSharing] = useState(false);
  // const [newComments, setComments] = useState();
  const avatar = getStorageItem("avatar");
  const [ownPost, setOwnPost] = useState(false);
  const [runsGiven, setRunsGiven] = useState(false);
  const [newSharedDetail, setNewSharedDetail] = useState([]);
  var regex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg|webp))/i;
  const navigate = useNavigate();
  const [sharedBody, setSharedBody] = useState("");
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [runsScored, setRunsScored] = useState();
  const [runsGivenValue, setRunsGivenValue] = useState(0);
  const [runsImage, setRunsImage] = useState(Runs);
  const [shareOpen, setShareopen] = useState(false);
  const [id, setId] = useState();
  const [comments, setComments] = useState();
  // share modal
  // const [] = useState(false);

  const handleOpen = () => {
    setShareopen(true);
  };
  const handleClose = () => {
    setShareopen(false);
  };
  //
  useEffect(() => {}, [shareOpen]);

  // post popup modal
  const [postOpen, setPostOpen] = React.useState(true);
  const handlePostClose = () => {
    setOpen(false);
    handleclose();
  };
  //
  const toggleRuns = () => {
    setShowRuns(!showRuns);
  };

  const closeModal = () => {
    setSharing(false);
    // FeedShare();
    props.hprops();
  };

  const getSharedBody = (event) => {
    setSharedBody(event.target.value);
  };

  // const [youtubeUrl, setyoutubeUrl] = useState("");

  useEffect(() => {
    setOwnPost(userId === postObj.userId);
    getFeedDetailByFeedId();
  }, []);

  useEffect(() => {
    if (postObj.sharedDetail !== undefined) {
      setNewSharedDetail(postObj.sharedDetail);
    }
  }, [postObj]);

  const handleCommentSubmit = () => {
    postComment();
    setComments("");
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
          {/* <div className="follower__mark">
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
          </div> */}
        </div>
        <div className="suggestions1__fullname">
          <h2>{entry.display}</h2>
        </div>
        {/* <div className="suggestions1__email">
          <p>{entry.email}</p>
        </div> */}
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
        {/* <div className="suggestions1__runs">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2727 2.71428L11.2727 2.71424C10.1304 1.57718 8.61323 0.95 7 0.95C5.37396 0.95 3.85413 1.57712 2.71436 2.71428L2.71432 2.71432C1.5771 3.85155 0.95 5.37399 0.95 7C0.95 8.61323 1.57718 10.1304 2.71424 11.2727L2.71428 11.2727C3.85657 12.4176 5.37898 13.05 7 13.05C8.6108 13.05 10.128 12.4176 11.2728 11.2728C12.4176 10.128 13.05 8.60821 13.05 7C13.05 5.37898 12.4176 3.85656 11.2727 2.71428ZM3.83299 11.5719L4.28181 11.1231L4.31716 11.0877L4.28181 11.0524L4.00826 10.7788L3.9729 10.7435L3.93755 10.7788L3.44318 11.2732C3.17702 11.0523 2.93243 10.8057 2.71144 10.5412L3.18761 10.065L3.22297 10.0297L3.18761 9.99432L2.91407 9.72077L2.87871 9.68542L2.84335 9.72077L2.41329 10.1508C2.35855 10.0714 2.30549 9.98943 2.25515 9.90588L9.90328 2.25776C9.98643 2.30805 10.0672 2.36118 10.1479 2.41621L9.91174 2.65239L9.87639 2.68774L9.91174 2.7231L10.1853 2.99665L10.2206 3.032L10.256 2.99665L10.5414 2.71127C10.8055 2.92973 11.0477 3.16977 11.2662 3.4314L10.9972 3.71666L10.9629 3.753L10.9992 3.78731L11.2805 4.05312L11.3169 4.0875L11.3512 4.05108L11.565 3.82435C11.6183 3.90005 11.6691 3.97724 11.7185 4.05596L4.05577 11.7187C3.97941 11.6714 3.90485 11.6229 3.83299 11.5719ZM1.4371 7C1.4371 3.93342 3.93342 1.4371 7 1.4371C7.88361 1.4371 8.7186 1.64295 9.46034 2.01218L2.01231 9.46021C1.64531 8.71838 1.4371 7.88343 1.4371 7ZM7 12.5629C6.101 12.5629 5.25054 12.3471 4.4981 11.9675L11.9676 4.49797C12.3495 5.25033 12.5629 6.10082 12.5629 7C12.5629 10.0666 10.0666 12.5629 7 12.5629Z"
              fill="#718193"
              stroke="#718193"
              stroke-width="0.1"
            />
          </svg>
          <p>{entry.totalRun}</p>
        </div> */}
      </div>
    );
  };

  const postComment = () => {
    console.log("commentData " + comments);
    const submitComment = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/comment/create",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: {
        feedId: postObj._id,
        commentText: comments,
      },
    };
    console.log(submitComment);
    axios(submitComment)
      .then(() => {
        // getCommentByFeedId();
        setComment("");
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          console.log(error);
        }
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const getFeedDetailByFeedId = () => {
    const option = {
      method: "GET",
      url: global.config.ROOTURL.prod + `/feed/feedById/${postObj._id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    };
    axios(option)
      .then((res) => {
        setPostObj(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sharePost = () => {
    const shared = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/shared",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: {
        comment: sharedBody,
        FeedId: postObj.FeedId,
      },
    };
    axios(shared)
      .then(() => {
        closeModal();
      })
      .then(() => {
        navigate("/feed");
      })
      .catch((error) => {
        setShowRuns(!showRuns);
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    if (runsGivenValue === 2) {
      setRunsImage(TwoRuns);
    } else if (runsGivenValue === 4) {
      setRunsImage(FourRuns);
    } else if (runsGivenValue === 6) {
      setRunsImage(SixRuns);
    }
  }, [runsGivenValue, runsGiven]);

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
          //   if (data.youFollow?.length) {
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
          // // verifyFollower();
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

          };
        });
      })
      .then(callback);
  };

  // const getUserMentions = async (str, callback) => {
  //   if (!str) return;
  //   const nameSearch = {
  //     method: "POST",
  //     url: global.config.ROOTURL.prod + "/auth/name-search",
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       searchText: str,
  //       pageNumber: 1,
  //       pagePerSize: 5,
  //     },
  //   };
  //   axios(nameSearch)
  //     .then(({ data }) => {
  //       return data.map((data) => {
  //         let following = false;
  //         let follower = false;
  //         const verifyFollowing = () => {
  //           data.followers.forEach((follower) => {
  //             if (follower.followerUserId === userId) {
  //               following = true;
  //               return;
  //             }
  //           });
  //         };
  //         const verifyFollower = () => {
  //           data.followers.forEach((following) => {
  //             if (following.followingUserId === userId) {
  //               follower = true;
  //               return;
  //             }
  //           });
  //         };
  //         verifyFollowing();
  //         verifyFollower();
  //         return {
  //           id: data._id,
  //           display: "@" + data.firstName + " " + data.lastName,
  //           photo: data.profilePhoto,
  //           email: data.email,
  //           followers: 450,
  //           runs: 13450,
  //           followersCount: data.followersCount,
  //           totalRun: data.totalRun,
  //           following: following,
  //           follower: follower,
  //         };
  //       });
  //     })
  //     .then(callback);
  // };

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

  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  // /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let youtubeLink;

  const [showEmojis, setShowEmojis] = useState(false);

  function youtubeParser(url) {
    if (url !== undefined) {
      // console.log(url);
      const checks = url.split(" ");

      return (
        <p>
          {checks.map((words, index) => {
            var word;
            words.includes("/watch?v=")
              ? (word = words?.replace("/watch?v=", "/embed/"))
              : (word = words?.replace("youtu.be/", "www.youtube.com/embed/"));
            if (word.includes("http")) {
              youtubeLink = word;
            }
            return words.match(URL_REGEX) ? <></> : words + " ";
          })}
        </p>
      );
    }
  }

  // youtubeParser(postObj.postMessage);

  function removeYouTubeUrls(description) {
    // Use a regular expression to search the description for YouTube URLs
    const regExp =
      /https?:\/\/(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/g;
    return description?.replace(regExp, "");
  }

  const handleEmojiPicker = () => {
    setShowEmojis(!showEmojis);
  };

  const onEmojiClick = (EmojiClickData, MouseEvent) => {
    const emoji = EmojiClickData.emoji;
    setComments(comments + emoji);
  };

  function replaceHashtags(description) {
    // Use a regular expression to match hashtags that are not already anchor tags
    const regex = /(?!<a[^>]*>)(#(\w+))(?![^<]*<\/a>)/g;
    // Replace hashtags with anchor tags
    return description?.replace(
      regex,
      '<a class="hashtagged" href="/hashtags?hashtag=$2">$1</a>'
    );
  }

  postObj.postMessage = replaceHashtags(postObj.postMessage);

  youtubeParser(postObj.postMessage);

  return (
    <div>
      <Modal
        open={open}
        onClose={handlePostClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={
            mobileView
              ? styleMobile
              : !postObj.postImageURL && !youtubeLink
              ? styleNoImage
              : style
          }
        >
          <div className="wrapper">
            {/* Image Box */}

            {youtubeLink ? (
              <div className="image-box">
                <div className="comment-popup-youtube-video-wrapper">
                  {youtubeLink && (
                    <iframe
                      src={youtubeLink}
                      title="YouTube video player"
                      frameborder="0"
                      allowfullscreen
                      sandbox
                    ></iframe>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            {postObj.postImageURL ? (
              <div className="image-box">
                {postObj.postImageURL ? (
                  postObj.postImageURL.match(regex) ? (
                    <img
                      className="post-img"
                      src={postObj.postImageURL}
                      alt=""
                    />
                  ) : (
                    <video className="post-video" controls>
                      <source src={postObj.postImageURL} />
                    </video>
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {/* Content Box */}
            <div className="content-box">
              {/* Close Icon */}
              <div className="close-wrapper container-content">
                <AiOutlineClose
                  className="icon-close"
                  onClick={handlePostClose}
                />
              </div>
              {/* Header */}
              <div className="header-wrapper container-content">
                {/* Main Header */}
                <div className="post-header">
                  <div className="post-header-left">
                    <img
                      className="avatar-image"
                      src={
                        postObj.userProfilePhoto
                          ? postObj.userProfilePhoto
                          : defaultAvatar
                      }
                      alt={""}
                    />
                    <span>
                      <Link
                        className="username-link"
                        to={`/profile/${postObj.userId}`}
                        style={{ textDecoration: "none" }}
                      >
                        {postObj.userName}
                      </Link>
                      <p className="Feed-date-time">
                        {postObj.createdDate && (
                          <ReactTimeAgo
                            date={postObj.createdDate}
                            locale="en-US"
                          />
                        )}
                        <br />
                      </p>
                    </span>
                  </div>
                </div>
                {/* Post Header */}
                <div
                  className={`post-description ${
                    postObj.sharedDetail && postObj.sharedDetail.firstName
                      ? "shared-post-content"
                      : ""
                  }`}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: removeYouTubeUrls(
                        postObj.postMessage?.replace(/\n\r?/g, "<br />")
                      ),
                    }}
                  />
                
                </div>
              </div>
              {/* Comments Section */}
              <div className="all-comments container-content">
                <Commentpagination id={postObj._id} />
              </div>
              {/* Footer Section */}
              <div className="footer-wrapper container-content">
                <MentionsInput
                  value={comments?comments:''}
                  name="message"
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                  id="postContent"
                  className="textarea-box text-section"
                  placeholder="Write a comment"
                  style={MentionStyle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommentSubmit();
                    }
                  }}
                >
                  <Mention
                    trigger="@"
                    renderSuggestion={renderSuggestions}
                    style={tagStyles}
                    appendSpaceOnAdd={true}
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
                <div className="icon-section">
                  <BsEmojiSmile
                    className="emoji-icon"
                    onClick={handleEmojiPicker}
                  />
                  <span className="send-icon">
                    <IconButton
                      disabled={comments !== "" ? false : true}
                      onClick={() => handleCommentSubmit()}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <ShareModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={shareOpen}
        postObj={props.post}
        pageLoad={props.hprops}
        newSharedDetail={sharedetail}
      />
    </div>
  );
};

export default PostPopup;
