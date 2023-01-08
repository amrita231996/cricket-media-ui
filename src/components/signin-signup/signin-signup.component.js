import React from "react";
import Styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, Grid } from '@mui/material';

import LogoWithTitle from './logo.component';
import SignInForm from './signin/siginin-form.component';
import SignUpForm from './signup-form.component';
import BgImage from '../../assets/images/signin-signup/signin-signup-bg-2.png';

const PageContainer = Styled.div(`
    height: 100vh;
    background-image: url(${BgImage});
    background-repeat: no-repeat;
    background-color: grey;
    background-size: cover;
    background-position: center;
    overflow: auto;
`);

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


export default function SignInUp() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const mobileView = (<div style={{ width: "80%", margin: 'auto' }}>
        <div style={{ padding: 20 }}><LogoWithTitle /></div>
        <SignInForm />
        <RegisterHere>
            <span>
                New to platform ? <Link href="#" style={{ textDecoration: 'none' }}>&nbsp;Register here</Link>
            </span>
        </RegisterHere>
    </div>)
    const desktopView = ( <>
        <div style={{ padding: 40 }}>
                <LogoWithTitle fontSize={90} />
            </div> 
            <div style = { { width: "80%", margin: '0 auto', border: '1px solid white', borderRadius: 20 } } >
        <Grid container>
                    <Grid item xs={6}>
                        <div style={{ width: "60%", padding: 50, paddingBottom: 20 }}>
                            <SignInForm />
                        </div>
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '0 20px 20px 0' }}>
                        <div style={{ paddingTop: 50 }}>
                            <SignUpForm />
                        </div>
                    </Grid>
                </Grid> 
                </div> 
        </>
    )
    return (<PageContainer>{matches ? desktopView : mobileView}</PageContainer>);
}