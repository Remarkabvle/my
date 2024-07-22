import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Paper, Box, Divider } from "@mui/material";

import Module from "../../../components/Module/Module";
import Payment from "../../../components/paymeForm/Payment";
import UpdateCustomer from "../../../components/UpdateCustomer/UpdateCustomer";
import { useGetCustomerByIdQuery } from "../../../context/api/customersApi";
import { useGetPaymetByIdQuery } from "../../../context/api/paymetApi";

const Customer = () => {
  const [payment, setPayment] = useState(null);
  const [update, setUpdate] = useState(null);
  const [history, setHistory] = useState(false);
  const { id } = useParams();
  const { data } = useGetCustomerByIdQuery(id);
  const { data: store } = useGetPaymetByIdQuery(id);
  const customer = data?.innerData;

  const PaymentHistory = store?.innerData?.map((payment) => (
    <Box key={payment?.id} sx={{ p: 2, mb: 1, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="body2">Budget: {payment?.amount}$</Typography>
      <Typography variant="body2">Comment: {payment?.comment}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2">
        {payment?.adminId?.fname} {payment?.adminId?.lname}
      </Typography>
      <Typography variant="body2">{payment?.createdAt.slice(0, 10)}</Typography>
      <Typography variant="body2">{payment?.createdAt.slice(11, 16)}</Typography>
    </Box>
  ));

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {customer?.fname} {customer?.lname}
        </Typography>
        <Typography variant="body1">Phone: {customer?.phone_primary}</Typography>
        <Typography variant="body1">Budget: {customer?.budget}$</Typography>
        <Typography variant="body1">Address: {customer?.address}</Typography>
      </Paper>
      
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Admin Details</Typography>
        <Typography variant="body1">
          {customer?.adminId?.fname} {customer?.adminId?.lname}
        </Typography>
        <Typography variant="body1">{customer?.createdAt.slice(0, 10)}</Typography>
        <Typography variant="body1">{customer?.createdAt.slice(11, 16)}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setUpdate(customer)}>
            Update
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setPayment(customer)} sx={{ ml: 2 }}>
            Payment
          </Button>
          <Button variant="outlined" onClick={() => setHistory((prev) => !prev)} sx={{ ml: 2 }}>
            History
          </Button>
        </Box>
      </Paper>

      {update && (
        <Module width={350} bg={"#aaa8"} close={setUpdate}>
          <UpdateCustomer update={update} setUpdate={setUpdate} />
        </Module>
      )}
      {payment && (
        <Module bg={"#aaa8"} close={setPayment}>
          <Payment close={setPayment} id={payment._id} />
        </Module>
      )}
      {history && (
        <Module width={700} bg={"#aaa8"} close={setHistory}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Payment History</Typography>
            {PaymentHistory}
          </Box>
        </Module>
      )}
    </Box>
  );
};

export default Customer;
  