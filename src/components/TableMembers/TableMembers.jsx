import React, { useEffect, useState } from "react";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import {
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../context/api/customersApi";
import { Link } from "react-router-dom";
import Module from "../Module/Module";
import Pagination from "@mui/material/Pagination";
import Payment from "../paymeForm/Payment";
import { Box, Button, Select, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useGetProfileQuery } from "../../context/api/AdminApi";

const TableMembers = () => {
  const [payment, setPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [debtFilter, setDebtFilter] = useState("2");
  const [paidToday, setPaidToday] = useState("2");
  const [createdAt, setCreatedAt] = useState("-1");
  const [budget, setBudget] = useState("0");
  const [paid, setPaid] = useState(true);
  const [pinCustom] = useUpdateCustomerMutation();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { user, refetch } = useGetProfileQuery();
  const { data } = useGetCustomersQuery({
    page: page - 1,
    limit: 6,
    debtFilter,
    paidToday,
    createdAt,
    budget,
    paid,
  });

  const handlePin = async (id, pinned) => {
    try {
      await pinCustom({ id, pinned });
      refetch();
    } catch (error) {
      console.error("Failed to update pin status:", error);
    }
  };

  return (
    <>
      {payment && (
        <Module close={setPayment}>
          <Payment close={setPayment} />
        </Module>
      )}

      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Select value={debtFilter} onChange={(e) => setDebtFilter(e.target.value)}>
            <MenuItem value="0">Paid</MenuItem>
            <MenuItem value="1">Not Paid</MenuItem>
            <MenuItem value="2">All</MenuItem>
          </Select>
          <Select value={paidToday} onChange={(e) => setPaidToday(e.target.value)}>
            <MenuItem value="0">Paid Today</MenuItem>
            <MenuItem value="1">Not Paid Today</MenuItem>
            <MenuItem value="2">All</MenuItem>
          </Select>
          <Select value={createdAt} onChange={(e) => setCreatedAt(e.target.value)}>
            <MenuItem value="1">Recent</MenuItem>
            <MenuItem value="-1">All</MenuItem>
          </Select>
          <Select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <MenuItem value="1">Budget   1000$</MenuItem>
            <MenuItem value="0">All</MenuItem>
          </Select>
          <Select value={paid} onChange={(e) => setPaid(e.target.value === "true")}>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">InActive</MenuItem>
          </Select>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Debt</TableCell>
                <TableCell>Pay</TableCell>
                <TableCell>Pin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.innerData?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.fname}</TableCell>
                  <TableCell>{customer.phone_primary}</TableCell>
                  <TableCell>{customer.debt}</TableCell>
                  <TableCell>
                    <Button onClick={() => setPayment(customer.id)}>Pay</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handlePin(customer.id, !customer.pinned)}>
                      {customer.pinned ? <RiPushpinFill /> : <RiPushpinLine />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems="center" mt={2}>
          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </>
  );
};

export default TableMembers;
