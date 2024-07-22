import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Container, Box, CircularProgress } from "@mui/material";
import { useCreateProductMutation } from "../../../context/api/productApi";
import { useGetSellersBySearchQuery } from "../../../context/api/sellerApi";

const CreateProduct = () => {
  const [value, setValue] = useState("");
  const [seller, setSeller] = useState(null);

  const { data, isError } = useGetSellersBySearchQuery({ value: value.trim() });
  const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();

  const [formValues, setFormValues] = useState({
    title: "",
    quantity: "",
    price: "",
    category: "",
    comment: "",
    units: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = { ...formValues, seller: seller._id };
    createProduct(newProduct);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Product</Typography>
      {seller ? (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>{seller?.fname}</Typography>
          <Button variant="outlined" color="error" onClick={() => setSeller(null)}>Cancel</Button>
        </Box>
      ) : (
        <TextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Enter seller name"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}
      <Box sx={{ mb: 2 }}>
        {!value.trim() ? null : isError ? (
          <Typography color="error">Not found</Typography>
        ) : (
          data?.innerData?.map((item) => (
            <Button
              key={item._id}
              fullWidth
              variant="outlined"
              onClick={() => {
                setSeller(item);
                setValue("");
              }}
              sx={{ mb: 1 }}
            >
              {item?.fname}
            </Button>
          ))
        )}
      </Box>
      {seller && (
        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
          <form onSubmit={handleCreateProduct}>
            <TextField
              name="title"
              value={formValues.title}
              onChange={handleChange}
              label="Title"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              name="quantity"
              value={formValues.quantity}
              onChange={handleChange}
              label="Quantity"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              name="price"
              value={formValues.price}
              onChange={handleChange}
              label="Price"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Units</InputLabel>
              <Select
                name="units"
                value={formValues.units}
                onChange={handleChange}
                label="Units"
              >
                <MenuItem value="dona">dona</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="litr">litr</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formValues.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="book">Book</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="technical">Technical</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="comment"
              value={formValues.comment}
              onChange={handleChange}
              label="Comment"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
            </Button>
            {isSuccess && <Typography color="success.main" sx={{ mt: 2 }}>Product created successfully!</Typography>}
          </form>
        </Box>
      )}
    </Container>
  );
};

export default CreateProduct;
