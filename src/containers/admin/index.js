import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import { Outlet } from "react-router-dom";

// Material UI
import Box from "@material-ui/core/Box";
import { EventAvailable } from "@material-ui/icons";
import Stack from "@mui/material/Stack";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from '@mui/icons-material/Close';

// Components
import AdminSidebar from "../../components/admin-sidebar";

const AdminDashboard = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const userName = getStorageItem("user_name");
  const avatar = getStorageItem("avatar");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    role: "",
  });

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
      .then((response) => {
        if(response.data.role !== "SuperAdmin" && response.data.role !== "Admin") {
          navigate("/feed");
        }
        setUserInfo({
          firstName: response.data.firstName
            ? response.data.PollsIconfirstName
            : "",
          lastName: response.data.lastName ? response.data.lastName : "",
          avatar: response.data.profilePhoto
            ? response.data.profilePhoto
            : defaultAvatar,
          role: response.data.role ? response.data.role : null
        });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const SideBarData = [
    {
      section: 1,
      name: "Events",
      icon: <EmojiEventsIcon />,
      items: [
        {
          _id: 1,
          name: "Find All",
          icon: <EventAvailable />,
          path: "/admin/find-all-events",
        },
        {
          _id: 2,
          name: "Find One",
          icon: <SearchIcon />,
          path: "/admin/find-event",
        },
        {
          _id: 3,
          name: "Create",
          icon: <AddIcon />,
          path: "/admin/create-event",
        },
        {
          _id: 4,
          name: "Update",
          icon: <UpgradeIcon />,
          path: "/admin/edit-event-admin",
        },
        {
          _id: 5,
          name: "Delete",
          icon: <DeleteOutlineIcon />,
          path: "/admin/delete-event",
        },
      ],
    },
  ];

  useEffect(() => {
    fetchUserInfo();
  },[]);

  const [showSidebar, setShowSidebar] = useState(true);
  const openSideBar = () => {
    setShowSidebar(true);
  };
  const closeSideBar = () => {
    setShowSidebar(false);
  };
  const menuRef = useRef();
  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!menuRef.current.contains(e.target)) {
  //       setShowSidebar(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });
  return (
    <Stack direction="row" spacing="2" justifyContent="space-between">
      {showSidebar ? (
        <Box ref={menuRef}>
          <AdminSidebar SideBarData={SideBarData} />
        </Box>
      ) : null}
      <Box p={2} flex={5} sx={{ position: "relative" }}>
        <Box>
          {!showSidebar ? (
            <DehazeIcon
              sx={{
                position: "absolute",
                right: "20px",
                top: "21px",
                cursor: "pointer",
              }}
              onClick={openSideBar}
            />
          ) : (
            <CloseIcon
              sx={{
                position: "absolute",
                right: "20px",
                top: "21px",
                cursor: "pointer",
              }}
              onClick={closeSideBar}
            />
          )}
        </Box>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AdminDashboard;
