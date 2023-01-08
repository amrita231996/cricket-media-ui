import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Alert from "../alerts";
import Hero from "../hero";
import Posts from "../posts";
import MyCarousel from "../carousel";

import './index.scss';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';


const Feeds = (props) => {
    const mobileView = useMediaQuery("(max-width:899px)");
    const {pitchCreatedProps} = props;
    const [pitchCreated,setPitchcreated] = useState(false);

    useEffect(()=>{
        setPitchcreated(!pitchCreated);
    },[pitchCreatedProps]);

    return <div className="component feeds">
        <div>
            <MyCarousel />
        </div>
        <div style={{paddingTop: "15px", paddingBottom: "15px", display: `${mobileView ? "none" : ""}`}} >
            <Alert hprops={()=>{
                setPitchcreated(!pitchCreated);
                }}/>
        </div>
            <Posts filter={'all_pitches'} 
            pitchCreatedProps={pitchCreated} 
            />
    </div>
}

export default Feeds;