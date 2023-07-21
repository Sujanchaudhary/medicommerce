import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIclass } from "../../../config";
import RatingModal from "./Rating";
import Ratings from "./RatingList";

const SingleProduct = () => {
  const api = new APIclass();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});

  const [quantity, setQuantity] = useState(null);

  const [file, setFile] = useState("");
  // Loop through the products and calculate the total rating for each product

  const getSingleProducts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}single-product/${id}`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    getSingleProducts();
  }, [getSingleProducts]);
  return (
    <>
      <div className="flex gap-2 mx-11 pt-10">
        <div className="h-64 md:h-80 w-[600px]  mb-4">
          <img
            className="h-64 md:h-80 w-[600px]  mb-4"
            src={api.imageUrl + productDetails.image}
            alt=""
          />
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
            {productDetails.name}
          </h2>
          <p className="text-gray-500 text-sm">
            By{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              {productDetails.madeBy}
            </a>
          </p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="font-bold text-indigo-600 text-3xl">
                  Pescription
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-xl font-semibold">
                {productDetails.prescription ? (
                  <span className="text-red-500">required</span>
                ) : (
                  "no reuired"
                )}
              </p>
              <p className="text-gray-400 text-sm">
                quantity: {productDetails.quantity}
              </p>
            </div>
          </div>

          <p className="text-gray-500">{productDetails.description}</p>
          <p className="text-gray-500">
            <span className="font-bold text-indigo-600 text-1xl">
              Category:{" "}
            </span>
            {productDetails?.category?.name}
          </p>
          <p className="text-gray-500">
            {" "}
            <span className="font-bold text-indigo-600 text-1xl">Mg: </span>
            {productDetails.mg}
          </p>
          <p className="text-gray-500">
            <span className="font-bold text-indigo-600 text-1xl">Type: </span>
            {productDetails.type}
          </p>

          <div className="flex py-4 space-x-4">
            <form encType="multi-part" className="flex gap-3 flex-col">
              <div className="relative">
                <Input
                  input="number"
                  placeholder="qty"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {productDetails.prescription && (
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              )}

              <button
                type="button"
                className="h-10 px-2 py-1 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={async () =>
                  await axios
                    .post(
                      `${api.baseUrl}add-cart/${productDetails.id}`,
                      {
                        quantity: quantity,
                        image: productDetails.prescription ? file : null,
                      },
                      api.formHeader
                    )
                    .then((res) => {
                      alert("success");
                    })
                    .catch((err) => {
                      console.log(err);
                      alert("error while adding to cart");
                    })
                }
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="h-10 px-2 py-1 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={async () =>
                  await axios
                    .post(
                      `${api.baseUrl}add-wishlist/${productDetails.id}`,
                      "",
                      api.formHeader
                    )
                    .then((res) => {
                      alert("success");
                    })
                    .catch((err) => {
                      console.log(err);
                      alert("error while adding to cart");
                    })
                }
              >
                Add to wishlist
              </button>
            </form>
          </div>
          <RatingModal productDetails={productDetails} />
        </div>
      </div>
      <Ratings productDetails={productDetails} />
    </>
  );
};

export default SingleProduct;
