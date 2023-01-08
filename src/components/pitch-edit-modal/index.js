import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RadioBtn from "../radio-button/radioBtn";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import "./index.scss"

const styleDesktop = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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

export default function FeedEdit(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const {postId, content, image, postObj} = props;
  const [newContent, setNewContent] = React.useState();
  const [style, setStyle] = useState();

  useEffect(() => {
    setNewContent(content)
    if (!matches) {
      setStyle(styleMobile);
    } else {
      setStyle(styleDesktop);
    }
  }, [matches]);


  const handleClick = (postId, newContent) => {
    if(props.sharedPost) {
      props.handleUpdateSharedPost(postId, newContent)
      props.setPostObj({...postObj, sharedDetail: {...postObj.sharedDetail, sharedText: newContent}});
      props.pageLoad()

    } else {
      props.handleUpdatePost(postId, newContent)
      props.setPostObj({...postObj, postMessage: newContent});

    }
  }

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
            sx={{}}>
            Edit Feed
          </Typography>
          <div style={{ flexDirection: 'row' }}>
            <TextField value={newContent} fullWidth 
              multiline
              rows={2}
              maxRows={4}
             onInput={e => setNewContent(e.target.value)}className="inputMaterial"  type="text" required/>
            {/* <img className="post-image" src={image} alt="" /> */}
          </div>
          <div style={{ flexDirection: 'row' }}>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button onClick={() => handleClick(postId, newContent)}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
