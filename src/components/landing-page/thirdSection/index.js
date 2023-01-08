import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './index.scss';
import Image from '../../../assets/images/landingPage/new/asset\ 3.png'
import thirdSection_img8 from '../../../assets/images/landingPage/image\ 18.svg'
import thirdSection_img9 from '../../../assets/images/landingPage/image\ 19.svg'
import thirdSection_img10 from '../../../assets/images/landingPage/image\ 20.svg'
import thirdSection_img11 from '../../../assets/images/landingPage/image\ 21.svg'
import { scroller } from 'react-scroll'

const ThirdSection = () => {
    const navigate = useNavigate();
    return (<>
        <Box className="thirdSection">
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <img src={Image} style={{ maxWidth: 'fit-content', width: '100%' }}></img>
                </Grid>
                <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <label className='thirdSection_text_redeemrun'>Redeem Runs</label>
                    <span className='thirdSection_text_redeemrun_line'></span>
                    <p className='thirdSection_text_redeemrun_paragraph'>Runs can be redeemed for cricket themed merchandise, exclusive offers, gift cards, raffles and other products & services.</p>
                    <label className='thirdSection_text_redeemrun_popolar'>Popular Brands</label>
                    <Grid container spacing={2} sx={{ mt: '24px' }}>
                        <Grid item xs={6} sm={3} md={3} lg={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <div>
                                <img src={thirdSection_img8} style={{ width: 'auto' }}></img>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3} lg={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <div>
                                <img src={thirdSection_img9} style={{ width: 'auto' }}></img>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3} lg={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <div>
                                <img src={thirdSection_img10} style={{ width: 'auto' }}></img>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3} lg={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <div>
                                <img src={thirdSection_img11} style={{ width: 'auto' }}></img>
                            </div>
                        </Grid>
                    </Grid>
                    <button type='button' className='thirdSection_startnow_btn'
                        onClick={() => {
                            scroller.scrollTo('start-now', {
                                duration: 800,
                                delay: 0,
                                smooth: 'linear',
                            })
                        }}>Start Now</button>
                </Grid>

            </Grid>
        </Box>

    </>)
}

export default ThirdSection;