import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { APIclass } from "../../../../../config";
const CarouselCard = () => {
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
    <>
      {total.map((p) => {
        return (
          <div className="border-[1px] p-2 hover:shadow-lg duration-300 min-w-[14em]">
            <div className="flex justify-center">
              <img
                src={api.imageUrl + p.image}
                alt="item"
                className="max-w-[30em] h-[10em] lg:max-w-[40em] lg:h-[12em] xl:max-w-[40em] rounded-sm"
              />
            </div>
            <p className="text-[1.2rem] font-semibold mt-2">{p.name}.</p>
            <p className="text-[1.1rem] font-semibold">Rs. {p.price}</p>
            <div className="w-full flex justify-center mt-3">
              <button className="bg-[dodgerblue] text-white p-2 flex gap-1 justify-center items-center rounded-sm w-[95%]">
                <BsFillCartCheckFill />
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CarouselCard;
