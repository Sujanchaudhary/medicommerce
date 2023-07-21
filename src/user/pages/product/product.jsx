import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIclass } from "../../../config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input } from "postcss";

const product = () => {
  const navigate = useNavigate();
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);

  let total = productDetails?.map((product) => {
    return {
      ...product,
      total_rating: product.ratings?.reduce((total, rating) => {
        return total + parseInt(rating.rating);
      }, 0),
    };
    // Add a new object with the total rating to the product object
  });

  const getProducts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}user-all-products`)
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

  const [categoryDetails, setCategoryDetails] = useState([]);

  const getCategory = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}categories`, api.getHeader)
      .then((res) => {
        setCategoryDetails(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [allFilter, setAllFilter] = useState([]);

  useEffect(() => {
    setAllFilter(total);
  }, [total]);
  const applyFilter = useCallback(() => {
    let update = total;
    if (filter) {
      update = update.filter((f) => f.category.name === filter);
    }
    if (search) {
      update = update.filter(
        (f) => f.name.toLowerCase().search(search.toLowerCase().trim()) !== -1
      );
    }
    if (sort === "name") {
      update.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "date") {
      update.sort(
        (a, b) =>
          new Date(b.createAt.slice(0, 10)) - new Date(a.createAt.slice(0, 10))
      );
    }
    setAllFilter(update);
  }, [filter, search, total]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);
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
          All Products
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
        className="overflow-x-auto overflow-y-hidden py-10"
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">category</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categoryDetails.map((a) => {
              return <MenuItem value={a.name}>{a.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Box>
          <TextField size="small" onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Sort</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="name">name</MenuItem>;
            <MenuItem value="date">date</MenuItem>;
          </Select>
        </FormControl>
        {/* {categoryDetails.map((a) => {
          return (
            <a
              key={a.id}
              to="#"
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-white  cursor-pointer"
              onClick={() => handleSearch(a.name)}
            >
              <span className=" bg-slate-500 p-2 rounded-sm">{a.name}</span>
            </a>
          );
        })} */}
      </Box>

      <Box className="py-10 bg-gray-100">
        <Box className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allFilter?.length !== 0 ? (
            allFilter?.map((p) => {
              return (
                <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                  <a onClick={() => navigate(`/single-product/${p.id}`)}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "end",
                        overflow: "hidden",
                        borderRadius: ".75rem",
                      }}
                    >
                      <img
                        className="h-[10em] w-full"
                        src={api.imageUrl + p.image}
                        alt="Hotel Photo"
                      />
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
                          {isNaN(p.total_rating / p.ratings.length)
                            ? 0
                            : p.total_rating / p.ratings.length}
                        </span>
                      </Box>
                    </Box>

                    <Box className="mt-1 p-2">
                      <h2 className="text-slate-700">{p.name}</h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {p.description}
                      </p>
                      {/* <p className="mt-1 text-sm text-slate-400">
                      <span>Made In</span>: {p.madeIn}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      <span>Made By</span>: {p.madeBy}
                    </p> */}

                      <Box className="mt-3 flex items-end justify-between">
                        <p className="text-lg font-bold text-blue-500">
                          Rs. {p.price}
                        </p>

                        <Box className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>

                          <button className="text-sm">See Product</button>
                        </Box>
                      </Box>
                    </Box>
                  </a>
                </article>
              );
            })
          ) : (
            <Typography className="text-right">no products found</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default product;
