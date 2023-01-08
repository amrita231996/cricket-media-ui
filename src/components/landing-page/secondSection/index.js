
import { Box, Grid } from '@mui/material';
import React from 'react';
import Image from '../../../assets/images/landingPage/new/asset\ 2.png'

import './index.scss';

const SecondSection = () => {
    return (
        <Box className="secondSection">
            <Grid container spacing={2}>
                <Box sx={{ padding: '50px 0 0 50px' }}>
                    <Grid item xs={12}>
                        <span className='secondSection_earn_runs'>Earn Runs</span>
                    </Grid>
                    <Grid item xs={12}>
                        <p className='secondSection_every_activirty_text'>
                            Every activity on the website earns you runs. More activity, more runs.
                        </p>
                    </Grid>
                </Box>
                <img src={Image} style={{ width: 'calc(100%)' }}></img>
            </Grid>
        </Box>
    )
}

export default SecondSection;