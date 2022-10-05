import React from 'react';
import Alert from "@mui/material/Alert";

export const SuccessAlert = ({message}) => {
  return(
    <Alert variant="outlined" severity="success">
      {message}
    </Alert>
  )
}