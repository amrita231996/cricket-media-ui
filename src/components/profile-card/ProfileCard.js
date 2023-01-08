import React from "react";
import Button from "../../commons/form/button";
import axios from "axios";
import { useEffect, useState } from 'react';
import Avatar from '../../assets/images/header/avatar.png';
import { Link } from "react-router-dom";
import './index.scss'
import { getStorageItem } from "../../utils/sessionStorage";
const ProifleCard = (props) => {

    const [changeTextToFollowing, setchangeTextToFollowing] = useState(false);
    const accessToken = getStorageItem("token");
    const [runs, setRuns] = useState(0);
    const { profile } = props;


    const handleFollow = () => {
        const follow = {
            method: "POST",
            url: global.config.ROOTURL.prod + "/auth/add-following-user/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            },
            data: {
                followingUserId: profile._id
            }
        }

        axios(follow)
            .catch(error => {
                if (error?.response?.status == 401) {
                    clearStorage()
                    navigate('/login');
                }
            })
    }



    return <div style={{ maxWidth: "400px" }}>
        <div className="left-block">
            <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none' }}>
                <div className="profile-info">
                    <img src={profile.profilePhoto} alt='' className="avatar" />
                    <p className="name primary">
                        {profile.firstName + " " + profile.lastName}
                        <span className="role">
                            {/* { role } */}
                        </span>
                    </p>
                </div>
            </Link>
            <div className="button-block">
                <Button
                    label={changeTextToFollowing ? 'Following' : 'Follow'}
                    classes='follow'
                    onClick={() => handleFollow(profile._id)}
                />
            </div>
        </div>
        <div className="right-block">
            <div className="stats-block">
                <div className="stat">
                    <div className="number followers">
                        {/* {followers} */}
                    </div>
                    <p className="label primary">Followers</p>
                </div>
                <div className="stat">
                    <div className="number runs">
                        {profile.totalRun ? profile.totalRun : runs}
                    </div>
                    <p className="label primary">Runs</p>
                </div>
            </div>
        </div>
    </div>
}

export default ProifleCard;