import AwesomeSlider from "react-awesome-slider";
import "./styles.scss";

import imageOne from "../../../assets/images/landingPage/image_22.png";
import imageTwo from "../../../assets/images/landingPage/Slide2.png";
import imageThree from "../../../assets/images/landingPage/Slide3.png";
// import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
// import 'react-awesome-slider/dist/styles.css';
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { Grid, Typography } from "@mui/material";
import useResponsive from "../../../utils/useResponsive";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const items = [
  {
    image: imageOne,
    heading: <>TURN YOUR RUNS INTO <strong>GIFT CARDS</strong></>,
    subText: <>Use your runs to unlock gift cards from amazon, flipkart, zomato, swiggy and other popular websites.</>,
  },
  {
    image: imageTwo,
    heading: <>Runs to <strong>{" Raffles"}</strong></>,
    subText: <>Redeem your runs to enter weekly raffles and unlock a chance to win exciting gifts.</>,
  },
  {
    image: imageThree,
    heading: <>Win Runs through <strong>{" Challenges"}</strong></>,
    subText: <>Take part in Champ Hunt challenges to unlock more fun and more runs.</>,
  },
]

const SliderItems = (props) => {
  return (
    <Grid container spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' }, pb: { xs: '0px', md: '20px' } }}>
        <img src={props.image} alt=""/>
      </Grid>
      <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h4" sx={{ pb: '20px' }}>
          {props.heading}
        </Typography>
        <Typography variant="h5">
          {props.subText}
        </Typography>
      </Grid>
    </Grid>
  )
}

const Slider = () => {
  const [isMobile, isTablet] = useResponsive()
  return (
    <AutoplaySlider
      style={{ height: isMobile || isTablet ? '120vh' : '100vh' }}
      bullets={false}
      infinite={true}
      mobileTouch
      startup
      organicArrows={true}
      play={true}
      interval={3000}
    >
      {items.map((item,index) => (
        <div>
          <SliderItems {...item} key={index}/>
        </div>
      ))}
    </AutoplaySlider>
  );
};

export default Slider;
