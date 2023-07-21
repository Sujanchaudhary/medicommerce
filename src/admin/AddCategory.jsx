import { Box, Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { APIclass } from "../config";
import CategoryTable from "./CategoryTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddCategory = () => {
  const api = new APIclass();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
    };
    await axios
      .post(`${api.baseUrl}add-category`, formData, api.normalHeader)
      .then((res) => {
        console.log("success", res);
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>
              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: "grid", gap: 2, p: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Name"
                    name="name"
                    variant="filled"
                  />
                </Box>
                <Box>
                  <Button type="submit">Add category</Button>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <CategoryTable
                categoryDetails={categoryDetails}
                getCategory={getCategory}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddCategory;
