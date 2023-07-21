import { Box, Typography } from "@mui/material";
import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
function Contact() {
  return (
    <Box className="container mx-auto py-12">
      <Box className="lg:flex">
        <Box className="xl:w-2/5 lg:w-2/5 bg-[dodgerblue] py-16 xl:rounded-bl rounded-tl rounded-tr xl:rounded-tr-none">
          <Box className="xl:w-5/6 xl:px-0 px-8 mx-auto">
            <Typography className="xl:text-4xl text-3xl pb-4 text-white font-bold">
              Get in touch
            </Typography>
            <Typography className="text-xl text-white pb-8 leading-relaxed font-normal lg:pr-4">
              Got a question about us?
            </Typography>
            <Box className="flex pb-4 items-center">
              <div>
                <AiOutlinePhone className="text-[1.3rem] text-white" />
              </div>
              <Typography className="pl-4 text-white text-base">
                +1 (308) 321 321
              </Typography>
            </Box>
            <Box className="flex items-center">
              <div>
                <HiOutlineMail className="text-[1.3rem] text-white" />
              </div>
              <Typography className="pl-4 text-white text-base">
                Info@alphas.com
              </Typography>
            </Box>
            <Typography className="text-lg text-white pt-10 tracking-wide">
              Itahari, Nepal
            </Typography>
          </Box>
        </Box>
        {/* Form section */}
        <Box className="xl:w-3/5 lg:w-3/5 bg-gray-00 h-full pt-5 pb-5 xl:pr-5 xl:pl-0 rounded-tr rounded-br">
          <form
            id="contact"
            className="bg-white py-4 px-8 rounded-tr rounded-br"
          >
            <Typography className="text-4xl text-gray-800 font-extrabold mb-6">
              Enter Details
            </Typography>
            <Box className="flex justify-center gap-x-[2em]">
              <Box>
                <Box className="block xl:flex w-full flex-wrap justify-between mb-3">
                  <Box className="flex flex-col">
                    <label
                      htmlFor="full_name"
                      className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      required
                      id="full_name"
                      name="full_name"
                      type="text"
                      className="focus:outline-none focus:border focus:border-[dodgerblue] font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder
                    />
                  </Box>
                </Box>
                <Box className="w-2/4 max-w-xs xl:flex mb-3">
                  <Box className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                    >
                      Email
                    </label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      className="focus:outline-none focus:border focus:border-[dodgerblue] font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder
                    />
                  </Box>
                </Box>
                <Box className="flex w-full flex-wrap mb-5">
                  <Box className="w-2/4 max-w-xs">
                    <Box className="flex flex-col">
                      <label
                        htmlFor="phone"
                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                      >
                        Phone
                      </label>
                      <input
                        required
                        id="phone"
                        name="phone"
                        type="tel"
                        className="focus:outline-none focus:border focus:border-[dodgerblue] font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder
                      />
                    </Box>
                  </Box>
                </Box>
                <button
                  type="submit"
                  className="focus:outline-none bg-[dodgerblue] transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm leading-6"
                >
                  Submit
                </button>
              </Box>
              <img
                src="https://www.nepmeds.com.np/frontend/images/400x600.jpg"
                alt="doctor-cartoon-image"
                className="h-[20em] w-[20em] object-fill hidden sm:block"
              />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
