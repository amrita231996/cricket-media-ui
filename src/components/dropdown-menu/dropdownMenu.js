import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PitchEdit from "../pitch-edit-modal/index";
import PitchDelete from "../pitch-delete-modal/index";
import Report from "../report-modal/index";

import axios from "axios";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DropdownMenu(props) {
  const navigate = useNavigate()
  const { postId, userId, content, 
    image, sharedContent, sharedDetail, postObj, setPostObj,pageLoad } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [ownPost, setOwnPost] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openPitchEditModal, setOpenPitchEditModal] = React.useState(false);
  const [openPitchDeleteModal, setOpenPitchDeleteModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenPitchEditModal = () => setOpenModal(true);
  const handleClosePitchEditModal = () => setOpenPitchEditModal(false);
  const handleOpenPitchDeleteModal = () => setOpenModal(true);
  const handleClosePitchDeleteModal = () =>{
    console.log("yes") 
    setOpenPitchDeleteModal(false);
  }
  const accessToken = getStorageItem("token");
  const [sharedPost, setSharedPost] = React.useState(false);


  useEffect(()=>{},[open])

  const handleToggle = (userId) => {
    // // console.log(sharedContent)
    // // console.log(sharedPost)
    setOwnPost(getStorageItem('user_id') === userId);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    console.log(anchorRef,event)
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    console.log(open)
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  const handleUpdatePost = (postId, newContent, newImage, sharedbyUserId) => {
    // let pitchData = new FormData();
    // pitchData.append("postMessage", newContent);
    // pitchData.append("id", postId);
    // if (newImage) { pitchData.append("uploader", newImage) };

    //...now image/video is not added in edit popup
    //once add will add that code and remove above code
    let pitchData = {id:postId,postMessage:newContent};

    const updatePostDetailsOptions = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/update",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: pitchData,
    };
    axios(updatePostDetailsOptions)
      .then((response) => {
        props.pageLoad()
        handleClosePitchEditModal();
      })
      .catch((error) => {
        if (error?.response?.status === 401) { 
          clearStorage()
          navigate('/login'); }
      });
  }

  const handleUpdateSharedPost = (postId, newContent, newImage) => {
    // let pitchData = new FormData();
    //   pitchData.append("updatedSharedText", newContent);
    //   pitchData.append("id", postId);
    //   pitchData.append("sharedbyUserId", userId)

    let pitchData = {
      "updatedSharedText": newContent,
      "feedId": postId,
      "sharedbyUserId": sharedDetail.userId
    }

    if (newImage) { pitchData.append("uploader", newImage) };

    var UpdateSharedPost = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/update-shared-feed",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: pitchData,
    };
    axios(UpdateSharedPost)
      .then((response) => {
        handleClosePitchEditModal();
      })
      .catch((error) => {
        if (error?.response?.status === 401) { 
          clearStorage()
          navigate('/login'); }
      });

  }


  const handleDeletePost = () => {
    console.log("in")
    var deletePostOptions = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/feed/delete",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        id: postId
      },
    };
    axios(deletePostOptions)
      .then((response) => {
        console.log('fullin')
        pageLoad();
        handleClosePitchDeleteModal()
      })
      .catch((error) => {
        if (error?.response?.status === 401) { 
          clearStorage()
          navigate('/login'); }
      });
  }

  React.useEffect(() => {
    if (sharedDetail != undefined) {
      setSharedPost(true);
    }
  }, [])

  const handleReportPost = (reportType) => {

    var reportOptions = {
      method: "post",
      url: global.config.ROOTURL.prod + "/pitch/report/create",
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        "pitchId": postId,
        "reportText": reportType,
      },
      json: true
    };
    console.log('reportOptions',reportOptions);
    axios(reportOptions)
      .then((response) => {
        pageLoad(); 
        handleCloseModal(); 
      })
      .catch((error) => {
        if (error?.response?.status === 401) { 
          clearStorage()
          navigate('/login'); }
      });
  }
  const handleEdit = (postId) => {
    setOpenPitchEditModal(true);
  };

  const handleDelete = (event) => {
    console.log(event)
    handleClose(event);
    setOpenPitchDeleteModal(true);
  };

  const handleReport = (event) => {
    handleClose(event);
    setOpenModal(true);

  };

  return (
    <div>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => handleToggle(userId)}
          disableRipple="true"
        >
          <MoreVertIcon style={{ color: "black" }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {props.type === "post-menu" && (
                      <div>
                        {ownPost &&
                          <MenuItem onClick={() => handleEdit(postId)} open={"false"}>
                            Edit
                          </MenuItem>
                        }
                        {ownPost &&
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        }
                        {!ownPost &&
                          <MenuItem onClick={handleReport}>Report</MenuItem>
                        }
                      </div>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <PitchEdit
        handleOpen={handleOpenPitchEditModal}
        handleClose={handleClosePitchEditModal}
        handleUpdatePost={handleUpdatePost}
        handleUpdateSharedPost={handleUpdateSharedPost}
        setPostObj={setPostObj}
        postObj={postObj}
        open={openPitchEditModal}
        content={sharedDetail ? sharedDetail.sharedText : content}
        image={image}
        postId={postId}
        sharedPost={sharedPost}
        pageLoad={props.hprops}
      />
      <PitchDelete handleOpen={handleOpenPitchDeleteModal}
        handleClose={handleClosePitchDeleteModal}
        open={openPitchDeleteModal}
        handleDeletePost={handleDeletePost}
        postId={postId}
      />
      <Report handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        open={openModal}
        handleReportPost={handleReportPost}
        postId={postId}
      />
    </div>
  );
}