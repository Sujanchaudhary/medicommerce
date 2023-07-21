import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { APIclass } from "../../config";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import KhaltiPayment from "./khalti/KhaltiPayment";

const OrderDetails = () => {
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);

  const getCarts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-my-order`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  console.log(productDetails);
  return (
    <div>
      <Container>
        <TableContainer component={Paper}>
          <h2>Order Items</h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Details</TableCell>

                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">OrderDate</TableCell>
              </TableRow>
            </TableHead>

            {productDetails.map((p, index) => {
              return (
                <TableBody key={index}>
                  {p.orderDetails.map((s) => {
                    return (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div>
                            <img
                              src={api.imageUrl + s.product.image}
                              style={{ width: "200px" }}
                            />

                            <div align="left">
                              <span>Name: {s.product.name}</span>
                              <span>Rs.{s.product.price}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <span>{s.quantity}</span>
                        </TableCell>
                        <TableCell align="left">
                          <span>{s.createdAt.slice(0, 10)}</span>
                        </TableCell>
                        <TableCell align="left">
                          <KhaltiPayment order={s.id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <h2>Order Detailes</h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {productDetails.map((s) => {
                return (
                  <TableRow key={s.id}>
                    <TableCell align="left">
                      <span style={{ color: "#aaa" }}>Order ID:</span> {s.id}
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ color: "#aaa" }}>Customer Name:</span>{" "}
                      {s.name}
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ color: "#aaa" }}>Total Amount:</span>{" "}
                      {s.totalAmount}
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ color: "#aaa" }}>Phone Number:</span>{" "}
                      {s.phone}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default OrderDetails;
