import React from "react";
import Slider from "../../components/landing-page/carousel";
import Testimony from "../../components/landing-page/testimony";
import "./index.scss";
import FirstSection from "../../components/landing-page/firstSection";
import SecondSection from "../../components/landing-page/secondSection";
import ThirdSection from "../../components/landing-page/thirdSection";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <div className="carousel-wrapper">
        <Slider />
      </div>
      <div className="testimony-wrapper">
        <Testimony />
      </div>
    </div>
  );
};

export default LandingPage;
