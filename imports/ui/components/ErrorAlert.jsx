import React from 'react';
import Alert from "@mui/material/Alert";

export const ErrorAlert = ({ message }) => {
  return (
    <Alert variant="outlined" severity="warning">
      {message}
    </Alert>
  );
};
