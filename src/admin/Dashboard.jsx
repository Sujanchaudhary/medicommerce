import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { RiProductHuntLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa";
import LineChart from "./components/LineChart";
import { APIclass } from "../config";
import axios from "axios";

const Dashboard = () => {
  const api = new APIclass();

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

  const [doctorDetails, setDoctorDetails] = useState([]);

  const getDoctor = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}doctors`, api.getHeader)
      .then((res) => {
        setDoctorDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const [productDetails, setProductDetails] = React.useState([]);

  const getProduct = React.useCallback(async () => {
    await axios
      .get(`${api.baseUrl}products`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    getProduct();
  }, [getProduct]);

  const [orderDetails, setOrderDetails] = useState([]);

  const getCarts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-all-order`, api.getHeader)
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCarts();
  }, [getCarts]);
  const sum = orderDetails?.reduce((total, item) => {
    return total + Number(item.totalAmount);
  }, 0);
  console.log(sum);
  const [apoDetails, setApoDetails] = useState([]);

  const getDoctors = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}admin-all-appointment`, api.getHeader)
      .then((res) => {
        setApoDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#67e263",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>Orders</h5>
                <p>{orderDetails.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <AiOutlineShoppingCart />
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#ffa95b",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Category
                </h5>
                <p>{categoryDetails.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <BiCategoryAlt />
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#b08bcf",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Products
                </h5>
                <p>{productDetails.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <RiProductHuntLine />
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#719ebb",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Doctors
                </h5>
                <p>{doctorDetails.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <FaWpforms />
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "grey",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Appointment
                </h5>
                <p>{apoDetails.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <BiCategoryAlt />
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "red",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
              className="d-flex justify-content-center align-items-center gap-4 pt-3 shadow rounded"
            >
              <div>
                <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Total Sales
                </h5>
                <p>Rs. {sum}</p>
              </div>
              <div>
                <p style={{ fontSize: "35px" }}>
                  <BiCategoryAlt />
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        <div style={{ maxWidth: "70%", marginTop: "30px" }}>
          <LineChart />
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
