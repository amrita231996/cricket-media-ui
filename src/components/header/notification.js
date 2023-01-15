import { useEffect, useState } from "react";
import axios from "axios";
import Bell from "../../assets/images/header/bell.svg";
import NewBell from "../../assets/images/header/new_notification.png";
import { useNavigate } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import { ClickAwayListener } from "@mui/material";

const Notification = () => {
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const [custNotifications, setcustNotifications] = useState([]);
  const [activeNotificationsCount, setActiveNotificationsCount] = useState(0);
  const [bellIconClickCss, setBellIconClickCss] = useState("");
  const navigate = useNavigate();


  const fetchNotification = () => {
    const options = {
      method: "GET",
      url: `${global.config.ROOTURL.prod}/notification/get-top-10/${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(options)
      .then((response) => {
        setcustNotifications(response.data.top10Notifications);
        setActiveNotificationsCount(response.data.activeNotificationsCount);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const updateAllNotificationTillDate = () => {
    const options = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/notification/updateAfterSeenByUserId",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      data: {userId},
    };
    axios(options)
      .then((response) => {
        fetchNotification();
    });
  };

  return (
    <div className="notification">
      <a href="javascript:void(0)">
        <ClickAwayListener onClickAway={() => {setBellIconClickCss("")}}>
          <div
            className={`notBtn ${bellIconClickCss}`}
            onClick={() => {
              const clickcss = bellIconClickCss === "" ? "bellIconCick" : "";
              setBellIconClickCss(clickcss);
            }}
          >
            {activeNotificationsCount > 0 ? (
              <img
                src={NewBell}
                alt=""
                className="fas fa-bell new-notification"
                onClick={() => updateAllNotificationTillDate()}
              />
            ) : (
              <img
                src={Bell}
                alt=""
                className="fas fa-bell"
                onClick={() => updateAllNotificationTillDate()}
              />
            )}
          </div>
        </ClickAwayListener>
      </a>
    </div>
  );
};

export default Notification;
