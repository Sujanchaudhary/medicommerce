import { Box, Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { APIclass } from "../config";
import CategoryTable from "./CategoryTable";
import DoctorTable from "./DoctorTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddDoctor = () => {
  const api = new APIclass();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
      department: data.get("department"),
      fees: data.get("fees"),
      degree: data.get("degree"),
      image: data.get("image"),
    };
    await axios
      .post(`${api.baseUrl}add-doctor`, formData, api.formHeader)
      .then((res) => {
        alert("successfully added doctor");
        e.target.reset();
        getDoctor();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>
              <Box
                component="form"
                encType="multi-part"
                onSubmit={handleSubmit}
              >
                <Box sx={{ display: "grid", gap: 2, p: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Name"
                    name="name"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    label="Department"
                    name="department"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    type="file"
                    name="image"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    label="Fees"
                    name="fees"
                    variant="filled"
                    type="number"
                  />
                  <TextField
                    id="filled-basic"
                    label="Degree"
                    name="degree"
                    variant="filled"
                  />
                </Box>
                <Box>
                  <Button type="submit">Add Doctor</Button>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <DoctorTable
                doctorDetails={doctorDetails}
                getDoctor={getDoctor}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddDoctor;
