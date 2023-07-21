import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddPrescribtion = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h5">Add Prescribtion</Typography>
        <Box>
          <Typography variant="h6">Upload Prescribtion</Typography>
          <Box>
            <input type="file" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPrescribtion;
