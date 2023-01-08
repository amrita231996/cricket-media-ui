import {
  Grid,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import axios from "axios";
import UploadBtn from "../upload-button/uploadBtn";
import './edit-page.scss';
import { useNavigate } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

const EditPage = (props) => {
  const { } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [state, setState] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState();
  const [isUserInfoApiCall, setIsUserInfoApiCall] = useState(false);

  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const navigate = useNavigate();

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
        setAvatar(response.data.profilePhoto ? response.data.profilePhoto : "")
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

    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let aboutUs = event.target.aboutus.value;
    let state = event.target.state.value;

    let profileData = new FormData();
    profileData.append("aboutMe", aboutUs);
    profileData.append("firstName", firstName);
    profileData.append("lastName", lastName);
    profileData.append("state", state);

    if (avatarFile) {
      profileData.append("uploader", avatarFile);
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
        setAvatar(response.data.profilePhoto ? response.data.profilePhoto : "")
        setState(response.data.state ? response.data.state : "");
        // console.log('response', response.data);
      })
      .then(() => {
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
        localStorage.setItem(
          "full_name",
          firstName + " " + lastName
        );
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("about_me", aboutUs ? aboutUs : " ");
        navigate("/my-profile");
      })
      .catch((error) => {
        if (error?.response?.status == 401) { 
          clearStorage()
          navigate('/login'); }
      });
  };

  useEffect(() => {
    fetchUserInfo();
  });

  return (
    isUserInfoApiCall && <Grid container className="edit_bg_color">
      <Grid item xs={12} sm={12} md={12} className="profile_header_section">
        <label className="edit_profile_label">Edit Profile</label>
      </Grid>
      <form onSubmit={saveProfile}>
        <Grid item xs={12} className="edit_main_bg_color">
          <Grid container spacing={8} style={{ marginLeft: 0 }}>
            <Grid item xs={12} className="profile_avatar_section">
              <UploadBtn
                setAvatar={setAvatar}
                setAvatarFile={setAvatarFile}
                avatar={
                  avatar ? avatar : defaultAvatar
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="First Name"
                id="firstName"
                defaultValue={firstName}
                size="small"
                onChange={(e) => {
                  // console.log('e.target.value', e.target.value);
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
            {/* <Grid item xs={12} sm={12} md={4}>
            <TextField
              label="Email"
              id="outlined-size-small"
              defaultValue={email}
              size="small"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid> */}
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Contact"
                id="conatct"
                defaultValue={contact}
                size="small"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="State"
                id="state"
                defaultValue={state}
                size="small"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={11}>
              <TextField
                label="About Us"
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
        <Grid container columnSpacing={2} className="profile_btn_section">
          <Grid item xs={10} sm={10} md={11}>
          </Grid>
          <Grid item xs={2} sm={2} md={1}>
            <Button
              variant="contained"
              className="profile_btn_save"
              type="submit">Save</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default EditPage;