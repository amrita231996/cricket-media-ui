import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { IconButton } from "@mui/material";
import Runs from "../../assets/images/icons/post-action.png";
import TwoRuns from "../../assets/images/icons/2run.png";
import FourRuns from "../../assets/images/icons/4run.png";
import SixRuns from "../../assets/images/icons/6run.png";
import { useMediaQuery } from "@mui/material";

import axios from "axios";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { useNavigate } from "react-router-dom";

export default function ScoreRuns(props) {
  const navigate = useNavigate()
  const { postObj } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const accessToken = getStorageItem("token");

  const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
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

  const scorePost = (run) => {
    const addRunOption = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/pitch/run/addRun",
      headers: {
        Authorization: "Bearer " + accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        pitchId: postObj._id,
        givenRun: run,
      },
    }
  
      axios(addRunOption)
        .then(() => {
          setOpen(false);
        })
        .catch((error) => {
          if (error?.response?.status === 401) { 
            clearStorage()
            navigate('/login'); }
        });
  };

  return (
    <div>
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => handleToggle()}
          disableRipple="true"
        >
          <img src={Runs} alt=""/>
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="top-start"
          transition
          disablePortal
          style={{
            zIndex:1
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:  placement === "bottom-start" ? "left top" : "left bottom",
              
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
                      <div>
                          <MenuItem>
                            <IconButton
                              onClick={() => scorePost(6)}
                              disableRipple="true"
                            >
                              <img src={SixRuns} alt=""/>
                            </IconButton>
                          </MenuItem>
                        
                          <MenuItem>
                            <IconButton
                              onClick={() => scorePost(4)}
                              disableRipple="true"
                            >
                              <img src={FourRuns} alt="" />
                            </IconButton>
                          </MenuItem>
                        
                        
                          <MenuItem>
                            <IconButton
                              onClick={() => scorePost(2)}
                              disableRipple="true"
                            >
                              <img src={TwoRuns} alt="" />
                            </IconButton>
                          </MenuItem>
                        
                      </div>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

      </div>
    </div>
  );
}