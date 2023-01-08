import { Grid, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import axios from "axios";
import UploadBtn from "../upload-button/uploadBtn";
import "./edit-page.scss";
import { useNavigate } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

const EditPage = (props) => {
  const {} = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [state, setState] = useState("");
  const [avatar, setAvatar] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUserInfoApiCall, setIsUserInfoApiCall] = useState(false);
  const [profilepic,setprofilepic]=useState(null);

  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const navigate = useNavigate();
  const email = getStorageItem("user_email");

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
        setFirstName(response.data.firstName ? response.data.firstName : "");
        setLastName(response.data.lastName ? response.data.lastName : "");
        setAboutUs(response.data.aboutMe ? response.data.aboutMe : "");
        // setEmail(response.data.email ? response.data.email : "");
        setAvatar(response.data.profilePhoto ? response.data.profilePhoto : "");
        setState(response.data.state ? response.data.state : "");
        setIsUserInfoApiCall(true);
      })
      .catch((error) => {
        if (error?.response?.status == 401) { 
          clearStorage()
          navigate('/login'); }
      });
  };

  const saveProfile = (event) => {
    event.preventDefault();
    // console.log("Testing");
    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let aboutUs = event.target.aboutus.value;
    // setAvatarFile(profilepic);
    // setAvatar(profilepic);

    // let profileData =avatarFile;
    let profileData = new FormData();
    profileData.append("aboutMe", aboutUs);
    profileData.append("firstName", firstName);
    profileData.append("lastName", lastName);

    if (avatarFile) {
      profileData.append("uploader",avatarFile );
    }

    var saveProfileOptions = {
      method: "POST",
      url: global.config.ROOTURL.prod + "/auth/update/",
      data: profileData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(saveProfileOptions)
      .then((response) => {
  
        setFirstName(response.data.firstName ? response.data.firstName : "");
        setLastName(response.data.lastName ? response.data.lastName : "");
        setAboutUs(response.data.aboutMe ? response.data.aboutMe : "");
        // setEmail(response.data.email ? response.data.email : "");
        setAvatar(response.data.profilePhoto ? response.data.profilePhoto : "");
        setState(response.data.state ? response.data.state : "");
      })
      .then(() => {
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
        localStorage.setItem("full_name", firstName + " " + lastName);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("about_me", aboutUs ? aboutUs : " ");
      })
      .then(() => navigate("/my-profile"))
      .catch((error) => {      
        if (error?.response?.status == 401) { navigate('/login'); }
      });
  };

  const onProfilepic=(profilepic)=>{
    setAvatar(profilepic);
    setAvatarFile(profilepic);
  }

  useEffect(() => {
    fetchUserInfo();
   
  }, []);

  return (
    isUserInfoApiCall && (
      <Grid container className="edit_bg_color">
        <Grid item xs={12} sm={12} md={12} className="profile_header_section">
          <label className="edit_profile_label">Edit Profile</label>
        </Grid>
        <form onSubmit={saveProfile} >
          <Grid item xs={12} className="edit-form">
            <Grid container spacing={4} className="form-content-container">
              <Grid item xs={12} className="profile-pic">
                <UploadBtn
                  setAvatar={setAvatar}
                  setAvatarFile={setAvatarFile}
                  avatar={avatar ? avatar : defaultAvatar}
                  onChangeprofilepic={onProfilepic}
                />
              </Grid>
              <Grid item>
                <Grid container spacing={2} sx={{ p: 5 }}>
                  <Grid item xs={12} sm={12} md={4} className="first-name">
                    <TextField
                      label="First Name"
                      id="firstName"
                      defaultValue={firstName}
                      size="small"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      label="Last Name"
                      id="lastName"
                      defaultValue={lastName}
                      size="small"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <TextField
                      label="Email"
                      id="email"
                      defaultValue={email}
                      size="small"
                      disabled
                    />
                  </Grid>
                  {/* <Grid item xs={8} sm={12} md={4}>
                  <TextField
                    label="Contact"
                    id="conatct"
                    defaultValue={contact}
                    size="small"
                    fullWidth
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                </Grid> */}

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      label="About Me"
                      id="aboutus"
                      defaultValue={aboutUs}
                      size="small"
                      multiline
                      fullWidth
                      rows={4}
                      onChange={(e) => {
                        setAboutUs(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="btn-container">
            <Button
              variant="contained"
              className="profile_btn_save"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </form>
      </Grid>
    )
  );
};

export default EditPage;
