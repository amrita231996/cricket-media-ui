import React, { useState, useEffect, useRef } from "react";
import "./index.scss";

// Material UI
import Box from "@material-ui/core/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ SideBarData }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      bgcolor="background.paper"
      p={2}
      flex={1}
      height="100vh"
      sx={{
        display: {
          xs: "block",
          sm: "block",
        },
        position: {
          xs: "absolute",
          sm: "static",
        },
        top: 0,
        left: 0,
        zIndex: 10,
        opacity: 100,
        minHeight: "100vh",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List sx={{ width: "100%" }} component="nav">
          {SideBarData.map((element) => {
            return (
              <Box key={element.section}>
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    pl: {
                      xs: 0,
                      sm: 4,
                    },
                  }}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {element.icon ? (
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    {element.items.map((item) => {
                      return (
                        <Box key={item._id} marginTop={1}>
                          <List component="div" disablePadding>
                            <NavLink
                              to={item.path ? item.path : "/"}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ListItemButton
                                sx={{
                                  pl: {
                                    xs: 2,
                                    sm: 6,
                                  },
                                }}
                              >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            </NavLink>
                          </List>
                        </Box>
                      );
                    })}
                  </Collapse>
                ) : null}
                <Divider />
              </Box>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default AdminSidebar;
