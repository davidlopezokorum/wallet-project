import React from 'react';
import Alert from "@mui/material/Alert";

export const SuccessAlert = ({message}) => {
  return(
    <Alert severity="success">
      {message}
    </Alert>
  )
}