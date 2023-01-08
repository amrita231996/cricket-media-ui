import React from "react";
import { IconButton } from "@mui/material";
import { List } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Drawer } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { useState } from "react";
import "./index.scss";
import { clearStorage,getStorageItem } from "../../utils/sessionStorage";
import InviteModal from "../../commons/invitation";
const user_Id = getStorageItem("user_id")
const drawerWidth = "70%";

const useStyles = makeStyles((theme) => ({
  drawerRoot: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "white !important",
    borderRadius: "0px 30px 30px 0px",
    border: "1px solid #FFFFFF",
  },
  menuButton: {
    height: "50px",
    width: "50px",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    color: "#00298E",
    textDecoration: "none",
  },
}));

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const handleShowModalOpen = () => {
    setOpen(!open);
    setShowModal(true);
  };
  const handleShowModalClose = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    const accessToken = getAuthToken();
    var logOutOptions = {
      method: "post",
      url: global.config.ROOTURL.prod + "/auth/logout/",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(logOutOptions)
      .then((response) => {
        localStorage.removeItem("token");
        window.localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const list = [
    {
      page: "/jobs",
      label: "Jobs",
    },
    {
      page: "/leader-board",
      label: "Leaderboard",
    },
    {
      page: "/suggestions",
      label: "Suggested profiles to follow",
    },
    {
      page: "/my-profile",
      label: "My Profile",
    },
    {
      page: "/about-us",
      label: "About Us",
    },
    {
      page: "/all-events",
      label: "Events",
    },
  ];

  return (
    <div className={classes.drawerRoot}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List sx={{ pt: 9 }}>
          <ListItem className={classes.link}>
            <div className="avatar">
              <img
                className="avatar-image"
                src={props.userInfo.avatar}
                alt={""}
              />
            </div>
            <Link
                
                to={`/profile/${user_Id}`}
                style={{ textDecoration: "none" }}
              >   <ListItemText
              primary={props.userInfo.firstName + " " + props.userInfo.lastName}
            /></Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          {list &&
            list.map((o, i) => {
              return (
                <Link
                  to={`${o.page}`}
                  className={classes.link}
                  onClick={() => setOpen(!open)}
                >
                  <ListItem button>
                    <ListItemText primary={`${o.label}`} />
                  </ListItem>
                </Link>
              );
            })}
          <ListItem
            button
            className={classes.link}
            onClick={() => handleShowModalOpen()}
          >
            <ListItemText primary={"Invite your friends"} />
          </ListItem>
          <ListItem
            button
            className={classes.link}
            onClick={() => handleLogout()}
          >
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <InviteModal
        open={showModal}
        handleClose={handleShowModalClose}
        handleOpen={handleShowModalOpen}
      />
    </div>
  );
}
