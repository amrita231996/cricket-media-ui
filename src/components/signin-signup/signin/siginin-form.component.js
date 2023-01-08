import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, styled } from "@mui/styles";
import Styled from "@emotion/styled";
import { InputAdornment, Button, Box } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  CTextField,
  CFormControlLabel,
  CCheckbox,
} from "../../../commons/components/mui-c-components";
import { CIcon } from "../../../commons/components/Icon";
import UserIcon from "../../../assets/images/signin-signup/user.svg";
import LockIcon from "../../../assets/images/signin-signup/password.svg";
// import GoogleIcon from '../../../assets/images/signin-signup/google.svg';
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import validator from "validator";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import sagaActions from '../../../redux/actions'
import { getAuthStatus } from "../../../utils/auth";

const pageFontColor = "white";

const LogInWith = Styled.div(`
    display: flex;
    flex-direction: column;
    align-items: center;
`);

const useStyles = makeStyles({
  root: {},
  inputProps: {
    color: "black",
    borderRadius: 15,
    border: 10,
    fontSize: 18,
  },
});

const FgPassContainer = Styled.div(`
    marging: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 5px;
`);

const FgPass = Styled.a(
  ({ align }) => `
    font-size: 15px;
    color: black;
    margin: 10px;
    cursor: pointer;
    text-decoration: none;
    text-align:${align || "left"}
`
);

const InfoLabel = Styled.p(`
    font-size: 15px;
    color: black;
    margin: 0;
    margin-bottom: 15px;
`);

const SubmitButton = styled(Button)({
  background: "#00298E",
  borderRadius: 8,
  color: pageFontColor,
  height: 45,
  fontWeight: 600
});

export default function SignInForm({ breakPoint }) {
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const [authenticatedFailedMsg, setauthenticatedFailedMsg] = useState("");
  // const [userActivationMsg, setUserActivationMsg] = useState('');
  const [cookies, setCookie] = useCookies(["user"]);
  const { state } = useLocation();
  // const { activationMsg } = state;
  // call login api
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login)
  const { loginData } = login


  var initialValues = {
    userid: "",
    password: "",
  };
  if (
    cookies.hasOwnProperty("username") &&
    cookies.hasOwnProperty("password")
  ) {
    initialValues = {
      userid: cookies["username"],
      password: cookies["password"],
    };
  }

  useEffect(() => {
    if (loginData?.data) {
      if (loginData?.data?.message === "User not exist") {
        setErrorMessage("User does not exist");
        setAlert(true);
      } else if (!loginData?.data?.match) {
        setErrorMessage("Incorrect email or password");
        setAlert(true);
      } else if (loginData?.data?.match) {
        if (
          loginData?.data.payload.firstName == undefined ||
          loginData?.data.payload.lastName == "undefined" ||
          loginData?.data.payload.firstName == null ||
          loginData?.data.payload.lastName == "null"
        ) {
          navigate("/onboarding");
        } else if (getAuthStatus()) {
          navigate("/feed");
        }
      }
    }
  }, [loginData])

  const loginSubmit = (event) => {
    event.preventDefault();
    const isRemember = event.target.remember.checked;
    const data = {
      username: event.target.userid.value.toLowerCase(),
      password: event.target.password.value,
    };

    const handle = () => {
      setCookie("username", data["username"], { path: "/" });
      setCookie("password", data["password"], { path: "/" });
    };
    if (isRemember) {
      handle();
    }

    if (validator.isEmail(data["username"])) {
      data["email"] = data["username"];
      delete data["username"];
    }
    dispatch({
      type: sagaActions.LOGIN_DATA_FETCH,
      payload: {
        data: data,
      }
    })
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 5000);
  // }, [alert]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  // api call end
  return (
    <>
      {alert ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {/* <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                — <strong></strong>
            </Alert> */}
          <Alert severity="error">
            <AlertTitle>
              <strong>
                Error
              </strong>
            </AlertTitle>
            {errorMessage}

          </Alert>
        </Stack>
      ) : (
        <></>
      )}
      <Box component="form" onSubmit={loginSubmit} noValidate>
        <CTextField
          defaultValue={initialValues.userid}
          margin="normal"
          required
          fullWidth
          id="userid"
          name="userid"
          placeholder="Email Address"
          autoFocus
          className={classes.root}
          InputProps={{
         
          }}
        />
        <CTextField
          defaultValue={initialValues.password}
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          className={classes.root}
          onChange={() => setAlert(false)}
          InputProps={{
            className: classes.inputProps,
          
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <CFormControlLabel
            control={
              <CCheckbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleOutlineRoundedIcon />}
              />
            }
            label="Remember me"
            name="remember"
          />
          {breakPoint ? (
            <FgPass href="/reset-pwd">Forgot password ?</FgPass>
          ) : null}
        </div>
        {authenticatedFailedMsg && (
          <p style={{ color: "red" }}> {authenticatedFailedMsg} </p>
        )}
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: 18 }}
        >
          Login
        </SubmitButton>
        {!breakPoint ? (
          <FgPassContainer>
            <FgPass href="/reset-pwd" align={"center"}>
              Forgot password ?
            </FgPass>
          </FgPassContainer>
        ) : null}
      </Box>{" "}
    </>
  );
}
