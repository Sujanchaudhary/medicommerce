import React, { useCallback, useEffect, useState } from "react";
import { APIclass } from "../../../config";
import axios from "axios";

const Wishlist = () => {
  const api = new APIclass();
  const [d, setD] = useState([]);
  const getW = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-wishlist`, api.getHeader)
      .then((res) => {
        console.log(res, "me");
        setD(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getW();
  }, [getW]);
  return (
    <div>
      <div className="pt-6 pb-10">
        <div className=" p-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="grid gap-[30px]">
            {d.length !== 0 ? (
              d.map((d) => {
                return (
                  <div className="border-b pb-8" key={d.id}>
                    <div className="flex flex-wrap gap-3">
                      <img
                        src={api.imageUrl + d.product.image}
                        className="w-[120px] h-[120px]"
                      />
                      <div>
                        <div className="flex flex-wrap">
                          <h4 className="text-[20px]">{d.product.name}</h4>{" "}
                          <span className="text-[20px] text-gray-400">
                            @{d.product.madeBy}
                          </span>
                        </div>
                        {/* <div className="flex flex-wrap gap-4 text-[12px] ">
                          <div className="flex items-center gap-1">
                            <GoLocation className="text-[14px] text-gray-400" />
                            <p className="text-gray-400">{job.location}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiTimeFive className="text-[14px] text-gray-400" />
                            <p className="text-gray-400">{job.job_type}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaRegMoneyBillAlt className="text-[14px] text-gray-400" />
                            <p className="text-gray-400">{job.salary}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <MdOutlineTimerOff className="text-[14px] text-gray-400" />
                            <p className="text-gray-400">
                              Application Deadline: {job.application_deadline}
                            </p>
                          </div>
                        </div> */}
                        <p>{d.product.description}</p>
                        <p className="text-[13px] pt-2">Rs.{d.product.price}</p>
                        <p className="text-[13px] pt-2">
                          Made In: {d.product.madeIn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-[72vh]">
                <h4>Sorry!!! No Jobs Found.....</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
