import React from "react";
import Styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import SignInSignUpPageHOC from '../signin-signup-page-hoc'
import { Select } from '../../../commons/components/mui-c-components';


const PLabel = Styled.p(({ align }) => `
    font-size: 18px;
    color: #FFFFFF;
    margin: 0;
    margin-bottom: 12px;
    text-align:${align || 'left'}
`);

export default function CollectUserInfo() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <SignInSignUpPageHOC matches={matches} desktopViewStyles={{
            backgroundColor: '#85858542',
            border: '1px solid #FFFFFF',
            minWidth: 300,
            padding: 20,
        }}>
            <>
                <PLabel align='center'>Hello , XYZ.mail.com</PLabel>
                <PLabel align='center'>Let others know about you</PLabel>
                <br />
                <TextField id="standard-basic" label="My friends call me" variant="standard" placeholder="Type here" />
                <br />
                <Select />
                <br />
                <PLabel>Add a photo to better connect with friends and the like minded ones. People love your smile</PLabel>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />
                <h2>Page in progress</h2>
            </>
        </SignInSignUpPageHOC>
    )
}