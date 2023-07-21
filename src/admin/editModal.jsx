import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { APIclass } from "../config";
import { TextField } from "@mui/material";
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

export default function CategoryModal({ row, getCategory }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = new APIclass();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      name: data.get("name"),
    };
    await axios
      .post(
        `${api.baseUrl}/update-category/${row.id}`,
        formData,
        api.normalHeader
      )
      .then((res) => {
        console.log("success", res);
        setOpen(false);
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>edit</Button>
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
        </Box>
      </Modal>
    </div>
  );
}
