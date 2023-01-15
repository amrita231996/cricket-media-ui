import axios from "axios";
import React, { useState, useEffect, useRef} from "react";
import { Alert } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import LogoWithTitle from '../../signin-signup/logo.component';
import Button from '@mui/material/Button';
import "./verification.scss";

const Verification = (props) => {
    const [verificationText1, setVerificationText1] = useState('');
    const [verificationText2, setVerificationText2] = useState('');
    const [verificationText3, setVerificationText3] = useState('');
    const [verificationText4, setVerificationText4] = useState('');
    const [disableRegisterBtn, setDisableRegisterBtn] = useState(true);
    const [timer, setTimer] = useState(0);
    const [disableResend, setdisableResend] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const inputReference1 = useRef(null);
    const inputReference2 = useRef(null);
    const inputReference3 = useRef(null);
    const inputReference4 = useRef(null);
    useEffect(() => {

        const startTime = () => {
            setTimer(30);
            const myInterval = setInterval(() => {
                setTimer((prevCounter) => prevCounter - 1);

            }, 1000);
            setTimeout(() => {
                setdisableResend(true);
                clearInterval(myInterval)
            }, 30000)

        }
        if (!disableResend) {
            console.log('someonne calling')
            startTime();
        }
    }, [disableResend])
    useEffect(() => {
        const verifyOTP = async (isAllTextField) => {
            if (!isAllTextField) {
                console.log('hello', parseInt(`${verificationText1.trim()}${verificationText2.trim()}${verificationText3.trim()}${verificationText4.trim()}`));
                const sendOTPRes = await axios.post(`
                ${global.config.ROOTURL.prod}/auth/verifyOTP`,
                    {
                        email: state.email, otp:
                            parseInt(`${verificationText1.trim()}${verificationText2.trim()}${verificationText3.trim()}${verificationText4.trim()}`)
                    }
                );
                console.log('sendOTPRes.data', sendOTPRes.data);
                if (sendOTPRes.data) {
                    setDisableRegisterBtn(false);
                  
                } else {
                    setDisableRegisterBtn(true);
                    setErrorMessage("OTP is wrong!");
                    inputReference1.current.focus();
                    
                }
            }

        }
        verifyOTP(!(
            verificationText1.trim().length === 1
            && verificationText2.trim().length === 1
            && verificationText3.trim().length === 1
            && verificationText4.trim().length === 1
        ));
      
    }, [state.email, verificationText1, verificationText2, verificationText3, verificationText4]);

    const loginSubmit = () => {
        const option = {
            email: state.email,
            password: state.password,
        };

        var loginOptions = {
            method: "post",
            url: global.config.ROOTURL.prod + "/auth/login/",

            data: JSON.stringify(option),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            json: true,
        };
        console.log('loginOptions', loginOptions);
        axios(loginOptions)
            .then((response) => {
                console.log('loginOptions0000', response.data);
                if (response.data.data.match) {
                    localStorage.setItem("token", response.data.data.token);
                    localStorage.setItem("user_id", response.data.data.payload.id);
                    localStorage.setItem("user_email", response.data.data.payload.email);
                    navigate("/onboarding");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onRegisterClick = async () => {
        let option = JSON.parse(JSON.stringify(state));
        option.otp = parseInt(`${verificationText1.trim()}${verificationText2.trim()}${verificationText3.trim()}${verificationText4.trim()}`);
        const sendOTPRes = await axios.post(`
        ${global.config.ROOTURL.prod}/auth/sign-up`,
            option
        );
        console.log('sendOTPRes.data', sendOTPRes.data);
        if (sendOTPRes.data.data === "email exist") {
            setErrorMessage("Email already exists");
        }
        if (sendOTPRes.status === 200 && sendOTPRes.data.data.email) {
            setVerificationText1('');
            setVerificationText2('');
            setVerificationText3('');
            setVerificationText4('');
            loginSubmit();
        }
    }

    const resendOTP = async (e) => {
        setdisableResend(false)
        // navigate("javascript(void)");
        // console.log("repeat", disabled)
        e.preventDefault();
        axios.post(`
        ${global.config.ROOTURL.prod}/auth/reSendOTP`,
            { email: state.email, captchaToken: state.captchaToken }
        );
        setErrorMessage('resend')
        return false;
    }
    

    return (
        <div className="banner1">
            <div className="form1">
                <div className="heading">
                    <div>
                        <LogoWithTitle fontSize={"120"} />
                    </div>
                    {errorMessage.length > 0 && <Alert severity="error">
                        {errorMessage}
                    </Alert>}
                    <h1 className="head">Verification Code</h1>
                    <div><p className="p1">We sent you code on given Email Id to</p>
                        <p>verify your account</p>
                    </div>
                </div>
                <div className="gmail">
                    <p>{state.email}</p>
                </div>
                <div className="userinput">
                    <input
                        ref={inputReference1}
                        className={`inputFiled ${verificationText1.length === 1 ? '' : 'required'}`}
                        type="text" pattern="[0-9]*" 
                        inputMode="numeric"
                        maxLength="1"
                        onChange={(e) => {
                            setVerificationText1(e.target.value);
                            inputReference2.current.focus();
                        }}
                        autoFocus={true}
                    />
                    <input
                         ref={inputReference2}
                        className={`inputFiled ${verificationText2.length === 1 ? '' : 'required'}`}
                        type="text" pattern="[0-9]*" inputmode="numeric"
                        maxLength="1"
                        onChange={(e) => {
                            setVerificationText2(e.target.value);
                            inputReference3.current.focus();
                        }}
                        
                    />
                    <input
                        ref={inputReference3}
                        className={`inputFiled ${verificationText3.length === 1 ? '' : 'required'}`}
                        type="text" pattern="[0-9]*" inputmode="numeric"
                        maxLength="1"
                        onChange={(e) => {
                            setVerificationText3(e.target.value);
                            inputReference4.current.focus();
                        }}
                        
                    />
                    <input
                        ref={inputReference4}
                        className={`inputFiled ${verificationText4.length === 1 ? '' : 'required'}`}
                        type="text" pattern="[0-9]*" inputmode="numeric"
                        maxLength="1"
                        onChange={(e) => {
                            setVerificationText4(e.target.value);
                            

                            
                        }}
                       
                    />
                </div>
                <div className="time">
                    <p className="count1"><span style={{ color: 'blue' }}>{timer}</span> Seconds </p>
                </div>

                <div className="b1">
                    <button
                        className={`registerBtn ${disableRegisterBtn ? 'disabled' : ''}`}
                        onClick={onRegisterClick}
                        disabled={disableRegisterBtn}>Register </button>
                </div>
                <p className="s1">
                    Didn’t Receive The OTP ? <Button disabled={!disableResend} onClick={resendOTP}>Resend  </Button></p>


            </div>
        </div>






    );
};
export default Verification