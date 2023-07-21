import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CategoryModal from "./editModal";
import axios from "axios";
import { APIclass } from "../config";
import { Avatar, Box } from "@mui/material";
import DeleteModal from "./DeleteModel";
import ProductEditModal from "./EditProduct";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

export default function ProductTable() {
  const api = new APIclass();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  //   categoryId: 2;
  //   createdAt: "2023-02-28T16:13:08.000Z";
  //   description: "jh";
  //   id: 2;
  //   image: "2023-02-28T16-13-08.865Z-Screenshot 2022-10-25 134418.png";
  //   madeBy: "kj";
  //   madeIn: "kjjh";
  //   mg: "kj";
  //   name: "hkjhkj";
  //   prescription: false;
  //   quantity: "hkj";
  //   type: "kjhkj";

  const [categoryDetails, setCategoryDetails] = React.useState([]);

  const getCategory = React.useCallback(async () => {
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

  React.useEffect(() => {
    getCategory();
  }, [getCategory]);

  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>S.N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Pescription</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Avatar src={api.imageUrl + row.image} alt="hello" />
                    </TableCell>
                    <TableCell>
                      {row.prescription ? (
                        <span className="text-red-500">required</span>
                      ) : (
                        "not required"
                      )}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <InfoIcon
                          onClick={() => navigate(`/admin/products/${row.id}`)}
                        />
                        <DeleteModal row={row} getProduct={getProduct} />
                        <ProductEditModal
                          row={row}
                          getProduct={getProduct}
                          categoryDetails={categoryDetails}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
