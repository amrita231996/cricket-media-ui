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
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import NameCard from "./name-card";
import { clearStorage, getStorageItem } from "../../../utils/sessionStorage";
import { propTypes } from "react-bootstrap/esm/Image";

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
  height:"100%",
  width: "100%",
  p: 0,
};


const ShareModal = (props) => {
  const mobileView = useMediaQuery("(max-width:900px)");
  const { open, handleClose, handleOpen, postObj, newSharedDetail } = props;
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const [status, setStatus] = useState(true);
  const [formContent, setFormContent] = useState({
    message: "",
    image: "",
  });
  const handleInputChange = (event) => {
    const { name, value, id } = event.target;  
      setFormContent({
        ...formContent,
        [name]: value,
      });
    setStatus(formContent.message === "" && formContent.image === "");
  };

  const navigate = useNavigate();
  const sharePost = () => {
    const shared = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/shared",
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        comment: formContent.message,
        feedId: postObj._id,
      }
    }
    axios(shared)
    .then((response) => {
      props.pageLoad()
      handleModalClose();
    })
  .then((response) => {
    navigate("/feed")
  })
  .catch((error) => {
    if (error?.response?.status == 401) { 
      clearStorage()
      navigate('/login'); }
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
        if (error?.response?.status === 401) { navigate('/login'); }
      });
  };
  const handleModalClose = () => {
    handleClose();
    setFormContent({
      message: "",
      image: "",
    });
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);


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
      sx={{overflow: "scroll"}}
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
          <form onSubmit={sharePost}>
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
              <Grid container spacing={2} sx={{ padding: "20px" }}>
                <Grid item lg={2}>
                  <img
                    src={userInfo.avatar}
                    alt=""
                    style={{ width: "50px", height: "53px", borderRadius: 50 }}
                  />
                </Grid>
                <Grid item lg={10}>
                  <textarea
                    onChange={handleInputChange}
                    name="message"
                    placeholder="Start typing here"
                    id="postContent"
                    className="share-post-content"
                    value={formContent.message}
                  ></textarea>
                </Grid>
              </Grid>
            </Box>
          </form>
          <div style={{padding: "20px"}}>
          <NameCard postObj={postObj}/>
          </div>
          <div>
            <div className="post-modal-bottom-panel">
              <div className="submit-btn">
                <SubmitButton label="Submit" onClick={sharePost} />
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ShareModal;
