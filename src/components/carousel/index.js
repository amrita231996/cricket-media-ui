import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

import NewImage from "../../assets/images/carousel/Slide1.png";
import NewImageTwo from "../../assets/images/carousel/slide2.png";
import NewImageThree from "../../assets/images/carousel/slide3.png";
import { useNavigate } from "react-router-dom";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

import "./index.scss";
import { useState, useEffect } from "react";

const MyCarousel = () => {
  const navigate = useNavigate();
  const accessToken = getStorageItem("token");

  const [carousel, setCarousel] = useState(null);

  const getCarousels = async () => {
    const options = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/carousel/getAllActive",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    axios(options)
      .then(({ data }) => {
        setCarousel(data);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          console.log(error);
        }
      });
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
            <div
              onClick={() => {
                if (data.link) {
                  navigate(data.link);
                }
              }}
            >
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
