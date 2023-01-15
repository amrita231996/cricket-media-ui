import { Text, useContext, useEffect } from "react";
import Styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import NewImage from "../../assets/images/carousel/Slide 1.png";
import NewImageTwo from "../../assets/images/carousel/Slide 2.png";
import NewImageThree from "../../assets/images/carousel/Slide 3.png";

import "./index.scss";
import LogoWithTitle from "../../components/signin-signup/logo.component";
import AppContext from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { PathAction } from "../../redux/reducers/globalPath";

const HeaderLabel = Styled.h1(
  ({ align }) => `
    font-size: 20px;
    color: black;
    margin: auto 0 auto 0;
    text-align:${align || "left"};
    font-weight:500;
    line-height: 30px;
`
);

const AboutUs = () => {
  const appContext = useContext(AppContext);
  const { setShowAdd, setShowFooter } = appContext

  const path=window.location.pathname;
  const dispatch=useDispatch();
  dispatch(PathAction.handlePath({payload:path}))

  useEffect(() => {
      setShowAdd(true)
      setShowFooter(true)
  }, [])
  return (
    <div className="page aboutus">
      <div className="main-content">
        <div className="carousel-about-us">
          <div>
            <Carousel
              dynamicHeight={true}
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              showThumbs={false}
            >
              <div>
                <img src={NewImage} />
              </div>
              <div>
                <img src={NewImageTwo} />
              </div>
              <div>
                <img src={NewImageThree} />
              </div>
            </Carousel>
          </div>
        </div>
        <main className="aboutus-main">
          <div className="component aboutus-alert">
            <div className="aboutus-text">
              <div style={{ display: "flex" }}>
                <LogoWithTitle align={"flex-start"} />
                <HeaderLabel align={""}>CricketMedia</HeaderLabel>
              </div>
              <p>
              Cricket Media is an online web application for cricket lovers. 
              This is a social media platform for cricket. Users can share 
              cricket thoughts by creating his/her view in terms of a new post that is called Feed.   
              Other users can follow and see their feeds. If you do not like any post then you can 
              unfollow them. Anyone can share and comment on any feed and show it to a big audience. 
              Users can report to other users if they think this is hurtful to anyone. Admin can check 
              these reported feeds and hide the feed. In this web application, I have also added signUp and 
              login features, user signUp with their email or mobile number. When a new user signUp then at the 
              backend they follow some of the default users that are created by the admin. Also, I have added a 
              logout functionality. Apart from this, I have also integrated reCaptcha to protect the website from 
              spam and abuse, and also we can block automated software while helping our welcome users to enter with ease, 
              to distinguish between humans and robots, a "captcha" is a turing test. Humans can resolve it with ease. 
              Cricket Media is similar to applications like LinkedIn, Twitter, and Facebook. Cricket Media is the virtual 
              home of cricket lovers where they can come, interact with other fans, share their opinions, have discussions, 
              analyze games, and much more. What separates Cricket Media from other cricket portals on the internet is that 
              Cricket Media is a reward-based platform. Every fan who registers to the platform earns runs (points) for every 
              single activity they do. Users can also give runs of their liking to other users’ 
              posts and that gets added to their runs earned. Users can  Redeem their runs to enter weekly 
              raffles and unlock a chance to win exciting gifts on this platform. This web application 
              will contain both frontend and backend parts with deployment on a cloud server.
              </p>

            </div>
          </div>
        </main>
        {/* <Poll/> */}
      </div>
    </div>
  );
};

export default AboutUs;
