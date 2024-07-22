import React from "react";
import { useGetCustomersBySearchQuery } from "../../context/api/customersApi";
import { Box, Typography } from "@mui/material";

const CustomerSearch = ({ search }) => {
  let { data, isError } = useGetCustomersBySearchQuery({ value: search });
  return (
    <>
      {isError ? (
        <Box sx={{ textAlign: 'center', mt: 2 }}>Not found</Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {data?.innerData?.map((el, index) => (
            <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
              <Typography>{el.fname} {el.lname}</Typography>
              <Typography>{el.phone_primary}</Typography>
              <Typography>{el.budget}$</Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default CustomerSearch;
