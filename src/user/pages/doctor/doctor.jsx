import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIclass } from "../../../config";
import ApointmentModal from "./ApointmentModal";
import DoctorRatingModal from "./DoctorRating";

const Doctor = () => {
  const navigate = useNavigate();
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);

  let total = productDetails?.map((product) => {
    return {
      ...product,
      total_rating: product.doctorratings?.reduce((total, rating) => {
        return total + parseInt(rating.rating);
      }, 0),
    };
    // Add a new object with the total rating to the product object
  });

  console.log(total, "kkds");

  const getProducts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}doctors`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(total);
  }, []);

  const handleSearch = (data) => {
    let filteredDoctor = productDetails.filter((a) => a.department === data);
    setFilter(filteredDoctor);
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: "3rem",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h1"
          className="text-center text-2xl font-bold text-gray-800"
        >
          All Doctors
        </Typography>
      </Box>

      <Box
        sx={{
          paddingTop: "3rem",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h1"
          className="text-center text-xl font-bold text-gray-800"
        >
          Choose Deparment
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          color: "#2e2e2e",
        }}
        className="overflow-x-auto overflow-y-hidden"
      >
        {productDetails.map((a) => {
          return (
            <a
              key={a.id}
              to="#"
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600  cursor-pointer"
              onClick={() => handleSearch(a.department)}
            >
              <span className=" bg-slate-500 p-2 rounded-sm">
                {a.department}
              </span>
            </a>
          );
        })}
      </Box>

      <Box className="py-10 bg-gray-100">
        <Box className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filter.map((p) => {
            return (
              <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "end",
                    overflow: "hidden",
                    borderRadius: ".75rem",
                  }}
                >
                  <img src={api.imageUrl + p.image} alt="Hotel Photo" />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: ".75rem",
                      left: ".75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "whitesmoke",
                      p: ".5rem",
                      borderRadius: ".5rem",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-slate-500">
                      {isNaN(p.total_rating / p.doctorratings.length)
                        ? 0
                        : p.total_rating / p.doctorratings.length}
                    </span>
                  </Box>
                </Box>

                <Box className="mt-1 p-2">
                  <h2 className="text-slate-700">{p.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{p.department}</p>
                  {/* <p className="mt-1 text-sm text-slate-400">
                      <span>Made In</span>: {p.madeIn}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      <span>Made By</span>: {p.madeBy}
                    </p> */}

                  <Box className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">{p.fees}</p>
                    <DoctorRatingModal productDetails={p} />

                    <ApointmentModal row={p} />
                  </Box>
                </Box>
              </article>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Doctor;
