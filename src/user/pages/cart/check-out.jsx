import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIclass } from "../../../config";

const Checkout = () => {
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);

  const totalCartPrice = productDetails.reduce((total, product) => {
    return total + product.product.price * product.quantity;
  }, 0);

  let delivery = 100;
  let tax = (totalCartPrice * 13) / 100;

  let final = tax + delivery + totalCartPrice;

  const getCarts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}my-cart`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCarts();
  }, [getCarts]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
      address: data.get("address"),
      totalAmount: final,
      phone: data.get("phone_number"),
    };
    await axios
      .post(`${api.baseUrl}add-order`, formData, api.getHeader)
      .then((res) => {
        alert("success");
        window.location.href = "/order-details";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box className="flex justify-center items-center 2xl:container  2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44">
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        className=" w-full sm:w-9/12 lg:w-full flex-col lg:flex-row lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0 "
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex w-full flex-col justify-start items-start"
        >
          <Box className="">
            <Typography className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Check out
            </Typography>
          </Box>
          <Box className="mt-12 flex flex-col justify-start items-start w-full space-y-8">
            <input
              className=" focus:ring-2 focus:ring-gray-500 focus:outline-none px-2 border-b border-gray-200 leading-4 text-base  placeholder-gray-600 py-4 w-full "
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              className=" focus:ring-2 focus:ring-gray-500 focus:outline-none px-2 border-b border-gray-200 leading-4 text-base  placeholder-gray-600 py-4 w-full "
              placeholder="Address"
              name="address"
            />
            {/* <input
              className=" focus:ring-2 focus:ring-gray-500 focus:outline-none px-2 border-b border-gray-200 leading-4 text-base  placeholder-gray-600 py-4 w-full "
              placeholder="total"
              name="total_amount"
            /> */}
            <input
              className=" focus:ring-2 focus:ring-gray-500 focus:outline-none px-2 border-b border-gray-200 leading-4 text-base  placeholder-gray-600 py-4 w-full "
              placeholder="Phone Number"
              name="phone_number"
            />
          </Box>
          <button className=" mt-8 text-base font-medium leading-4 py-4 w-full md:w-4/12 lg:w-full  text-white bg-[dodgerblue] ">
            Checkout
          </button>
        </Box>

        <Box className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
          <Box>
            <Typography
              variant="h1"
              className="text-2xl font-semibold leading-6 text-gray-800"
            >
              Order Summary
            </Typography>
          </Box>
          <Box className="flex mt-7 flex-col items-end w-full space-y-6">
            <Box className="flex justify-between w-full items-center">
              <Typography className="text-lg leading-4 text-gray-600">
                Total items
              </Typography>
              <Typography className="text-lg font-semibold leading-4 text-gray-600">
                {productDetails.length}
              </Typography>
            </Box>
            <Box className="flex justify-between w-full items-center">
              <Typography className="text-lg leading-4 text-gray-600">
                Tax Charges
              </Typography>
              <Typography className="text-lg font-semibold leading-4 text-gray-600">
                {tax}
              </Typography>
            </Box>
            <Box className="flex justify-between w-full items-center">
              <Typography className="text-lg leading-4 text-gray-600">
                Shipping charges
              </Typography>
              <Typography className="text-lg font-semibold leading-4 text-gray-600">
                {delivery}
              </Typography>
            </Box>
            <Box className="flex justify-between w-full items-center">
              <Typography className="text-lg leading-4 text-gray-600">
                Sub total
              </Typography>
              <Typography className="text-lg font-semibold leading-4 text-gray-600">
                {totalCartPrice}
              </Typography>
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center mt-32">
            <Typography className="text-xl font-semibold leading-4 text-gray-800">
              Estimated Total
            </Typography>
            <Typography className="text-lg font-semibold leading-4 text-gray-800">
              {final}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
