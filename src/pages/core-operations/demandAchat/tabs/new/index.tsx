import React, { useState } from "react";
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NewDemandAchat: React.FC = () => {
   const [formData, setFormData] = useState({
      itemName: "",
      description: "",
      quantity: "",
      unitPrice: "",
      total: "",
      budgetId: "",
   });

   const [errors, setErrors] = useState({
      itemName: false,
      description: false,
      quantity: false,
      unitPrice: false,
      total: false,
      budgetId: false,
   });

   const handleChange = (
      e:
         | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
         | { target: { name: string; value: unknown } },
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: false }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      let hasError = false;
      const newErrors = { ...errors };

      Object.keys(formData).forEach((key) => {
         if (!formData[key as keyof typeof formData]) {
            newErrors[key as keyof typeof errors] = true;
            hasError = true;
         }
      });

      setErrors(newErrors);

      if (!hasError) {
         // Simulate POST to API
         console.log("Submitting form data:", formData);
         // Trigger workflow initiation here
      }
   };

   const calculateTotal = () => {
      const qty = parseFloat(formData.quantity) || 0;
      const price = parseFloat(formData.unitPrice) || 0;
      const total = qty * price;
      setFormData((prev) => ({ ...prev, total: total.toFixed(2) }));
   };

   return (
      <Box className="flex  items-center   p-6">
         <Card className="w-full max-w-4xl !shadow-none rounded-xl ">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  {/* <AddShoppingCartIcon className="text-blue-600 mr-3" fontSize="large" /> */}
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     New Procurement Request
                  </Typography>
               </Box>
               <Divider className="mb-8" />
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                     {/* Item Details Section */}
                     {/* <Grid size={12}>
                        <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                           Item Details
                        </Typography>
                     </Grid> */}
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Item Name"
                           name="itemName"
                           value={formData.itemName}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.itemName}
                           helperText={errors.itemName ? "Item name is required" : ""}
                           InputProps={{
                              endAdornment: errors.itemName ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Quantity"
                           name="quantity"
                           type="number"
                           value={formData.quantity}
                           onChange={handleChange}
                           onBlur={calculateTotal}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.quantity}
                           helperText={errors.quantity ? "Quantity is required" : ""}
                           InputProps={{
                              endAdornment: errors.quantity ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Description"
                           name="description"
                           multiline
                           rows={4}
                           value={formData.description}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.description}
                           helperText={errors.description ? "Description is required" : ""}
                           InputProps={{
                              endAdornment: errors.description ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Unit Price"
                           name="unitPrice"
                           type="number"
                           value={formData.unitPrice}
                           onChange={handleChange}
                           onBlur={calculateTotal}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.unitPrice}
                           helperText={errors.unitPrice ? "Unit price is required" : ""}
                           InputProps={{
                              endAdornment: errors.unitPrice ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Total Amount"
                           name="total"
                           value={formData.total}
                           variant="outlined"
                           className="rounded-md bg-gray-50"
                           InputProps={{
                              readOnly: true,
                              endAdornment: <CheckCircleOutlineIcon className="text-green-500" />,
                           }}
                        />
                     </Grid>

                     {/* Budget Selection Section */}
                     <Grid size={12}>
                        <Divider className="my-4" />
                        <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                           Budget Selection
                        </Typography>
                        {/* End of Budget Selection Section */}
                     </Grid>
                     <Grid size={12}>
                        <FormControl
                           fullWidth
                           variant="outlined"
                           className="rounded-md"
                           error={errors.budgetId}
                        >
                           <InputLabel id="budget-select-label">Select Budget</InputLabel>
                           <Select
                              labelId="budget-select-label"
                              label="Select Budget"
                              name="budgetId"
                              value={formData.budgetId}
                              onChange={handleChange}
                           >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="budget1">
                                 Budget 2025 - Department A (Available: $50,000)
                              </MenuItem>
                              <MenuItem value="budget2">
                                 Budget 2025 - Department B (Available: $30,000)
                              </MenuItem>
                              <MenuItem value="budget3">
                                 Budget 2025 - General (Available: $100,000)
                              </MenuItem>
                           </Select>
                           {errors.budgetId && (
                              <Typography className="text-red-500 text-sm mt-1">
                                 Budget selection is required
                              </Typography>
                           )}
                        </FormControl>
                     </Grid>
                  </Grid>

                  {/* Submit Button */}
                  <Box className="flex justify-end mt-8">
                     <Button
                        type="submit"
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md"
                        startIcon={<AddShoppingCartIcon />}
                     >
                        Submit Request
                     </Button>
                  </Box>
               </form>
            </CardContent>
         </Card>
      </Box>
   );
};

export default NewDemandAchat;
