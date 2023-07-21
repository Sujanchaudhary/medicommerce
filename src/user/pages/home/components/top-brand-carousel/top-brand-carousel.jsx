import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { APIclass } from "../../../../../config";
import HorizontalScroll from "react-scroll-horizontal";
import BasicModal from "./AddCartModal";
import { Rating } from "@mui/material";

const TopBrandCarousel = () => {
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
  return (
    <div className="w-full h-[20em] lg:h-[22em]">
      <HorizontalScroll reverseScroll={true}>
        <div className="text-gray-600 p-2 flex gap-3">
          {total.length !== 0
            ? total.map((p) => {
                console.log(p.isFeatured);
                if (p.isFeatured) {
                  return (
                    <div
                      key={p.id}
                      className="border-[1px] p-2 hover:shadow-lg duration-300 min-w-[14em]"
                    >
                      <div className="flex justify-center">
                        <img
                          src={api.imageUrl + p.image}
                          alt="item"
                          className="max-w-[30em] h-[10em] lg:max-w-[40em] lg:h-[12em] xl:max-w-[40em] rounded-sm"
                        />
                      </div>
                      <p className="text-[1.2rem] font-semibold mt-2">
                        {p.name}.
                      </p>
                      <Rating
                        name="read-only"
                        value={p?.total_rating / p.ratings.length}
                        readOnly
                      />
                      <p className="text-[1.1rem] font-semibold">
                        Rs. {p.price}
                      </p>

                      {p.prescription === null ? (
                        <div className="w-full flex justify-center mt-3">
                          <button
                            className="h-10 px-2 py-1 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                            onClick={async () =>
                              await axios
                                .post(
                                  `${api.baseUrl}add-cart/${p.id}`,
                                  {
                                    quantity: 1,
                                    image: p.prescription ? file : null,
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
                            <BsFillCartCheckFill />
                            Add to cart
                          </button>
                        </div>
                      ) : (
                        <BasicModal p={p} />
                      )}
                    </div>
                  );
                }
              })
            : "no products found!!"}
        </div>
      </HorizontalScroll>
    </div>
  );
};

export default TopBrandCarousel;
