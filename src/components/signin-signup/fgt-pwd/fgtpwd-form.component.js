import {React, useState} from "react";
import { makeStyles, styled } from '@mui/styles';
import Styled from "@emotion/styled";
import { InputAdornment, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { CIcon } from "../../../commons/components/Icon";

import { CTextField } from '../../../commons/components/mui-c-components'
import LockIcon from '../../../assets/images/signin-signup/password.svg';
import VisibilityIcon from '../../../assets/images/signin-signup/visibility-on-icon.svg';
import VisibilityOffIcon from '../../../assets/images/signin-signup/visibility-off-icon.svg';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const pageFontColor = '#FFFFFF'

const LogInWith = Styled.div(`
    display: flex;
    flex-direction: column;
    align-items: center;
`);

const useStyles = makeStyles({
    root: {},
    inputProps: {
        color: "black",
        borderRadius: 15,
        border: 10,
        fontSize: 18,
    }
});

const InfoLabel = Styled.p(`
    font-size: 15px;
    color: black;
    margin: 0;
    margin-bottom: 15px;
`);

const SubmitButton = styled(Button)({
    background: "#00298E",
    borderRadius: 8,
    color: pageFontColor,
    height: 45,
    fontWeight:600
  });

export default function ForgotPasswordForm(props) {
    // initialize form error messages
    const [passwordErrorMsg, setpasswordErrorMsg] = useState('');
    const [confirmpasswordErrorMsg, setconfirmpasswordErrorMsg] = useState('');
    
    const classes = useStyles();
    const navigate = useNavigate();
    // call register api
    const fgtPwdSubmit = (event) => {

        event.preventDefault();

        var fgtPwdOptions = {
             method: 'post',
             url: global.config.ROOTURL.prod + '/auth/passwordUpdate/',
             data: JSON.stringify(
                {
                '_id': props.uid,
                 'password': event.target.password.value,
                }
             ),
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             },
             json: true
        };
        axios(fgtPwdOptions)
        .then(response => {
            navigate('/login')
        })
        .catch(error => {
            if ('password' in error.response.data){
                setpasswordErrorMsg(error.response.data['password'].join(', '))
            }
            if ('password2' in error.response.data){
                setconfirmpasswordErrorMsg(error.response.data['password2'].join(', '))
            }
        })
    }
    // api call ends

    const values = { showPassword: false }
    return (
        <>
            <Box component="form" onSubmit={fgtPwdSubmit}>
                <CTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    id="password"
                    className={classes.root}
                    InputProps={{
                        className: classes.inputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <CIcon src={LockIcon} fontSize={24} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    <CIcon src={values.showPassword ? VisibilityOffIcon : VisibilityIcon} fontSize={24} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {passwordErrorMsg && (
                  <p style={{ color: 'red' }}> {passwordErrorMsg} </p>
                )}
                <CTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    placeholder="Confirm password"
                    type={values.showPassword ? 'text' : 'password'}
                    id="password2"
                    className={classes.root}
                    InputProps={{
                        className: classes.inputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <CIcon src={LockIcon} fontSize={24} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    <CIcon src={values.showPassword ? VisibilityOffIcon : VisibilityIcon} fontSize={24} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {confirmpasswordErrorMsg && (
                  <p style={{ color: 'red' }}> {confirmpasswordErrorMsg} </p>
                )}
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, textTransform: 'none', fontSize: 18 }}
                >
                    Reset Password
                </SubmitButton>
            </Box>
        </>
    )
}