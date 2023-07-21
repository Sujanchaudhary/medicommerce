import { Box, Divider } from "@mui/material";
import React from "react";
import MainCarousel from "./components/main-carousel/main-carousel";
import TopBrandCarousel from "./components/top-brand-carousel/top-brand-carousel";
import HotBrandCarousel from "./components/top-brand-carousel/HotBrand";

const Home = () => {
  return (
    <>
      <Box>
        <MainCarousel />
        {/* <DividerHeading title={"Top Brand Products"} /> */}
        <Divider sx={{ marginBlock: 2 }}>Featured Products</Divider>
        <TopBrandCarousel />
        <Divider sx={{ marginBlock: 2 }}>Top Rated Products</Divider>
        <HotBrandCarousel />
        {/* <Discover/> */}
        {/* <Contact /> */}
      </Box>
    </>
  );
};

export default Home;
