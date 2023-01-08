import { useEffect, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SearchIcon from "@mui/icons-material/Search";
import Invite from "../../assets/images/home/invite.png";
import Link from "../../assets/images/home/link.svg";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import { successToast } from "../toast";
import { getAuthToken } from "../../utils/auth";
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
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SubmitIcon from "../../assets/images/icons/send.svg";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import validator from "validator";
import { clearStorage } from "../../utils/sessionStorage";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width:"100%",
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
  height: "100%",
  width: "100%",
  p: 0,
};

const buttonStyle = {
  color: "#00298E",
  border: "1px solid #00298E",
  //   width: "87px",
  fontSize: "14px",
  fontWeight: "500",
  px: "11px !important",
  py: "7px !important",
};

const InviteModal = (props) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const mobileView = useMediaQuery("(max-width:900px)");
  const { open, handleClose, handleOpen } = props;
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState(window.location.origin);
  const [inviteEmailErrorMsg, setInviteEmailErrorMsg] = useState("");
  const [inviteEmailSuccessMsg, setInviteEmailSuccessMsg] = useState("");
  const accessToken = getAuthToken();
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setInviteEmailErrorMsg("");
  };

  const copyToClipboard = () => {
    createReferral();
  };

  const handleSendInvitation = () => {
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      setError(true);
    } else {
      var sendInvitationOptions = {
        method: "post",
        url: global.config.ROOTURL.prod + "/invite/sendEmail/",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: {
          email: email,
        },
        json: true,
      };
      axios(sendInvitationOptions)
        .then((response) => {
       
          setInviteEmailSuccessMsg("Mail has been sent!");
          successToast(<div>Mail has been sent</div>);
          const timer = setTimeout(() => {
            handleClose();
          }, 2000);
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          if ("email" in error.response.data) {
            setInviteEmailErrorMsg(error.response.data["email"].join(", "));
          }
          if (error?.response?.status == 401) { navigate('/login'); }
        });
    }
  };

  const createReferral = () => {
    var getReferral = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/invite/inviteLink/",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        email: email,
      },
      json: true,
    };
    axios(getReferral)
      .then((response) => {
      
        setReferral(response.data.inviteLink);
        const copyText = document.getElementById("referId");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        handleClose();
      })
      .catch((error) => {
        if ("email" in error.response.data) {
          setInviteEmailErrorMsg(error.response.data["email"].join(", "));
        }
        if (error?.response?.status == 401) {
          clearStorage()
          navigate('/login');
        }
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={mobileView ? styleMobile : style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
          <form style={{ maxWidth: "350px", margin: "auto" }}>
            {error && (
              <Stack sx={{ width: "100%" }}>
                <Alert severity="error">
                  <AlertTitle>
                    {" "}
                    <strong>{errorMessage}</strong>
                  </AlertTitle>
                </Alert>
              </Stack>
            )}
            <img src={Invite} alt="" style={{ width: "100%" }} />
            <Typography
              id="transition-modal-title"
              export="true"
              default
              variant="h6"
              sx={{
                p: 1,
                fontWeight: "600",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Invite your Friends
            </Typography>
            <Typography
              id="transition-modal-title"
              export="true"
              default
              variant="h6"
              sx={{
                p: 1,
                fontWeight: "300",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Send invite to your friends and score 100 runs for every invite sent. When your friend signs up using your referral, you both score additional 1000 runs each.
            </Typography>
            <Box sx={{ width: "310px", margin: "auto" }}>
              <TextField
                id="input-with-icon-textfield"
                sx={{ px: "15px" }}
                placeholder="enter email address"
                disableUnderline
                InputProps={{
                  style: { border: "none" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={handleSendInvitation}
                      >
                        {/* <ArrowCircleRightIcon /> */}
                        <img src={SubmitIcon}></img>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleEmailChange}
              />
            </Box>

            <Box textAlign="center">
              <Grid container spacing={0} sx={{ padding: "20px 20px 20px 10px", }}>
                <Grid item xs={12} sm={12} lg={8}>
                  <input
                    type="text"
                    id="referId"
                    hidden={true}
                    value={referral}
                  />
                  <div className="refer-id"> {referral} </div>
                </Grid>
                <Grid item xs={4} sm={4} lg={4}>
                  <Button
                    variant="outlined"
                    sx={buttonStyle}
                    onClick={copyToClipboard}
                  >
                    Copy URL
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InviteModal;
