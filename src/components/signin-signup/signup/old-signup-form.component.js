import React from "react";
import { styled } from '@mui/styles';
import Styled from "@emotion/styled";
import { Button, Checkbox } from '@mui/material';

import GoogleIcon from '../../assets/images/signin-signup/google.svg'
import { CIcon } from "../../commons/components/Icon";

const pagePrimaryColor = '#000000'

const Container = Styled.div(`
    display: flex;
    flex-direction: column;
    align-items: center;
`);

const HeaderLabel = Styled.h1(`
    font-size: 40px;
    color: ${pagePrimaryColor};
    text-align: center;
    margin: 0;
`);

const InfoLabel = Styled.p((fontSize) => (`
    font-size: ${fontSize || 15}px;
    color: ${pagePrimaryColor};
    text-align: center;
    margin: 0;
    margin-bottom: 15px;
`));

const CreateAccButton = styled(Button)({
    background: `linear-gradient(45deg, ${pagePrimaryColor} 30%, ${pagePrimaryColor} 90%)`,
    borderRadius: 20,
    color: 'white',
    height: 45,
    width: 176,
});

export default function SignUpForm() {
    return (
        <Container>
            <HeaderLabel>New user signup</HeaderLabel>
            <InfoLabel>For member login use your ID &amp; Password</InfoLabel>
            <br />
            <br />
            <CIcon src={GoogleIcon} fontSize={53} />
            <br />
            <br />
            <InfoLabel fontSize={18}><Checkbox value="remember" color="primary" />By signing up you agree to the terms and conditions</InfoLabel>
            <br />
            <CreateAccButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: 'none', fontSize: 18 }}
            >
                Create account
            </CreateAccButton>
        </Container>
    )
}