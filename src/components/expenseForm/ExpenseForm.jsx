import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Paper, CircularProgress } from "@mui/material";
import { useCreateExpenseMutation } from "../../context/api/expenseApi";

const ExpenseForm = ({ id, close }) => {
  const initialState = {
    sellerId: id,
    amount: "",
    comment: "",
  };

  const [expense, setExpense] = useState(initialState);
  const [expenseCreate, { data, isLoading, isSuccess }] = useCreateExpenseMutation(id);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    expenseCreate(expense);
  };

  useEffect(() => {
    if (isSuccess) {
      close(false);
    }
  }, [isSuccess]);

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Create Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Comment"
            name="comment"
            value={expense.comment}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
