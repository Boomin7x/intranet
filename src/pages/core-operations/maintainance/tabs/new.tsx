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

const NewMaintainance: React.FC = () => {
   const [formData, setFormData] = useState({
      resource: "",
      issue: "",
      priority: "",
      requestedDate: "",
      description: "",
   });

   const [errors, setErrors] = useState({
      resource: false,
      issue: false,
      priority: false,
      requestedDate: false,
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
         console.log("Submitting new maintenance request:", formData);
         // Simulate API call to create new maintenance request
         // On success, maybe navigate or show a success message
      }
   };

   return (
      <Box className="flex items-center p-6">
         <Card className="w-full max-w-5xl !shadow-none rounded-xl ">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Create New Maintenance Request
                  </Typography>
               </Box>
               <Divider className="mb-8" />
               <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Resource/Equipment"
                           name="resource"
                           value={formData.resource}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.resource}
                           helperText={errors.resource ? "Resource/Equipment is required" : ""}
                           InputProps={{
                              endAdornment: errors.resource ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Issue Description"
                           name="issue"
                           multiline
                           rows={4}
                           value={formData.issue}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.issue}
                           helperText={errors.issue ? "Issue description is required" : ""}
                           InputProps={{
                              endAdornment: errors.issue ? (
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
                           error={errors.priority}
                        >
                           <InputLabel id="priority-select-label">Priority</InputLabel>
                           <Select
                              labelId="priority-select-label"
                              label="Priority"
                              name="priority"
                              value={formData.priority}
                              onChange={handleChange}
                           >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="Low">Low</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="High">High</MenuItem>
                              <MenuItem value="Urgent">Urgent</MenuItem>
                           </Select>
                           {errors.priority && (
                              <Typography className="text-red-500 text-sm mt-1">
                                 Priority is required
                              </Typography>
                           )}
                        </FormControl>
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Requested Date"
                           name="requestedDate"
                           type="date"
                           value={formData.requestedDate}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           InputLabelProps={{ shrink: true }}
                           error={errors.requestedDate}
                           helperText={errors.requestedDate ? "Requested Date is required" : ""}
                           InputProps={{
                              endAdornment: errors.requestedDate ? (
                                 <ErrorOutlineIcon className="text-red-500" />
                              ) : null,
                           }}
                        />
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Additional Description"
                           name="description"
                           multiline
                           rows={4}
                           value={formData.description}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.description}
                           helperText={
                              errors.description ? "Additional description is required" : ""
                           }
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
                        Submit Request
                     </Button>
                  </Box>
               </form>
            </CardContent>
         </Card>
      </Box>
   );
};

export default NewMaintainance;
