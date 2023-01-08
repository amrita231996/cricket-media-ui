import {
    Fade,
    Modal,
    Box,
    Backdrop,
  } from "@mui/material";
  import IconButton from "@mui/material/IconButton";
  import CloseIcon from "@mui/icons-material/Close";
  import defaultAvatar from "../../../assets/images/profile/default_avatar.png";
  import { useMediaQuery } from "@mui/material";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 625,
    bgcolor: "transparent",
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
  
  const ImageModal = (props) => {
    const mobileView = useMediaQuery("(max-width:900px)");
    const { open, handleClose } = props;  
    const handleModalClose = () => {
      handleClose();
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
        sx={{overflow:'scroll'}}
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
            <div>
                <img src={props.avatar ? props.avatar : defaultAvatar} style={{width:"100%", height:"100%"}}>
                </img>
            </div>
          </Box>
        </Fade>
      </Modal>
    );
  };
  
  export default ImageModal;
  