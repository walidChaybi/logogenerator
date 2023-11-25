// LogoCarousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const logos = [
  "logo1.png",
  "logo2.png",
  "logo3.png",
  "logo4.png",
  "logo5.png",
  "logo6.png",
  "logo7.png",
  "logo8.png",
];

const LogoCarousel = (props: { className: string }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  return (
    <Slider {...props} {...settings}>
      {logos.map((logo, index) => (
        <div key={index}>
          <Image
            width={150}
            height={0}
            src={`/${logo}`}
            alt={`Company ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default LogoCarousel;
