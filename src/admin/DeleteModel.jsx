import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { APIclass } from "../config";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function DeleteModal({ row, getProduct }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = new APIclass();
  const handleDelete = async () => {
    await axios
      .get(`${api.baseUrl}/delete-product/${row.id}`, api.getHeader)
      .then((res) => {
        alert("deleted successfully");
        getProduct();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <DeleteIcon className="text-red-800" onClick={handleOpen} />
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="error" onClick={handleDelete}>
              Okay
            </Button>
            <Button color="secondary" onClick={handleClose}>
              cancle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
