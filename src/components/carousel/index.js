import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

import NewImage from "../../assets/images/carousel/Slide 1.png";
import NewImageTwo from "../../assets/images/carousel/Slide 2.png";
import NewImageThree from "../../assets/images/carousel/Slide 3.png";
import { useNavigate } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

import "./index.scss";
import { useState, useEffect } from "react";

const MyCarousel = () => {
  const navigate = useNavigate();
  const accessToken = getStorageItem("token");

  const [carousel, setCarousel] = useState(null);

  const getCarousels = async () => {
        setCarousel([{name:NewImage},{name:NewImageTwo},{name:NewImageThree}]);
  };
  useEffect(() => {
    getCarousels();
  }, []);

  return (
    <div className="fix-width">
      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showThumbs={false}
      >
        {carousel ? (
          carousel.map((data, index) => (
            <div key={index}>
              <img alt="carousel" src={data.name} />
            </div>
          ))
        ) : (
          <div>
            <img alt="carousel" src={""} />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
