import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { APIclass } from "../config";
import { TextField } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ProductEditModal({ row, getProduct, categoryDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = new APIclass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
      mg: data.get("mg"),
      description: data.get("description"),
      prescription: data.get("prescription"),
      type: data.get("type"),
      madeIn: data.get("madeIn"),
      madeBy: data.get("madeBy"),
      image: data.get("image"),
      quantity: data.get("quantity"),
      categoryId: data.get("categoryId"),
    };
    console.log(formData);
    await axios
      .post(`${api.baseUrl}/update-product/${row.id}`, formData, api.formHeader)
      .then((res) => {
        console.log("success", res);
        setOpen(false);
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Categoryx
          </Typography>
          <Box component="form" encType="multipart" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                p: 2,
                gridTemplateColumns: "repeat(2,1fr)",
              }}
            >
              <TextField
                id="filled-basic"
                label="Name"
                name="name"
                variant="filled"
              />
              <TextField
                id="filled-basic"
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
                name="prescription"
                label="Pescription"
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
            </Box>
            <Box>
              <Button type="submit">Add product</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
