import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { APIclass } from "../config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddProduct = () => {
  const api = new APIclass();

  const [categoryDetails, setCategoryDetails] = useState([]);

  const [check, setCheck] = useState(false);
  const [featured, setFeatured] = useState(false);

  const getCategory = useCallback(async () => {
    await axios
      .get(`${api.baseUrl}categories`, api.getHeader)
      .then((res) => {
        setCategoryDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
      mg: data.get("mg"),
      description: data.get("description"),
      prescription: check,
      type: data.get("type"),
      madeIn: data.get("madeIn"),
      madeBy: data.get("madeBy"),
      image: data.get("image"),
      quantity: data.get("quantity"),
      categoryId: data.get("categoryId"),
      price: data.get("price"),
      isFeatured: featured,
    };
    await axios
      .post(`${api.baseUrl}add-product`, formData, api.formHeader)
      .then((res) => {
        alert("successs");
        e.target.reset();
      })
      .catch((err) => {
        alert("error");
      });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>
              <Box component="form" encType="multipart" onSubmit={handleSubmit}>
                <Typography>Add Product</Typography>

                <Box sx={{ display: "grid", gap: 2, p: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Name"
                    name="name"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    type="number"
                    label="MG"
                    name="mg"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    label="Description"
                    name="description"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    label="Type"
                    name="type"
                    variant="filled"
                  />

                  <TextField
                    id="filled-basic"
                    name="image"
                    type="file"
                    variant="filled"
                  />

                  <TextField
                    id="filled-basic"
                    label="Made in"
                    name="madeIn"
                    variant="filled"
                  />
                  <TextField
                    id="filled-basic"
                    label="Made By"
                    name="madeBy"
                    variant="filled"
                  />
                  <TextField
                    type="number"
                    id="filled-basic"
                    name="quantity"
                    label="Quantity"
                    variant="filled"
                  />

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="categoryId"
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoryDetails.map((c) => {
                        return (
                          <MenuItem key={c.id} value={c.id}>
                            {c.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <TextField
                    type="number"
                    id="filled-basic"
                    label="Price"
                    name="price"
                    variant="filled"
                  />
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setCheck(e.target.checked)}
                          />
                        }
                        label="Pescription"
                      />
                    </FormGroup>
                  </Box>
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setFeatured(e.target.checked)}
                          />
                        }
                        label="Featured"
                      />
                    </FormGroup>
                  </Box>
                </Box>

                <Box>
                  <Button type="submit">Add product</Button>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddProduct;
