import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";
import axios from "axios";
import { CardActions, Typography } from "@mui/material";

// Custom CSS
import "./index.scss";

// Custom Components

// MUI Components
import { Box, Button, Container } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// React-Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";

const SingleEvent = () => {
  const navigate = useNavigate();

  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
  });

  const redirectUser = (url, _id) => {
    // Check if the user is already registered

    // Redirects User
    navigate(`${url}${_id}`);
  };

  const { event_id } = useParams();

  const [event, setEvent] = useState({});

  const editFunCall = (data) => {
    let eventId = data;
    navigate(`/admin/edit-event-admin/${eventId}`);
  };

  const deleteFunCall = (data) => {
    axios
      .delete(`${global.config.ROOTURL.prod}/events/delete/${data}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        if (response) {
          toast.success("event deleted successfully", { theme: "colored" });
          setTimeout((e) => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error("Some error occured", { theme: "colored" });
          console.log("error occured:");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          clearStorage();
          navigate("/login");
        }
      });
  };

  const [jerseyData, setJerseyData] = useState();

  const getJerseyData = () => {
    const jerseyOptions = {
      method: "post",
      url:
        global.config.ROOTURL.prod +
        `/events/userEvent/getUserEventByUserIdAndEventId`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: {
        userId: userId,
        eventId: event_id,
      },
    };

    axios(jerseyOptions)
      .then(({ data }) => {
        console.log(data);
        setJerseyData(data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          toast.error("Some error occured");
        }
      });
  };
  useEffect(() => {
    fetchUserInfo();
    // Fetching all events
    const options = {
      method: "get",
      url: global.config.ROOTURL.prod + `/events/getEventById/${event_id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(options)
      .then(({ data }) => {
        console.log(data);
        setEvent({ ...data });
        console.log(userId, event_id);
        getJerseyData();
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          toast.error("Some error occured");
        }
      });
  }, []);

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }

  const startDate = new Date(`${event.startDate}`).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const endDate = new Date(`${event.endDate}`).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const startTime = formatTime(event.startTime || "13:45");
  const endTime = formatTime(event.endTime || "13:45");

  return (
    <Container className="main-wrapper">
      <Box className="event-image-wrapper">
        <img
          src={event.eventBanner}
          alt="event-banner"
          className="event-image"
        />
      </Box>
      <Box>
        <Typography
          variant="h4"
          textAlign="center"
          fontFamily="Poppins"
          className="event-title"
        >
          {event.eventTitle}
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          fontFamily="Poppins"
          className="event-location"
        >
          {event.eventLocation}
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          fontFamily="Poppins"
          className="event-date"
        >
          {startDate} - {endDate}
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          fontFamily="Poppins"
          className="event-time"
        >
          {startTime} - {endTime}
        </Typography>
        {jerseyData?.length > 0 ? (
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
              marginTop="25px"
              fontSize="20px"
              textAlign="center"
            >
              Your Unique Jeresy Number
            </Typography>
            <Typography
              variant="h4"
              fontWeight={600}
              marginTop="10px"
              marginBottom="10px"
              fontSize="40px"
              textAlign="center"
            >
              {jerseyData[0].uniqueJerseyNo}
            </Typography>
            <Box className="tshirt-svg-wrapper">
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="tshirt-svg"
              >
                <path
                  d="M134.814 23.3329C129.996 14.3224 122.197 7.26587 112.751 3.37023C109.031 1.82175 105.113 0.80078 101.11 0.33694C100.073 0.33694 99.0103 0.103609 97.9733 0.0517578H95.7437H44.2555H42.0259C40.9761 0.0941827 39.9291 0.189364 38.8889 0.33694C31.8337 1.16989 25.0843 3.69599 19.216 7.70002C13.3476 11.7041 8.53413 17.0673 5.18563 23.3329C4.4872 24.6307 3.85552 25.9633 3.29307 27.3255C1.09136 32.6967 -0.0275729 38.45 0.000516011 44.2549V69.999H28.5187V139.998H111.481V69.999H139.999V44.2549C140.021 36.9601 138.24 29.773 134.814 23.3329Z"
                  fill="url(#paint0_linear_1475_462)"
                />
                <path
                  d="M97.973 0L73.8104 36.2958C73.3908 36.9214 72.8237 37.4341 72.159 37.7887C71.4943 38.1432 70.7526 38.3286 69.9993 38.3286C69.246 38.3286 68.5043 38.1432 67.8397 37.7887C67.175 37.4341 66.6079 36.9214 66.1883 36.2958L43.2441 1.89257L44.2552 0H97.9471H97.973Z"
                  fill="url(#paint1_linear_1475_462)"
                />
                <path
                  d="M85.5541 0L69.9987 23.333L54.4434 0H85.5541Z"
                  fill="url(#paint2_linear_1475_462)"
                />
                <path
                  d="M38.8888 0.336914V7.77756C38.8888 11.9031 37.2499 15.8597 34.3328 18.7768C31.4156 21.694 27.459 23.3329 23.3335 23.3329H5.18555C8.53404 17.0673 13.3475 11.704 19.2159 7.7C25.0843 3.69596 31.8336 1.16986 38.8888 0.336914Z"
                  fill="url(#paint3_linear_1475_462)"
                />
                <path
                  d="M134.813 23.3329H116.665C112.539 23.3329 108.583 21.694 105.665 18.7768C102.748 15.8597 101.109 11.9031 101.109 7.77756V0.336914C105.085 0.807843 108.977 1.82869 112.672 3.37021C122.147 7.25071 129.975 14.3089 134.813 23.3329Z"
                  fill="url(#paint4_linear_1475_462)"
                />
                <path
                  d="M59.6304 101.11H49.2601C48.9189 101.112 48.5807 101.046 48.2648 100.917C47.949 100.788 47.6617 100.598 47.4194 100.358L42.2343 95.1729C41.994 94.9307 41.8039 94.6434 41.6749 94.3275C41.5459 94.0116 41.4805 93.6734 41.4825 93.3322V67.4066C41.4805 67.0654 41.5459 66.7272 41.6749 66.4113C41.8039 66.0955 41.994 65.8082 42.2343 65.5659L47.4194 60.3808C47.6617 60.1405 47.949 59.9504 48.2648 59.8214C48.5807 59.6924 48.9189 59.627 49.2601 59.6289H59.6304C59.9716 59.627 60.3098 59.6924 60.6257 59.8214C60.9415 59.9504 61.2288 60.1405 61.4711 60.3808L66.6562 65.5659C66.8965 65.8082 67.0866 66.0955 67.2156 66.4113C67.3446 66.7272 67.41 67.0654 67.4081 67.4066V93.3322C67.41 93.6734 67.3446 94.0116 67.2156 94.3275C67.0866 94.6434 66.8965 94.9307 66.6562 95.1729L61.4711 100.358C61.2288 100.598 60.9415 100.788 60.6257 100.917C60.3098 101.046 59.9716 101.112 59.6304 101.11ZM50.3231 95.9248H58.5674L62.2229 92.2693V68.4696L58.5674 64.8141H50.3231L46.6676 68.4696V92.2693L50.3231 95.9248Z"
                  fill="url(#paint5_linear_1475_462)"
                />
                <path
                  d="M90.7397 101.11H80.3695C80.0283 101.112 79.6901 101.046 79.3742 100.917C79.0583 100.788 78.771 100.598 78.5288 100.358L73.3437 95.1729C73.1034 94.9307 72.9133 94.6434 72.7843 94.3275C72.6553 94.0116 72.5899 93.6734 72.5918 93.3322V67.4066C72.5899 67.0654 72.6553 66.7272 72.7843 66.4113C72.9133 66.0955 73.1034 65.8082 73.3437 65.5659L78.5288 60.3808C78.771 60.1405 79.0583 59.9504 79.3742 59.8214C79.6901 59.6924 80.0283 59.627 80.3695 59.6289H90.7397C91.0809 59.627 91.4192 59.6924 91.7351 59.8214C92.0509 59.9504 92.3382 60.1405 92.5805 60.3808L97.7656 65.5659C98.0059 65.8082 98.196 66.0955 98.325 66.4113C98.454 66.7272 98.5194 67.0654 98.5174 67.4066V93.3322C98.5194 93.6734 98.454 94.0116 98.325 94.3275C98.196 94.6434 98.0059 94.9307 97.7656 95.1729L92.5805 100.358C92.3382 100.598 92.0509 100.788 91.7351 100.917C91.4192 101.046 91.0809 101.112 90.7397 101.11ZM81.4325 95.9248H89.6768L93.3323 92.2693V68.4696L89.6768 64.8141H81.4325L77.777 68.4696V92.2693L81.4325 95.9248Z"
                  fill="url(#paint6_linear_1475_462)"
                />
                <path
                  d="M75.1854 54.4429H64.8152C64.1276 54.4429 63.4682 54.1698 62.982 53.6836C62.4958 53.1974 62.2227 52.538 62.2227 51.8504C62.2227 51.1628 62.4958 50.5034 62.982 50.0172C63.4682 49.531 64.1276 49.2578 64.8152 49.2578H75.1854C75.873 49.2578 76.5325 49.531 77.0187 50.0172C77.5049 50.5034 77.778 51.1628 77.778 51.8504C77.778 52.538 77.5049 53.1974 77.0187 53.6836C76.5325 54.1698 75.873 54.4429 75.1854 54.4429Z"
                  fill="url(#paint7_linear_1475_462)"
                />
                <path
                  d="M111.481 129.628H28.5195V139.998H111.481V129.628Z"
                  fill="url(#paint8_linear_1475_462)"
                />
                <path
                  d="M139.999 59.6289H111.48V69.9991H139.999V59.6289Z"
                  fill="url(#paint9_linear_1475_462)"
                />
                <path
                  d="M139.999 49.2578H111.48V59.628H139.999V49.2578Z"
                  fill="url(#paint10_linear_1475_462)"
                />
                <path
                  d="M28.5181 59.6289H0V69.9991H28.5181V59.6289Z"
                  fill="url(#paint11_linear_1475_462)"
                />
                <path
                  d="M28.5181 49.2578H0V59.628H28.5181V49.2578Z"
                  fill="url(#paint12_linear_1475_462)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1475_462"
                    x1="13.6114"
                    y1="125.091"
                    x2="126.388"
                    y2="12.3146"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#000354" />
                    <stop offset="1" stop-color="#048AD3" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1475_462"
                    x1="43.2441"
                    y1="19.159"
                    x2="97.973"
                    y2="19.159"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1475_462"
                    x1="54.4434"
                    y1="11.6665"
                    x2="85.5541"
                    y2="11.6665"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9D32" />
                    <stop offset="1" stop-color="#FDF5AD" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_1475_462"
                    x1="10.7336"
                    y1="28.8032"
                    x2="39.0444"
                    y2="0.492468"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_1475_462"
                    x1="108.317"
                    y1="21.4403"
                    x2="121.902"
                    y2="7.82941"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_1475_462"
                    x1="40.938"
                    y1="93.8766"
                    x2="67.9525"
                    y2="66.8622"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9D32" />
                    <stop offset="1" stop-color="#FDF5AD" />
                  </linearGradient>
                  <linearGradient
                    id="paint6_linear_1475_462"
                    x1="72.0474"
                    y1="93.8766"
                    x2="99.0619"
                    y2="66.8622"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9D32" />
                    <stop offset="1" stop-color="#FDF5AD" />
                  </linearGradient>
                  <linearGradient
                    id="paint7_linear_1475_462"
                    x1="62.2227"
                    y1="51.8504"
                    x2="77.778"
                    y2="51.8504"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF9D32" />
                    <stop offset="1" stop-color="#FDF5AD" />
                  </linearGradient>
                  <linearGradient
                    id="paint8_linear_1475_462"
                    x1="46.6674"
                    y1="158.146"
                    x2="93.3335"
                    y2="111.48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                  <linearGradient
                    id="paint9_linear_1475_462"
                    x1="116.017"
                    y1="74.5361"
                    x2="135.462"
                    y2="55.0919"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#000354" />
                    <stop offset="1" stop-color="#048AD3" />
                  </linearGradient>
                  <linearGradient
                    id="paint10_linear_1475_462"
                    x1="116.017"
                    y1="64.165"
                    x2="135.462"
                    y2="44.7208"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                  <linearGradient
                    id="paint11_linear_1475_462"
                    x1="4.53698"
                    y1="74.5361"
                    x2="23.9812"
                    y2="55.0919"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#000354" />
                    <stop offset="1" stop-color="#048AD3" />
                  </linearGradient>
                  <linearGradient
                    id="paint12_linear_1475_462"
                    x1="4.53698"
                    y1="64.165"
                    x2="23.9812"
                    y2="44.7208"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#39A9FD" />
                    <stop offset="1" stop-color="#ADF2F2" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
          </Box>
        ) : (
          event.userId !== userId && (
            <Button
              color="primary"
              variant="contained"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
              }}
              onClick={() => {
                navigate(`/event-register/${event._id}`);
              }}
            >
              Register
            </Button>
          )
        )}
        <Typography
          variant="h6"
          textAlign="center"
          fontFamily="Poppins"
          className="event-fees"
        >
          <span style={{ fontWeight: "bold" }}>Registraion Fee:</span> ₹{" "}
          {event.registrationFee}
        </Typography>
        <hr className="hr-single" />
        <div
          dangerouslySetInnerHTML={{ __html: event.eventdescription }}
          textAlign="center"
          className="events-description-wrapper"
        />
        <Box className="single-footer">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            {event.userId === userId && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => editFunCall(event._id)}
              >
                Edit
              </Button>
            )}
            {event.userId === userId && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => deleteFunCall(event._id)}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default SingleEvent;
