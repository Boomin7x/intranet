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

const NewResource: React.FC = () => {
   const [formData, setFormData] = useState({
      name: "",
      type: "",
      location: "",
      description: "",
   });

   const [errors, setErrors] = useState({
      name: false,
      type: false,
      location: false,
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
         console.log("Submitting new resource data:", formData);
         // Simulate API call to create new resource
         // On success, maybe navigate or show a success message
      }
   };

   return (
      <Box
         component="form"
         noValidate
         autoComplete="off"
         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
         {/* <h2>Create New Resource</h2> */}
         <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-5xl !shadow-none rounded-xl ">
               <CardContent className="p-8 bg-white">
                  <Box className="flex items-center mb-6">
                     <Typography variant="h5" className="!font-semibold text-gray-800">
                        New Resource Details
                     </Typography>
                  </Box>
                  <Divider className="mb-8" />
                  <Grid container spacing={4}>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Resource Name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.name}
                           helperText={errors.name ? "Resource name is required" : ""}
                           InputProps={{
                              endAdornment: errors.name ? (
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
                           error={errors.type}
                        >
                           <InputLabel id="resource-type-label">Resource Type</InputLabel>
                           <Select
                              labelId="resource-type-label"
                              label="Resource Type"
                              name="type"
                              value={formData.type}
                              onChange={handleChange}
                           >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="Meeting Room">Meeting Room</MenuItem>
                              <MenuItem value="Equipment">Equipment</MenuItem>
                              <MenuItem value="Vehicle">Vehicle</MenuItem>
                              <MenuItem value="Software License">Software License</MenuItem>
                           </Select>
                           {errors.type && (
                              <Typography className="text-red-500 text-sm mt-1">
                                 Resource type is required
                              </Typography>
                           )}
                        </FormControl>
                     </Grid>
                     <Grid size={12}>
                        <TextField
                           fullWidth
                           label="Location"
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           variant="outlined"
                           className="rounded-md"
                           error={errors.location}
                           helperText={errors.location ? "Location is required" : ""}
                           InputProps={{
                              endAdornment: errors.location ? (
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
                        Create Resource
                     </Button>
                  </Box>
               </CardContent>
            </Card>
         </form>
      </Box>
   );
};

export default NewResource;
