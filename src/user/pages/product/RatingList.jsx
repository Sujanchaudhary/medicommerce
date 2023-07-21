import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { APIclass } from "../../../config";

const Ratings = ({ productDetails }) => {
  const { id } = useParams();
  const api = new APIclass();
  const [ratingDetails, setRatingDetails] = useState([]);

  const sum = ratingDetails?.reduce((total, item) => {
    return total + item.rating;
  }, 0);

  console.log(sum);

  const getHotelDetail = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-rating/${id}`, api.getHeader)
      .then((res) => {
        console.log(res, "me");
        setRatingDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getHotelDetail();
  }, [getHotelDetail]);

  return (
    <div className="m-3 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-[1em]">
      {ratingDetails.map((rating) => {
        return (
          <div key={rating.id} className=" shadow p-2">
            <div className="flex items-center mb-4 space-x-4">
              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  {/* {rating.user.name} */}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    {rating.createdAt.slice(0, 10)}
                  </time>
                </p>
              </div>
            </div>
            <div className="flex">
              {[...Array(rating.rating)].map((star, index) => (
                <span
                  key={index}
                  className={`text-yellow-500 ${
                    rating > index ? "text-lg" : "text-lg"
                  } hover:text-lg transition-colors duration-200 cursor-pointer`}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
              {rating.review}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;
