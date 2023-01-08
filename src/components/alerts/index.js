import { useEffect, useState } from "react";

import Camera from "../../assets/images/posts/camera.svg";
import CameraWhite from "../../assets/images/posts/camera_white.svg";

import "./index.scss";
import CricketMediaButton from "../../commons/form/button";
import PostContext from "../../context/post";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import Compressor from "compressorjs";
import GalleryIcon from "../../assets/images/icons/gallery.svg"

import PostModal from "../../commons/components/post-modal/PostModal";
import { getStorageItem } from "../../utils/sessionStorage";

const Alert = (props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false);props.hprops(); };
  
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(true);
  const [formContent, setFormContent] = useState({
    message: "",
    image: "",
  });
  const handleOnClick = () => {
    handleOpen();
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormContent({
      message: "",
      image: "",
    });
  };
  useEffect(() => {
    setStatus(formContent.message === "" && formContent.image === "");
  }, [formContent.message, formContent.image]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      if (event.target.files[0].type.includes("image")) {
        const file = event.target.files[0];
        //...not using compress object to pass service the issue is that after compress object is blob so in service multer is not able to parse it
        new Compressor(file, {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult) => {
            if (compressedResult.size > 5000000) {
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
      });
    }
    setStatus(formContent.message === "" && formContent.image === "");
  };
  const formData = new FormData();
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
        if (error?.response?.status == 401) { navigate('/login'); }
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const getFormMarkup = (showForm, Camera, handleCancel) => {
    return (
      <div className={`form ${showForm ? "visible" : "hidden"}`}>
        <div className="form-heading">Type your post</div>
        <div className="post-form">
          <textarea
            onChange={handleInputChange}
            name="message"
            placeholder="Start typing here"
            id="postContent"
            className="post-content"
            value={formContent.message}
          ></textarea>
        </div>
        <div className="attachment-content">
          {formContent.image ? (
            formContent.image.type &&
            formContent.image.type.includes("image") ? (
              <img
                className="attch responsive"
                src={URL.createObjectURL(formContent.image)}
                alt=""
              />
            ) : (
              <video width="400" className="attch responsive" controls>
                <source src={URL.createObjectURL(formContent.image)} />
                Your browser does not support HTML5 video.
              </video>
            )
          ) : (
            " "
          )}
        </div>
        <div className="post-footer">
          <div className="cta-container">
            <div className="left-cta">
              <label className="image-and-video-size-validation">
                * Maximum image size 5 MB; Maximum video length 1.5 minutes
              </label>
              <CricketMediaButton
                classes="upload primary-button attach"
                label="Upload an image/video"
                id="image"
                name="image"
                icon={Camera}
                onChange={handleInputChange}
                type="file"
              />
            </div>
            <div className="right-cta">
              <CricketMediaButton
                classes="upload primary-button cancel-post"
                label="Cancel"
                onClick={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="component alert">
      <div className="alert-container">
        <div className="alert-title">Post Something</div>
        <div>
          <div className="left" onClick={handleOnClick}>
            <img
              src={userInfo.avatar}
              alt=""
              style={{ width: "50px", height: "53px", borderRadius: 50 }}
            />
            <span className="alert-text primary">Share your thoughts...</span>
            <img src={GalleryIcon} className="gallery-icon" alt=""/>
          </div>
        </div>

        <div
          style={{
            display: showForm ? "none" : "block",
          }}
          className="right"
        >
          {/* <Button
            label="Submit a post"
            classes="create-post"
            onClick={handleOnClick}
          /> */}
        </div>
        <PostContext.Consumer>
          {(value) =>
            value.showForm &&
            getFormMarkup(
              value.showForm,
              CameraWhite,
              value.toggleShowForm,
              status
            )
          }
        </PostContext.Consumer>
      </div>

      {getFormMarkup(showForm, Camera, handleCancel, status)}
      <PostModal 
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default Alert;
