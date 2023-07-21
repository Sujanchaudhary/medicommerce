import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { APIclass } from "../../../config";
import { Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Prescribtion({ productDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = new APIclass();

  return (
    <div>
      <Button sx={{ fontSize: "12px", cursor: "pointer" }} onClick={handleOpen}>
        Prescription
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Presciption!!!
          </Typography>
          <img src={api.imageUrl + productDetails.user?.prescribtion} />
        </Box>
      </Modal>
    </div>
  );
}
