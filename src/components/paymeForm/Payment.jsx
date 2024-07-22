import React, { useEffect, useState } from "react";
import { useCreatePaymetMutation } from "../../context/api/paymetApi";
import { Box, Button, TextField, Typography } from "@mui/material";

const Payment = ({ id, close }) => {
  let initialState = {
    customerId: id,
    amount: "",
    comment: "",
  };

  const [payme, setPayme] = useState(initialState);
  const [paymeCreate, { isLoading, isSuccess }] = useCreatePaymetMutation(id);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setPayme((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paymeCreate(payme);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" textAlign="center" pb={2}>Payme Create</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="amount"
          value={payme.amount}
          name="amount"
          onChange={handleChange}
          type="number"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          placeholder="comment"
          value={payme.comment}
          name="comment"
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>{isLoading ? "Loading..." : "Save"}</Button>
      </form>
    </Box>
  );
};

export default Payment;
