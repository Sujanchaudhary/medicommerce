import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIclass } from "../../../config";

const Cart = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1); // it sets the quantity of all the product when any increment is made -> its an error, change it

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
  return (
    <>
      <Box className="flex md:flex-row flex-col justify-end">
        <Box
          className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
          id="scroll"
        >
          <Typography
            variant="h1"
            sx={{
              pt: ".75rem",
              color: "#2e2e2e",
            }}
            className="text-5xl font-black leading-10"
          >
            Your Bag
          </Typography>
          {/* Cards starts here */}
          {productDetails.map((c) => {
            return (
              <Box
                key={c.id}
                className="md:flex items-center mt-14 border-t border-gray-200"
              >
                <Box
                  sx={{
                    width: "25%",
                  }}
                >
                  <img
                    src={api.imageUrl + c.product.image}
                    alt
                    className="w-full h-[200px] object-center object-cover"
                  />
                </Box>
                <Box className="md:pl-3 md:w-3/4">
                  <Typography
                    variant="h5"
                    className="text-xs leading-3 text-gray-800 md:pt-0 pt-4"
                  >
                    {c.product.type}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      pt: 1,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#2e2e2e",
                      }}
                      className="text-base leading-none text-red-500 "
                    >
                      {c.product.name}
                    </Typography>
                  </Box>
                  <Typography className="text-xs leading-3 text-gray-600 pt-2">
                    Quantity: {c.quantity}
                  </Typography>
                  <Typography className="text-xs leading-3 text-gray-600 py-4">
                    Made By: {c.product.madeBy}
                  </Typography>
                  <Typography className="w-96 text-xs leading-3 text-gray-600">
                    MG: {c.product.mg}
                  </Typography>
                  <Box className="flex items-center justify-between pt-5 pr-6">
                    <Box className="flex itemms-center">
                      <Typography className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </Typography>
                      <Typography
                        onClick={async () =>
                          await axios
                            .get(
                              `${api.baseUrl}delete-cart/${c.id}`,
                              api.getHeader
                            )
                            .then((res) => {
                              alert("deleted cart successfully");
                              getCarts();
                              console.log(res);
                            })
                        }
                        className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                      >
                        Remove
                      </Typography>
                    </Box>
                    {/* <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 1,
                      }}
                    >
                      <Typography
                        onClick={() => {
                          setQuantity((prev) => {
                            if (prev > 1) {
                              return prev - 1;
                            }
                            return prev;
                          });
                        }}
                        className="hover:cursor-pointer select-none p-1"
                      >
                        -
                      </Typography>
                      {quantity}
                      <Typography
                        onClick={() => {
                          setQuantity((prev) => prev + 1);
                        }}
                        className="hover:cursor-pointer select-none p-1"
                      >
                        +
                      </Typography>
                    </Box> */}
                    <Typography className="text-base font-black leading-none text-gray-800">
                      Rs {c.product.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* Check out card here */}
        <Box className="md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full md:mt-12">
          <Box className="flex flex-col px-14 py-20 justify-between overflow-y-auto">
            <Box>
              <Typography className="text-4xl font-black leading-9 text-gray-800">
                Summary
              </Typography>
              <Box className="flex items-center justify-between pt-16">
                <Typography className="text-base leading-none text-gray-800">
                  Subtotal
                </Typography>
                <Typography className="text-base leading-none text-gray-800">
                  Rs {totalCartPrice}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between pt-5">
                <Typography className="text-base leading-none text-gray-800">
                  Shipping
                </Typography>
                <Typography className="text-base leading-none text-gray-800">
                  Rs{delivery}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between pt-5">
                <Typography className="text-base leading-none text-gray-800">
                  Tax
                </Typography>
                <Typography className="text-base leading-none text-gray-800">
                  Rs {tax}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                <Typography className="text-2xl leading-normal text-gray-800">
                  Total
                </Typography>
                <Typography className="text-2xl font-bold leading-normal text-right text-gray-800">
                  Rs {final}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/checkout")}
                className="text-base leading-none w-full py-4 bg-[dodgerblue] text-white"
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
