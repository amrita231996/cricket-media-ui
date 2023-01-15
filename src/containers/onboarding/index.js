import React, { useContext, useEffect } from 'react';
import OnboardingComponent from '../../components/onboarding';
import BgImage from "../../assets/images/signin-signup/signin-signup-bg-2.png";
import { Helmet } from 'react-helmet';


import './index.scss';
import AppContext from '../../context/AppContext';

const Onboarding = () => {
    const appContext = useContext(AppContext);
    const { setShowAdd, setOnlyLogo } = appContext
  
    useEffect(() => {
      setShowAdd(false)
      setOnlyLogo(true)
    }, [])
    return (
     <>
    <div>
    <Helmet>
      <title>Cricket Media | Onboarding</title>
    </Helmet>
    <div style={{ backgroundImage: `url(${BgImage})` }} className='page onboarding'>
        <OnboardingComponent />
    </div>
    </div>
    </>
    )
}

export default Onboarding;