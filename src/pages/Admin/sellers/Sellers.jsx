import React, { useState } from "react";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from "@mui/material";
import Module from "../../../components/Module/Module";
import ExpenseForm from "../../../components/expenseForm/ExpenseForm";
import { useGetSellersQuery } from "../../../context/api/sellerApi";

const Sellers = () => {
  const [expense, setExpense] = useState(null);
  const { data } = useGetSellersQuery();



  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sellers</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Tel</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.innerData.map((seller) => (
              <TableRow key={seller._id}>
                <TableCell>
                  <Button
                    onClick={() => handlePinClick(seller)}
                    aria-label={`Pin ${seller.fname} ${seller.lname}`}
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    {seller.pin ? (
                      <RiPushpinFill color="blue" />
                    ) : (
                      <RiPushpinLine color="blue" />
                    )}
                  </Button>
                  {seller.lname} {seller.fname}
                </TableCell>
                <TableCell>{seller.address}</TableCell>
                <TableCell>{seller.phone_primary || seller.phones}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: seller.budget < 0 ? "red" : "inherit",
                      fontWeight: seller.budget === 0 ? 'bold' : 'normal'
                    }}
                  >
                    {seller.budget}$
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => setExpense(seller)}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 0 }}
                    aria-label={`Make payment for ${seller.fname} ${seller.lname}`}
                  >
                    Expense
                  </Button>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/seller/${seller._id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      aria-label={`More details about ${seller.fname} ${seller.lname}`}
                    >
                      More...
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {expense && (
        <Module bg={"#aaa8"} close={() => setExpense(null)}>
          <ExpenseForm close={() => setExpense(null)} id={expense._id} />
        </Module>
      )}
    </Container>
  );
};

export default Sellers;
