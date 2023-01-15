import React, { useEffect } from "react";
import Styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from '@mui/material';

import LogoWithTitle from '../logo.component';
import SignInForm from './siginin-form.component';

import SignInSignUpPageHOC from '../signin-signup-page-hoc'

const RegisterHere = Styled.div(`
    width: 80%;
    max-width: 300px;
    margin: 20px auto 5px auto;
    padding: 10px 20px;
    border-radius: 20px;
    background: white;
    font-size: 15px;
    color: black;
    text-align: center;
`);


const HeaderLabel = Styled.h1(({ align }) => `
    font-size: 40px;
    color: black;
    margin: 0;
    text-align:${align || 'left'};
    font-weight:500
`);

const InfoLabel = Styled.p(({ align }) => `
    font-size: 15px;
    color: black;
    margin: 0;
    margin-bottom: 15px;
    text-align:${align || 'left'}
`);


export default function SignIn() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <SignInSignUpPageHOC matches={matches}>
            <>
                <LogoWithTitle fontSize={"120"}/>
                <InfoLabel align={ 'center'}>For member login use your ID &amp; Password</InfoLabel>
                <SignInForm breakPoint={matches} />
                <RegisterHere>
                    <span>
                        Not a member yet? <Link href="/signup" style={{ textDecoration: 'none' }}>&nbsp;Register here</Link>
                    </span>
                </RegisterHere>
            </>
        </SignInSignUpPageHOC>
    );
}