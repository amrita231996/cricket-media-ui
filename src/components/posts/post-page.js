import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import CricketMediaButton from "../../commons/form/button";
import ReactTimeAgo from "react-time-ago";
import Comments from "../../assets/images/icons/comments.svg";
import Share from "../../assets/images/icons/share.svg";
import axios from "axios";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import DropdownMenu from "./../dropdown-menu/dropdownMenu";
import NameCard from "./name-card";
import ShareModal from "../../commons/components/share-modal/PostModal";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import PostPopup from "./PostPopup";
import "./index.scss";

const PostPage = (props) => {
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const [postObj, setPostObj] = useState(props.post);
  const [sharing, setSharing] = useState(false);
  const avatar = getStorageItem("avatar");
  const [ownPost, setOwnPost] = useState(false);
  const [newSharedDetail, setNewSharedDetail] = useState([]);
  var regex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg|webp))/i;
  const navigate = useNavigate();
  const [sharedBody, setSharedBody] = useState("");
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [popupData, setpopupData] = useState(false);
  const postlocation = window.location.pathname;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // props.hprops();
  };

  const closeModal = () => {
    setSharing(false);
    // FeedShare();
    // props.hprops();
  };

  const getSharedBody = (event) => {
    setSharedBody(event.target.value);
  };


  useEffect(() => {
    setOwnPost(userId === postObj.userId);
    getRunByUserIdAndFeedId();
  }, [popupData]);

  useEffect(() => {
    if (postObj.sharedDetail !== undefined) {
      setNewSharedDetail(postObj.sharedDetail);
    }
  }, [postObj]);

  const [commentData, setCommentData] = useState({});
  const getCommentData = (event) => {
    setComment(event.target.value);
    setCommentData({
      FeedId: postObj._id,
      commentText: event.target.value,
    });
  };

  const handleCommentSubmit = () => {
    postComment();
    setComment("");
  };

  const postComment = () => {
    const submitComment = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/comment/create",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: commentData,
    };
    axios(submitComment)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
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
        FeedId: postObj._id,
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
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };


  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  // /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let youtubeLink;

  function replaceHashtags(description) {
    // Use a regular expression to match hashtags that are not already anchor tags
    const regex = /(?!<a[^>]*>)(#(\w+))(?![^<]*<\/a>)/g;
    // Replace hashtags with anchor tags
    return description?.replace(
      regex,
      '<a class="hashtagged" href="/hashtags?hashtag=$2">$1</a>'
    );
  }
  if (postObj.postMessage) {
    postObj.postMessage = replaceHashtags(postObj.postMessage);
  }

  function youtubeParser(url) {
    if (url !== undefined) {
      var checks = url.split(" ");

      return (
        <p>
          {checks.map((words, index) => {
            var word;

            words.includes("/watch?v=")
              ? (word = words?.replace("/watch?v=", "/embed/"))
              : (word = words?.replace("youtu.be/", "www.youtube.com/embed/"));

            if (word.includes("http://") || word.includes("https://")) {
              youtubeLink = word;
            }

            return words.match(URL_REGEX) ? (
              <>
                {/* <a href={words} target="_blank" rel="noreferrer">
                {words}
              </a>{" "} */}
              </>
            ) : (
              words + " "
            );
          })}
        </p>
      );
    }
  }

  youtubeParser(postObj.postMessage);

  function removeYouTubeUrls(description) {
    // Use a regular expression to search the description for YouTube URLs
    const regExp =
      /https?:\/\/(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/g;
    return description?.replace(regExp, "");
  }

  const handlePopup = () => {
    setIsPostOpen(!isPostOpen);
    setpopupData(true);
  };

  const handleclose = () => {
    setpopupData(false);
  };

  return (
    <div className="post">
      {/* start when third reference person do activity then will show this*/}
      <p
        className={`activity-alert ${
          postObj?.actedFirstName ? "" : "activity-hidden"
        }`}
      >
        {postObj.tag === "FeedCOMMENT"
          ? `${postObj.actedFirstName} ${postObj.actedLastname} has commented on this Feed `
          : postObj.tag === "FeedRUN"
          ? `${postObj.actedFirstName} ${postObj.actedLastname} has given ${postObj.actedRun} runs on this Feed `
          : ""}
        <ReactTimeAgo
          date={
            postObj.modifiedDateForRunandComment
              ? postObj.modifiedDateForRunandComment
              : new Date()
          }
          locale="en-US"
        />
      </p>
      {/* end*/}
      <div className="post-header">
        <div className="left">
          <div className="avatar">
            <img
              className="avatar-image"
              src={
                postObj.userProfilePhoto
                  ? postObj.userProfilePhoto
                  : defaultAvatar
              }
              alt={""}
            />
          </div>
          <div className="avatar-cnt">
            <p>
              <Link
                className="shared-link"
                to={`/profile/${postObj.userId}`}
                style={{ textDecoration: "none" }}
              >
                {postObj?.userName}
              </Link>
            </p>
            <p className="date-time">
              {postObj?.createdDate && (
                <ReactTimeAgo date={postObj?.createdDate} locale="en-US" />
              )}
              <br />
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="post-edit">
            <DropdownMenu
              type="post-menu"
              postId={postObj?._id}
              userId={postObj?.userId}
              setPostObj={setPostObj}
              content={postObj?.postMessage}
              sharedContent={newSharedDetail.sharedText}
              image={postObj?.postImage}
              sharedDetail={postObj?.sharedDetail}
              postObj={postObj}
              // pageLoad={props.hprops}
            />
          </div>
        </div>
      </div>
      {postObj.sharedDetail && postObj.sharedDetail !== {} && (
        <div
          className="post-content shared-border"
          style={{
            margin: `${postObj.sharedDetail.sharedText ? "" : 0}`,
            padding: `${postObj.sharedDetail.sharedText ? "" : 0}`,
          }}
        >
          {postObj.sharedDetail.sharedText}
          <img
            className="post-image"
            src={postObj.sharedDetail.postImage}
            alt=""
          />
        </div>
      )}
      <div
        className={`post-content ${
          postObj.sharedDetail && postObj.sharedDetail.firstName
            ? "shared-post-content"
            : ""
        }`}
      >
        {postObj.sharedDetail && postObj.sharedDetail.firstName && (
          <NameCard postObj={postObj} newSharedDetail={postObj.sharedDetail} />
        )}
        <div
          className={`${
            postObj.sharedDetail && postObj.sharedDetail.firstName
              ? "shared-post-text"
              : ""
          }`}
        >
          {/* {postObj.postMessage} */}
          {/* <ReactMarkdown children={postObj.postMessage} /> */}
          <p
            dangerouslySetInnerHTML={{
              __html: removeYouTubeUrls(
                postObj.postMessage?.replace(/\n\r?/g, "<br />")
              ),
            }}
          />
          {/* {YouTubeEmbed(postObj.postMessage)} */}
          {youtubeLink && (
            <iframe
              width="100%"
              height="315"
              src={youtubeLink}
              title="YouTube video player"
              frameborder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              sandbox
            ></iframe>
          )}
        </div>
        {postObj.postImageURL ? (
          postObj.postImageURL.match(regex) ? (
            <img
              className="post-image"
              src={postObj.postImageURL}
              onClick={handlePopup}
              alt=""
              style={{ cursor: "pointer" }}
            />
          ) : (
            <video className="post-image" onClick={handlePopup} controls>
              <source
                src={postObj.postImageURL}
                style={{ cursor: "pointer" }}
              />
            </video>
          )
        ) : (
          ""
        )}
      </div>
      <div className="post-footer post-header border">
        <div className="comments-hld hld" onClick={handlePopup}>
          <img src={Comments} className="icon-btn" alt="" role="button" />
          <div className="comments-stat">
            {postObj.postCommentCount +
              (postlocation === "/feed" &&
                (postObj.postCommentCount === 1 ? " Comment" : " Comments"))}
          </div>
          <div className="mobile-comments-stat">{postObj.postCommentCount}</div>
        </div>

        <div className="share-hld hld">
          <div className="share-btn-container" onClick={() => handleOpen()}>
            <img src={Share} className="icon-btn" alt="" role="button" />
            <div className="comments-stat">
              {postlocation === "/feed" && " Share"}
            </div>
          </div>
          <div className={`share-modal ${sharing ? "visible" : "hidden"}`}>
            <div className="share-modal__container">
              <div className="share-modal__container__form">
                <div className="input-textarea">
                  <textarea
                    placeholder="Write Something"
                    id="sharedBody"
                    onChange={getSharedBody}
                  ></textarea>
                </div>
                <div className="content left">
                  <div className="avatar">
                    <img className="avatar-image" src={avatar} alt={""} />
                    <div className="avatar-cnt">
                      <p>{postObj.firstName + " " + postObj.lastName}</p>
                      <p className="date-time">{postObj.createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="share-modal__container__actions">
                <CricketMediaButton
                  onClick={closeModal}
                  classes="cancel secondary"
                  label="Cancel"
                />
                <CricketMediaButton
                  onClick={() => sharePost()}
                  classes="share primary"
                  label="Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`comments-holder visible`}>
        <div className="post-comment">
          <div className="text-block">
            <textarea
              placeholder="Write a comment"
              onChange={getCommentData}
              value={comment}
            ></textarea>
          </div>
          <div
            className="action-block"
            style={{ display: `${comment.length > 0 ? "" : "none"}` }}
          >
            <CricketMediaButton
              onClick={() => handleCommentSubmit()}
              classes="share"
              label="Post"
            />
          </div>
        </div>
        <div
          className={`post-header view-comments ${
            showComments ? "" : "hidden"
          }`}
        >
          {/* <div className="all-comments" style={{ padding: "1em" }}>
            {newComments.map((comment, index) => {
              return <CommentBox key={index} comment={comment} />;
            })}
          </div> */}
        </div>
      </div>{" "}
      <ShareModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        postObj={postObj}
        newSharedDetail={newSharedDetail}
      />
      {popupData && (
        <PostPopup
          props={props}
          open={isPostOpen}
          setOpen={setIsPostOpen}
          handleclose={handleclose}
          sharedetail={newSharedDetail}
        />
      )}
    </div>
  );
};

export default PostPage;
