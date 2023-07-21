import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/footer/footer";
import Navbar from "../pages/navbar/navbar";

const Layout = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Outlet />
        <Footer/>
      </Box>
    </>
  );
};

export default Layout;