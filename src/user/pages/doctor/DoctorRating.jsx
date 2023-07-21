import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { APIclass } from "../../../config";
import { Rating, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DoctorRatingModal({ productDetails }) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleOpen = (data) => {
    setOpen(true);
    setId(data.id);
  };
  const handleClose = () => setOpen(false);

  const api = new APIclass();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      rating: data.get("rating"),
      review: data.get("review"),
    };

    await axios
      .post(`${api.baseUrl}add-drating/${id}`, formData, api.normalHeader)
      .then((res) => {
        alert("success", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Button onClick={() => handleOpen(productDetails)}>Rate</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 2, p: 2 }}>
              <Rating
                name="rating"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <TextField
                id="filled-basic"
                label="Review"
                name="review"
                variant="filled"
              />
            </Box>
            <Box>
              <Button type="submit">Add rating</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
