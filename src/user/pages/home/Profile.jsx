import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { APIclass } from "../../../config";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteAppointment from "./DeleteAppointment";
import EditApointment from "./EditAppointment";
import Degree from "./Degree";
import Prescribtion from "./Prescription";
import EditProfile from "./EditProfile";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Profiles = () => {
  let img =
    "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI";
  const api = new APIclass();
  const [productDetails, setProductDetails] = useState([]);
  const [details, setDetails] = useState([]);

  const getProfile = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}profile`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.profile);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getAppointments = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}appointments`, api.getHeader)
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getProfile();
    getAppointments();
  }, [getProfile, getAppointments]);
  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Box sx={{ flexGrow: 1, pb: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src={api.imageUrl + productDetails.image}
                  sx={{ width: 150, height: 150 }}
                />
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5">
                Name: {productDetails?.user?.name}
              </Typography>
              <Typography style={{ color: "#aaa" }}>Age: 21</Typography>
              <Typography style={{ color: "#aaa" }}>
                Email: {productDetails?.user?.email}
              </Typography>
              <Box>
                <EditProfile />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box variant="contained" color="primary" sx={{ pb: 3 }}>
          <Prescribtion productDetails={productDetails} />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.N</TableCell>
                <TableCell align="right">Patient Name</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Doctor Name</TableCell>
                <TableCell align="right">Fee</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{row.patientName}</TableCell>
                  <TableCell align="right">{row.department}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">
                    {row.doctor.name}
                    <Degree row={row} />
                  </TableCell>
                  <TableCell align="right">{row.doctor.fees}</TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <DeleteAppointment
                        row={row}
                        getAppointments={getAppointments}
                      />
                      <EditApointment
                        row={row}
                        getAppointments={getAppointments}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Profiles;
