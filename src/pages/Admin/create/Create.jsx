import React, { useState } from "react";
import { Button, Container, TextField, Typography, Box } from "@mui/material";
import { useCreateCustomerMutation } from "../../../context/api/customersApi";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();
  const [createCustomer] = useCreateCustomerMutation();

  const handleCreate = async (e) => {
    e.preventDefault();
    let newCustomer = {
      fname,
      lname,
      phone_primary: phoneNumber,
      address,
      budget,
    };

    await createCustomer(newCustomer);
    navigate("/admin/customers");

    // Clear form fields
    setFname("");
    setLname("");
    setPhoneNumber("");
    setAddress("");
    setBudget("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Customer</Typography>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          mx: 'auto',
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <TextField
          required
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          label="First Name"
          variant="outlined"
        />
        <TextField
          required
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          label="Last Name"
          variant="outlined"
        />
        <TextField
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          variant="outlined"
        />
        <TextField
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          label="Budget"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default Create;
