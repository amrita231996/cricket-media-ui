import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from '../navBar';
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
                        <Typography variant='body2' className='firstsection_bold_text' sx={{ fontSize: { xs: "36px", md: "45px" } }}>
                            CRICKET LOVER? <br />
                            GROW YOUR NETWORK 
                        </Typography>
                        <p className='firstPgae_paragraph'>Cricket Media is an online web application for cricket lovers. This is a social media platform for cricket. Users can share cricket thoughts by creating his/her view in terms of a new post that is called Feed.   Other users can follow and see their feeds. If you do not like any post then you can unfollow them. Anyone can share and comment on any feed and show it to a big audience. Users can report to other users if they think this is hurtful to anyone.</p>
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