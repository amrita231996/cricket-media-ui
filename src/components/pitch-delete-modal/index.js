import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioBtn from "../radio-button/radioBtn";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const styleDesktop = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function PitchDelete(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [style, setStyle] = useState();
  const {post_id} = props;

  useEffect(() => {
    if (!matches) {
      setStyle(styleMobile);
    } else {
      setStyle(styleDesktop);
    }
  }, [matches]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{}}
          >
            Delete this pitch?
          </Typography>
            
          <div style={{ flexDirection: 'row' }}>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={() => props.handleDeletePost(post_id)}>Yes Sure!</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
