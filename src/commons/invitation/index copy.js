import { useState } from 'react';
import { TextField, InputAdornment,IconButton } from '@mui/material';
import  ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SearchIcon from '@mui/icons-material/Search';
import Invite from '../../assets/images/home/invite.svg';
import Link from '../../assets/images/home/link.svg';
import axios from "axios";
import { Button } from 'carbon-components-react';
import './index.scss';
import { successToast } from '../toast';
import { getAuthToken } from '../../utils/auth';

const InviteModal = (props) => {

    const { open, onClose } = props;

    const [email, setEmail] = useState('');
    const [referral, setReferral] = useState('');
    const [inviteEmailErrorMsg, setInviteEmailErrorMsg] = useState('');
    const [inviteEmailSuccessMsg, setInviteEmailSuccessMsg] = useState('');
    const accessToken = getAuthToken();
    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setInviteEmailErrorMsg('');
    }

    const copyToClipboard = () => {
        const copyText = document.getElementById("referId");

        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
        
        onClose();
    }

    const handleSendInvitation = () => {
        var sendInvitationOptions = {
            method: 'post',
            url: global.config.ROOTURL.prod + '/invite/sendEmail/',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            data: {
                "email": email,
            },
            json: true
        };
        axios(sendInvitationOptions)
            .then(response => {
                setInviteEmailSuccessMsg('Mail has been sent!');
                successToast(
                    <div>
                        Mail has been sent
                    </div>)
                const timer = setTimeout(() => {
                    onClose();
                }, 2000);
                return () => clearTimeout(timer);
            })
            .catch(error => {
                if ('email' in error.response.data) {
                    setInviteEmailErrorMsg(error.response.data['email'].join(', '))
                }
            })
    }

    const createReferral = () => {
        var getReferral = {
            method: 'GET',
            url: global.config.ROOTURL.prod + '/invite/inviteLink/',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            data: {
                "email": email,
            },
            json: true
        };
        axios(getReferral)
            .then(response => {
                setReferral(response.data.inviteLink);
            })
            .catch(error => {
                if ('email' in error.response.data) {
                    setInviteEmailErrorMsg(error.response.data['email'].join(', '))
                }
            })
    }


    const closeModal = () => {
        onClose();
    }


    useState(() => {
        createReferral();
    }, [])

    return <div className={`component invite-modal ${open ? 'visible' : 'hidden'}`}>
        <div className="invite-container" >
            <div style={{ position: 'absolute', right: 0 }}>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModal}
                >X</button>
            </div>
            <div className="image-block">
                <img className='invite-image' src={Invite} alt='' />
            </div>
            <div className="invite-block">
                <label className='info'>
                    Refer Your Friends
                </label>
                <label className='info-friend-post-msg'>
                    Your friends also get 100 points
                    his first post
                </label>
                <div className='input-block'>
                    {/* <input onChange={handleEmailChange} name='email' className='email-input' placeholder='' value={email} /> */}
                    <TextField
                        id="input-with-icon-textfield"
                        label="Enter Friend Email"
                        defaultValue={email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <IconButton edge="end" color="primary" onClick={handleSendInvitation}>
                                        <ArrowCircleRightIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleEmailChange} 
                    />
                </div>
                {inviteEmailSuccessMsg && (
                    <p style={{ color: 'green' }}> {inviteEmailSuccessMsg} </p>
                )}
                {inviteEmailErrorMsg && (
                    <p style={{ color: 'red' }}> {inviteEmailErrorMsg} </p>
                )}
                {/* <div className='send-block'>
                    <button className='send' onClick={handleSendInvitation}>
                        Send
                    </button>
                </div> */}
            </div>
            <div className="link-block">
                {/* <p className='info'>
                    More ways to invite your friends
                </p> */}
                <div className='copy-link-cnt'>
                    <input type="text" id='referId' hidden={true} value={referral}/>
                    <label className='refer-id'>{referral}</label>
                    <div className='copy-btn-cnt'>
                        <button onClick={copyToClipboard} className='copy'>
                            Copy Url
                        </button>
                    </div>
                    {/* <div className='copy-text-cnt'>
                        <input className='refer-id' id='referId' value={referral} readOnly={true} />
                    </div> */}
                </div>
            </div>
        </div>
    </div>
}

export default InviteModal;