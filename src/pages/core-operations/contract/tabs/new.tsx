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

const NewContract: React.FC = () => {
   const [formData, setFormData] = useState({
      contractName: "",
      vendor: "",
      startDate: "",
      endDate: "",
      amount: "",
      status: "",
      description: "",
   });

   const [errors, setErrors] = useState({
      contractName: false,
      vendor: false,
      startDate: false,
      endDate: false,
      amount: false,
      status: false,
      description: false,
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
         console.log("Submitting new contract data:", formData);
         // Simulate API call to create new contract
         // On success, maybe navigate or show a success message
      }
   };

   return (
      <Box className="flex items-center p-6">
         <Card className="w-full max-w-5xl !shadow-none rounded-xl ">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Create New Contract
                  </Typography>
               </Box>
               <Divider className="mb-8" />
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Contract Name"
                           name="contractName"
                           value={formData.contractName}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.contractName}
                           helperText={errors.contractName ? "Contract name is required" : ""}
                           InputProps={{
                              endAdornment: errors.contractName ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Vendor"
                           name="vendor"
                           value={formData.vendor}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.vendor}
                           helperText={errors.vendor ? "Vendor is required" : ""}
                           InputProps={{
                              endAdornment: errors.vendor ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Start Date"
                           name="startDate"
                           type="date"
                           value={formData.startDate}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           InputLabelProps={{ shrink: true }}
                           error={errors.startDate}
                           helperText={errors.startDate ? "Start Date is required" : ""}
                           InputProps={{
                              endAdornment: errors.startDate ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="End Date"
                           name="endDate"
                           type="date"
                           value={formData.endDate}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           InputLabelProps={{ shrink: true }}
                           error={errors.endDate}
                           helperText={errors.endDate ? "End Date is required" : ""}
                           InputProps={{
                              endAdornment: errors.endDate ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Amount"
                           name="amount"
                           type="number"
                           value={formData.amount}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.amount}
                           helperText={errors.amount ? "Amount is required" : ""}
                           InputProps={{
                              endAdornment: errors.amount ? (
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
                           error={errors.status}
                        >
                           <InputLabel id="status-select-label">Status</InputLabel>
                           <Select
                              labelId="status-select-label"
                              label="Status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                           >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="Draft">Draft</MenuItem>
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Expired">Expired</MenuItem>
                              <MenuItem value="Terminated">Terminated</MenuItem>
                           </Select>
                           {errors.status && (
                              <Typography className="text-red-500 text-sm mt-1">
                                 Status is required
                              </Typography>
                           )}
                        </FormControl>
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
                  </Grid>
                  <Box className="flex justify-end mt-8">
                     <Button
                        type="submit"
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md"
                        startIcon={<AddCircleOutlineIcon />}
                     >
                        Create Contract
                     </Button>
                  </Box>
               </form>
            </CardContent>
         </Card>
      </Box>
   );
};

export default NewContract;
