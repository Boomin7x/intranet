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

const NewBudget: React.FC = () => {
   const [formData, setFormData] = useState({
      budgetName: "",
      amount: "",
      department: "",
      startDate: "",
      endDate: "",
      description: "",
   });

   const [errors, setErrors] = useState({
      budgetName: false,
      amount: false,
      department: false,
      startDate: false,
      endDate: false,
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
         console.log("Submitting new budget data:", formData);
         // Simulate API call to create new budget
         // On success, maybe navigate or show a success message
      }
   };

   return (
      <Box className="flex items-center p-6">
         <Card className="w-full max-w-5xl !shadow-none rounded-xl ">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Create New Budget
                  </Typography>
               </Box>
               <Divider className="mb-8" />
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Budget Name"
                           name="budgetName"
                           value={formData.budgetName}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.budgetName}
                           helperText={errors.budgetName ? "Budget name is required" : ""}
                           InputProps={{
                              endAdornment: errors.budgetName ? (
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
                        Create Budget
                     </Button>
                  </Box>
               </form>
            </CardContent>
         </Card>
      </Box>
   );
};

export default NewBudget;
