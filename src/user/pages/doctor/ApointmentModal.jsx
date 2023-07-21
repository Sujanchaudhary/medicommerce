import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { APIclass } from "../../../config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

export default function ApointmentModal({ row }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = new APIclass();

  const [productDetails, setProductDetails] = React.useState([]);

  const getProducts = React.useCallback(async () => {
    await axios
      .get(`${api.baseUrl}doctors`, api.getHeader)
      .then((res) => {
        setProductDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let formData = {
      patientName: data.get("patientName"),
      department: data.get("department"),
      date: data.get("date"),
      time: data.get("time"),
    };
    await axios
      .post(
        `${api.baseUrl}/add-appointment/${row.id}`,
        formData,
        api.normalHeader
      )
      .then((res) => {
        if (res.data.message === "Success") {
          alert("successfully appointed");
          setOpen(false);
        } else if (res.data.status === 402) {
          alert("doctor is already appointed for the date and time appointed");
        }
      })
      .catch((err) => {
        alert("error while creating appointment");
      });
  };

  return (
    <div>
      <Box
        className="flex cursor-pointer items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
        onClick={handleOpen}
      >
        Book now
        <EditIcon />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Appoint Doctor
          </Typography>
          <Box component="form" encType="multi-part" onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 2, p: 2 }}>
              <TextField
                id="filled-basic"
                label="Patient Name"
                name="patientName"
                variant="filled"
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="department"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {productDetails.map((c) => {
                    return (
                      <MenuItem key={c.id} value={c.id}>
                        {c.department}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                type="date"
                id="filled-basic"
                name="date"
                variant="filled"
              />
              <TextField
                type="time"
                id="filled-basic"
                label="Time"
                name="time"
                variant="filled"
              />
            </Box>
            <Box>
              <Button type="submit">Add Appointment</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
