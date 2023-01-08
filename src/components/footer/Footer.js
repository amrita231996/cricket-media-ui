import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { ReactComponent as FeedIcon } from "../../assets/images/footer/feed-icon.svg";
import { ReactComponent as PostIcon } from "../../assets/images/footer/post-icon.svg";
import { ReactComponent as Bell } from "../../assets/images/icons/Notification.svg";
import { ReactComponent as NewBell } from "../../assets/images/icons/Notification_unread.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HeaderMenu from "../header-menu";
import "./index.scss";
import Drawer from "../side-drawer/Drawer";
import { ReactComponent as Friend } from '../../assets/images/home/friend.svg';
import InviteModal from '../../commons/invitation';
import PostModal from "../../commons/components/post-modal/PostModal";
import { getStorageItem } from '../../utils/sessionStorage';
import axios from 'axios';
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import { useSelector } from "react-redux";


const Footer = (props) => {
  const [value, setValue] = React.useState('Feed');
  const [activeNotificationsCount, setActiveNotificationsCount] = useState(0);
  const ref = React.useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); props.hprops(); };
  const [userInfo, setUserInfo] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const path=useSelector((state)=>state.path.path);
  const handleShowModalOpen = () => { 
    setShowModal(true);
  }
  const handleShowModalClose = () => {
    setShowModal(false);
  };

  if (props.setURL) {
    props.setURL(window.location.pathname);
  }


  const styles = {
    root: {
      color: "black",
    },
    selected: {
      color: "white",
    },
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
          firstName: response.data.firstName ? response.data.firstName : "",
          lastName: response.data.lastName ? response.data.lastName : "",
          avatar: response.data.profilePhoto
            ? response.data.profilePhoto
            : defaultAvatar,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchUserInfo();
  }, []);



  useEffect(()=>{

   
    if(path==='/feed'){
      setValue('Feed')
    }else if(path==='/deals'){
      setValue('deal')
    }else if(path==='/notification'){
      setValue('notification')
    }else{
      setValue(null)
    }
  },[path])
  

 

  

  useEffect(() => {
    global.config.socketInstance.on('onNewNotification', async (updatedValue) => {
        try {
            if (updatedValue.userId === userId) {
                //....
                setActiveNotificationsCount(activeNotificationsCount + 1);
            }
        } catch (err) {
            console.log('error on run change', err);
        }
    });
  }, []);


  return (
    <div>
    

      <Box sx={{ pb: 7 }} ref={ref} className="footer">
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, color: "black" }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            // onChange={handleChange}
            sx={{
              justifyContent: "normal",
              overflow: "overlay",
              "& .MuiBottomNavigationAction-root, svg path": {
                fill: "grey",
              },
              "& .Mui-selected, .Mui-selected svg path": {
                color: "#00298E" || "#25294a",
                fill: "#00298E" || "#25294a",
              },
            }}
          >
            <BottomNavigationAction
              label="Feed"
              value='Feed'
              component={Link}
              to="/feed"
              icon={<FeedIcon style={{ height: "25px", width: "25px" }} />}
             
            ></BottomNavigationAction>
             {/* {props.handlePostClick && ( */}
              <BottomNavigationAction
                label="Post"
               
                // component={Button}
                onClick={() => {
                  handleOpen();
                }}
                icon={<PostIcon style={{ height: "25px", width: "25px" }} />}
              >
                <NavLink to="/deals" />
              </BottomNavigationAction>
          
            <BottomNavigationAction
              label="Notification"
              value='notification'
              component={Link}
              to="/notification"
              icon={activeNotificationsCount > 0 ?
                <NewBell style={{ height: "20px", width: "20px", marginBottom:"5px" }}/> 
                :
                <Bell style={{ height: "20px", width: "20px", marginBottom:"5px" }}/>
              }
             
              />
              {/* <BottomNavigationAction
              onClick={() => {
                props.handlePostClick();
              }}
              icon={ 
                <img style={{ height: "25px", width: "25px" }} src={PostIcon} />
              }
              >
              <NavLink to="/deals" />
            </BottomNavigationAction> */}
            <Box sx={{padding: "6px 12px 8px", minWidth: "80px", maxWidth: "168px", flex:"1", display:"inline-flex", justifyContent: "center"}}>
              <Drawer userInfo={userInfo} ></Drawer>
              <InviteModal
                open={showModal}
                handleClose={handleShowModalClose}
                handleOpen={handleShowModalOpen}
              />
            </Box>
          </BottomNavigation>
        </Paper>
      </Box>
      <PostModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default Footer;
