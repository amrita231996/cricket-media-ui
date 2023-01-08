import { React, useState, useEffect, useRef } from "react";
import { makeStyles, styled } from "@mui/styles";
import { InputAdornment, Button, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { CTextField } from "../../../commons/components/mui-c-components";
import { CIcon } from "../../../commons/components/Icon";
import LockIcon from "../../../assets/images/signin-signup/password.svg";
import MailIcon from "../../../assets/images/signin-signup/mail-icon.svg";
import VisibilityIcon from "../../../assets/images/signin-signup/visibility-on-icon.svg";
import VisibilityOffIcon from "../../../assets/images/signin-signup/visibility-off-icon.svg";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import RECAPTCHA from 'react-google-recaptcha';


const pageFontColor = "#FFFFFF";


const useStyles = makeStyles({
  root: {},
  // inputProps: {
  //   color: "black",
  //   borderRadius: 15,
  //   border: 10,
  //   fontSize: 18,
  // },
});


const SubmitButton = styled(Button)({
  background: "#00298E",
  borderRadius: 8,
  color: pageFontColor,
  height: 45,
  fontWeight:600
});

export default function SignUpForm(props) {
  // initialize form error messages
  const [emailErrorMsg, setemailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
  const [confirmpasswordErrorMsg, setconfirmpasswordErrorMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const reRef = useRef();
  localStorage.setItem("uid", props.props.uid);
  localStorage.setItem("inviteKey",props.props.inviteKey)
    const signUpSubmit = async(event) => {

    event.preventDefault();
    const mail = event.target.email.value.toLowerCase();
    const password = event.target.password.value;
    const confirmPassword = event.target.password2.value;

    if (!validator.isEmail(mail)) {
      setErrorMessage("Please enter a valid email");
      setError(true);
      return
    } else if (
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage("Please enter the password");
      setError(true);
      return
    } else if (password !== confirmPassword) {
      setErrorMessage("Password does not match");
      setError(true);
      return
    }

    //...check email exist
    const isMailExistRes = await axios.post(
    `${global.config.ROOTURL.prod}/auth/check-email-exist`,
    {email:event.target.email.value.toLowerCase()}
    );
    if(isMailExistRes.data){
      setErrorMessage("Email Already Exist");
      setError(true);
      return
    }

    //...send otp
    const captchaToken = await reRef.current.executeAsync();
    reRef.current.reset();
    const sendOTPRes = await axios.post(`
    ${global.config.ROOTURL.prod}/auth/sendOTP`,
    {email:mail,captchaToken}
    );

    if(sendOTPRes.status === 200){
      let data = {email:mail,password,captchaToken};
      if(props.props.referral) {
        data.referredUserId = props.props.uid;
        data.secretCode = props.props.inviteKey;
      }
      localStorage.setItem('loginOptionPassword',password);
      navigate("/verification",{state:data});
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if(props.props.referral) {
      setAlertMessage(
        `Welcome to CricketMedia!`
      );
      setAlert(true);
    }
  }, [props.props])
 
  
  return (
    <>
      {alert ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>{alertTitle}</AlertTitle>
              <div>
                {alertMessage}
              </div>
          </Alert>
        </Stack>
      ) : (
        <></>
      )}
      {error && (
        <Stack sx={{ width: "100%",height:20 }} >
         
          <Alert severity="error" sx={{height:30,margin:0,padding:0}}>
            <AlertTitle>
              {" "}
              
            </AlertTitle>
            {errorMessage}
          </Alert>
        </Stack>
      )}

     
      <Box component="form" onSubmit={signUpSubmit}>
        <CTextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          size="small"
          autoFocus
          className={classes.root}
          InputProps={{
         
          }}
        />
        {emailErrorMsg && <p style={{ color: "red" }}> {emailErrorMsg} </p>}
        <CTextField
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type={passwordShown ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          size="small"
          className={classes.root}
          InputProps={{
            className: classes.inputProps,
          
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <CIcon
                    src={passwordShown ? VisibilityOffIcon : VisibilityIcon}
                    fontSize={24}
                    onClick={handleClickShowPassword}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordErrorMsg && (
          <p style={{ color: "red" }}> {passwordErrorMsg} </p>
        )}
        <CTextField
          margin="normal"
          required
          fullWidth
          name="password2"
          placeholder="Confirm password"
          type={passwordShown ? "text" : "password"}
          id="password2"
          size="small"
          autoComplete="current-password"
          className={classes.root}
          InputProps={{
            className: classes.inputProps,
           
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <CIcon
                    src={passwordShown ? VisibilityOffIcon : VisibilityIcon}
                    fontSize={24}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {confirmpasswordErrorMsg && (
          <p style={{ color: "red" }}> {confirmpasswordErrorMsg} </p>
        )}
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: 18 }}
        >
          Send OTP
        </SubmitButton>


      </Box>
      <Box sx={{marginLeft:6}}>

      <RECAPTCHA 
      sitekey={global.config.RECAPTCHA_PUBLIC_SITE_KEY}  
      size="invisible"
      ref={reRef}
      badge="inline"
     />
     <p style={{fontSize:12,fontWeight:"400",color:'#929292',marginTop:19,marginLeft:-25}}>By Signing Up, you agree to our terms and privacy policy. </p>
      </Box>
    </>
  );
}
