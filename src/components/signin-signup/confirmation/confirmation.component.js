import React, { useState } from "react";
import Styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from '@mui/material';
import LogoWithTitle from '../logo.component';
import OTP from './otp';

import SignInSignUpPageHOC from '../signin-signup-page-hoc'
import CricketMediaButton from "../../../commons/form/button";

const RegisterHere = Styled.div(`
    width: 80%;
    max-width: 300px;
    margin: 20px auto 5px auto;
    padding: 10px 20px;
    border-radius: 20px;
    background: black;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
`);


const HeaderLabel = Styled.h1(({ align }) => `
    font-size: 40px;
    color: #FFFFFF;
    margin: 0;
    text-align:${align || 'left'}
`);

const InfoLabel = Styled.p(({ align }) => `
    font-size: 15px;
    color: #FFFFFF;
    margin: 25px 0;
    text-align:${align || 'left'}
`);


export default function SignUp() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [disabled, setDisabled] = useState(true);

    const handleVerify = (enteredOTP) => {
        setDisabled(false);
    }

    return (
        <SignInSignUpPageHOC matches={matches}>
            <>
                <LogoWithTitle />
                <HeaderLabel align={matches ? 'center' : 'left'}>Enter OTP</HeaderLabel>
                <InfoLabel align={matches ? 'center' : 'left'}>Please enter the OTP sent to your email id - somename@somemail.com</InfoLabel>
                <OTP handleVerify={handleVerify} />
                <InfoLabel align={matches ? 'center' : 'left'}>Didn't receive OTP ? Resend</InfoLabel>
                <CricketMediaButton
                    parentClass='otp-button'
                    label='Verify'
                    type='primary'
                    disabled={disabled}
                />
                <InfoLabel align={matches ? 'center' : 'left'}>Keep this window open while you retrieve your secret code. Please check your inbox and spam folder.</InfoLabel>
                <RegisterHere>
                    <span>
                        Existing user ? <Link href="/login" style={{ textDecoration: 'none' }}>&nbsp;Login here</Link>
                    </span>
                </RegisterHere>
            </>
        </SignInSignUpPageHOC>
    );
}