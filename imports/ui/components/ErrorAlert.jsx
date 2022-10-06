import React from 'react';
import Alert from "@mui/material/Alert";

export const ErrorAlert = ({ message }) => {
  return (
    <Alert severity="warning">
      {message}
    </Alert>
  );
};
