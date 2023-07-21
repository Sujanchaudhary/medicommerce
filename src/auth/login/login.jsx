import { Box } from "@mui/system";
import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIclass } from "../../config";
const Login = () => {
  const api = new APIclass();
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const userCredentials = {
      email: email.value,
      password: password.value,
    };
    console.log(userCredentials);
    try {
      const res = await axios.post(`${api.baseUrl}login`, userCredentials);
      console.log(res.data);
      if (res.data.status === 200) {
        // localStorage.setItem("name", res.data.newData.name);
        localStorage.setItem("token", res.data.newData.token);
        localStorage.setItem("id", res.data.newData.id);
        localStorage.setItem("role", res.data.newData.role);

        if (res.data.newData.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
      className="bg-gray-100"
    >
      <Box className=" flex flex-col  bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md ">
        <Box className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Welcome back...!
        </Box>
        <Box className="mt-8">
          <form onSubmit={loginUser}>
            <Box
              sx={{
                mb: "1.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <Box className="relative">
                <Box className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10  text-gray-400 ">
                  <MdAlternateEmail />
                </Box>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className=" text-sm  placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 "
                  placeholder="Enter your email"
                />
              </Box>
            </Box>
            <Box
              sx={{
                mb: "1.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <BiLockAlt />
                  </span>
                </Box>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <button
                type="submit"
                className=" flex mt-2 items-center justify-center focus:outline-none  text-white text-sm sm:text-base  bg-blue-500  hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <BsFillArrowRightCircleFill className="text-[1.2rem]" />
                </span>
              </button>
            </Box>
          </form>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to="/signup"
          className=" inline-flex items-center  text-gray-700 font-medium text-xs text-center "
        >
          <span className="ml-2">
            Don't have an account?
            <p href="#" className="text-xs ml-2 text-blue-500 font-semibold">
              Signup here
            </p>
          </span>
        </Link>
        <Link
          to="/forget"
          className=" inline-flex items-center  text-gray-700 font-medium text-xs text-center "
        >
          <span className="ml-2">
            Forget passsword?
            <p href="#" className="text-xs ml-2 text-blue-500 font-semibold">
              Click here
            </p>
          </span>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
