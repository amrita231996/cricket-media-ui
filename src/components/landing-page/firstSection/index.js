import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from '../navBar';
// import SignUp from '../signUp/index';
import SignUp from '../../signin-signup/signup/signup.component';

import './index.scss';

const FirstSection = () => {
    const navigate = useNavigate();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="firstSection_header">
                        <Navbar />
                    </div>
                </Grid>
            </Grid>
            <Box className="firstSection">
                <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' },justifyContent:'space-between' }}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant='body2' className='firstsection_bold_text' sx={{ fontSize: { xs: "36px", md: "56px" } }}>
                            LOVE CRICKET? <br />
                            GET REWARDED
                        </Typography>
                        <p className='firstPgae_paragraph'>Take your cricket adda from your WhatsApp groups and dinner table chats to the Champ Hunt virtual Dhaba. Earn valuable Runs for your posts, comments, and interactions with  other fans.</p>
                        <button type='button' className='firstpage_signup_btn' onClick={() => navigate('/signup')}>Register Now</button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} id="start-now">
                        <Box className="firstSection_Signup" sx={{ width: { xs: "100%", md: "400px" }, maxWidth: '400px' }}>
                            <SignUp custClassName="landingPageSignUp"/>
                        </Box>

                    </Grid>
                </Grid>
            </Box>

        </>)
}

export default FirstSection;