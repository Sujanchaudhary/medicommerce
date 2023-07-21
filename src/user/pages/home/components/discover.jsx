import { Box, Typography } from "@mui/material";
import React from "react";

const Discover = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className=" 2xl:container 2xl:mx-auto lg:px-20 md:py-12 md:px-6 py-9 px-4"
      >
        <Box className="w-80 md:w-auto grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6">
          <Box
            sx={{
              position: "relative",
            }}
            className="group"
          >
            <img
              className="lg:block hidden w-full"
              src="https://i.ibb.co/SnL9NZV/pexels-two-dreamers-2345236-1.png"
              alt="Women"
            />
            <img
              className="lg:hidden md:block hidden w-full"
              src="https://i.ibb.co/PwMpH9g/pexels-two-dreamers-2345236-1-1.png"
              alt="Women"
            />
            <img
              className="w-full md:hidden"
              src="https://i.ibb.co/Ks91wpt/pexels-two-dreamers-2345236-1.png"
              alt="Women"
            />
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                p: "2rem",
              }}
              className="opacity-0 hover:opacity-100"
            >
              <Typography className=" font-semibold text-2xl leading-6 text-white">
                Women
              </Typography>
            </Box>
          </Box>
          <Box className=" lg:px-6 lg:py-0 md:py-16 md:px-24 py-16 px-6 flex flex-col justify-center items-center text-center bg-gray-100">
            <Typography
              variant="h2"
              className=" font-semibold lg:text-4xl text-3xl lg:leading-10 leading-9 text-gray-800 lg:w-full md:w-7/12 w-full"
            >
              Shop your Favorite Designers
            </Typography>
            <Typography className=" font-medium text-base leading-6 text-gray-600 mt-4 lg:w-full md:w-7/12 w-full">
              We offer a huge collection of premium clothing that are crafted
              with excellence for our adored customers
            </Typography>
            <button className="focus:outline-none text-white text-base leading-4 bg-[dodgerblue] lg:px-10 py-4 lg:w-auto w-72 mt-16">
              Discover More
            </button>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
            className="group"
          >
            <img
              className="lg:block hidden w-full"
              src="https://i.ibb.co/gVMrdyp/pexels-mpumelelo-buthelezi-4503712-1-1.png"
              alt="Man"
            />
            <img
              className="lg:hidden md:block hidden w-full"
              src="https://i.ibb.co/hYmYWgT/pexels-two-dreamers-2345236-2.png"
              alt="Man"
            />
            <img
              className="w-full md:hidden"
              src="https://i.ibb.co/99kYP9T/pexels-two-dreamers-2345236-2.png"
              alt="Man"
            />
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                p: "2rem",
              }}
              className=" opacity-0 hover:opacity-100"
            >
              <Typography className=" font-semibold text-2xl leading-6 text-white">
                Men
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Discover;
