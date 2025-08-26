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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NewDemandConsumation: React.FC = () => {
   const [formData, setFormData] = useState({
      itemName: "",
      quantity: "",
      department: "",
      requestDate: "",
      neededByDate: "",
      reason: "",
   });

   const [errors, setErrors] = useState({
      itemName: false,
      quantity: false,
      department: false,
      requestDate: false,
      neededByDate: false,
      reason: false,
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
         console.log("Submitting new demand consumation data:", formData);
         // Simulate API call to create new demand consumation
         // On success, maybe navigate or show a success message
      }
   };

   return (
      <Box className="flex items-center p-6">
         <Card className="w-full max-w-5xl !shadow-none rounded-xl ">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Create New Demand Consumation
                  </Typography>
               </Box>
               <Divider className="mb-8" />
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
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
                        <FormControl
                           fullWidth
                           variant="outlined"
                           className="rounded-md"
                           error={errors.department}
                        >
                           <InputLabel id="department-select-label">Department</InputLabel>
                           <Select
                              labelId="department-select-label"
                              label="Department"
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                           >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="HR">HR</MenuItem>
                              <MenuItem value="IT">IT</MenuItem>
                              <MenuItem value="Finance">Finance</MenuItem>
                              <MenuItem value="Marketing">Marketing</MenuItem>
                           </Select>
                           {errors.department && (
                              <Typography className="text-red-500 text-sm mt-1">
                                 Department is required
                              </Typography>
                           )}
                        </FormControl>
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Request Date"
                           name="requestDate"
                           type="date"
                           value={formData.requestDate}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           InputLabelProps={{ shrink: true }}
                           error={errors.requestDate}
                           helperText={errors.requestDate ? "Request Date is required" : ""}
                           InputProps={{
                              endAdornment: errors.requestDate ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Needed By Date"
                           name="neededByDate"
                           type="date"
                           value={formData.neededByDate}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           InputLabelProps={{ shrink: true }}
                           error={errors.neededByDate}
                           helperText={errors.neededByDate ? "Needed By Date is required" : ""}
                           InputProps={{
                              endAdornment: errors.neededByDate ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Reason for Request"
                           name="reason"
                           multiline
                           rows={4}
                           value={formData.reason}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.reason}
                           helperText={errors.reason ? "Reason is required" : ""}
                           InputProps={{
                              endAdornment: errors.reason ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                  </Grid>
                  <Box className="flex justify-end mt-8">
                     <Button
                        type="submit"
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md"
                        startIcon={<AddCircleOutlineIcon />}
                     >
                        Submit Demand
                     </Button>
                  </Box>
               </form>
            </CardContent>
         </Card>
      </Box>
   );
};

export default NewDemandConsumation;
