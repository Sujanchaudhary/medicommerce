import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Input } from "@mui/material";
import { APIclass } from "../../../../../config";

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

export default function BasicModal({ p }) {
  const api = new APIclass();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = React.useState();

  return (
    <div>
      <Button
        className="h-10 px-2 py-1 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
        onClick={handleOpen}
      >
        Add to cart
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form encType="multi-part" className="flex gap-3 flex-col">
            {p.prescription && (
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            )}

            <button
              type="button"
              className="h-10 px-2 py-1 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              onClick={async () =>
                await axios
                  .post(
                    `${api.baseUrl}add-cart/${p.id}`,
                    {
                      quantity: 1,
                      image: p.prescription ? file : null,
                    },
                    api.formHeader
                  )
                  .then((res) => {
                    alert("success");
                  })
                  .catch((err) => {
                    console.log(err);
                    alert("error while adding to cart");
                  })
              }
            >
              Add to Cart
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
