import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from "./carousel-card";
const MainCarousel = () => {
  return (
    <Box>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        interval={5000}
        showStatus={true}
        showArrows={true}
      >
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
