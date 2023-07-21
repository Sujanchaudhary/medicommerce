import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { APIclass } from "../config";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdminOrderTable = () => {
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);

  const [open, setOpen] = useState(false);
  const [i, setI] = useState("");
  console.log(i);
  const handleOpen = (data) => {
    setOpen(true);
    setI(data);
  };
  const handleClose = () => setOpen(false);

  const getCarts = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}get-all-order`, api.getHeader)
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
                  {p.orderDetails?.map((s) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <div key={s.id}>
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
                        <TableCell>
                          <Button
                            onClick={() => handleOpen(s.prescriptionImage)}
                          >
                            See Prescription
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Presccription!!!
                              </Typography>
                              <img src={api.imageUrl + i} />
                            </Box>
                          </Modal>
                        </TableCell>
                        {/* <TableCell></TableCell> */}
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
                    <TableCell align="left">
                      {s.paymentStatus === "unpaid" && (
                        <>
                          <span style={{ color: "#aaa" }}>Payment Status:</span>{" "}
                          <Chip color="error" label={s.paymentStatus} />
                        </>
                      )}
                      {s.paymentStatus === "paid" && (
                        <>
                          <span style={{ color: "#aaa" }}>Payment Status:</span>{" "}
                          <Chip color="error" label={s.paymentStatus} />
                        </>
                      )}
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

export default AdminOrderTable;
