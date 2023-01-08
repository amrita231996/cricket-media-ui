import React from "react";
import Styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from '@mui/material';

import LogoWithTitle from '../logo.component';
import SignUpForm from './siginup-form.component';
import { InputAdornment, Button, Box } from "@mui/material";
import SignInSignUpPageHOC from '../signin-signup-page-hoc'
import { useNavigate } from "react-router-dom";

const RegisterHere = Styled.div(`
    width: 80%;
    max-width: 300px;
    margin: 38px auto 5px auto;
    padding: 10px 20px;
    border-radius: 20px;
    // background: white;
    font-size: 15px;
    color: black;
    text-align: center;
`);
const Button1 = Styled.div(
    `    width: 365px;
    height: 38px;
    font-size: 18px;
    border-radius: 20px;
    background: linear-gradient(270deg,#c8256c 3.05%,#f33130);
    color: white;
    margin-left: -54px;
    margin-top: 5px;
    padding:7px 6px;
    cursor: pointer;`
);

const HeaderLabel = Styled.h1(({ align }) => `
    font-size: 24px;
    font-weight:600;
    color: black;
    margin: 0;
    text-align:${align || 'left'};
    font-family:'Poppins';
`);

const InfoLabel = Styled.p(({ align }) => `
    font-size: 15px;
    color: black;
    margin: 0;
    margin-bottom: 15px;
    text-align:${align || 'left'}
`);
const SignupRegister = Styled.div(`
width: 87%;
max-width: 300px;
margin: 10px auto 5px auto;
padding: 10px 20px;
//margin: 20px auto 5px auto;
//padding: 10px 20px;
border-radius: 20px;
background: white;
font-size: 13px;
color: black;
text-align: center;
`);

export default function SignUp(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <SignInSignUpPageHOC matches={matches} props={props}>
            <>
                {!props.custClassName && <LogoWithTitle fontSize={"120"} />}
                <HeaderLabel align={matches ? 'center' : 'left'}>Create An Account</HeaderLabel>
                { }
                <SignUpForm breakPoint={matches} props={props} />

                {/*window.location.href === 'http://localhost:3000/'

                    ?
                    <RegisterHere>
                        <div><h3 style={{ fontSize: 16, fontWeight: 400 }}>   Already have an account? </h3></div>
                        <Button1 ><div onClick={handleLogin}>Login</div> </Button1>

                    </RegisterHere>
                   :*/}
                    <SignupRegister>
                        <span>
                            Already have an account? <Link href="/login" style={{ textDecoration: 'none' }}>&nbsp;Login here</Link>
                        </span>
                      </SignupRegister>
                 
            </>
        </SignInSignUpPageHOC>
    );
}

