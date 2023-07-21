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
import { Avatar } from "@mui/material";
import { APIclass } from "../config";
import EditDoctor from "./EditDoctor";
import DeleteDoctor from "./DeleteDoctor";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function AdminAppointmentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const api = new APIclass();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [doctorDetails, setDoctorDetails] = useState([]);

  const getDoctor = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}admin-all-appointment`, api.getHeader)
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>S.N</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Doctor Name</TableCell>

              <TableCell>Time</TableCell>

              <TableCell>Date</TableCell>
              <TableCell>Fees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.patientName}</TableCell>
                    <TableCell>{row.doctor.department}</TableCell>
                    <TableCell>{row.doctor.name}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.doctor.fees}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={doctorDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
