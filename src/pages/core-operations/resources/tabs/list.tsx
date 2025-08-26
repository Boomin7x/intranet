import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Box,
   Card,
   CardContent,
   Chip,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   MenuItem,
   Paper,
   Select,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";

interface Resource {
   id: string;
   name: string;
   type: string;
   location: string;
   status: "Available" | "In Use" | "Maintenance" | "Retired";
   lastUpdated: string;
}

const ResourceList: React.FC = () => {
   const [resources, setResources] = useState<Resource[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchResources = async () => {
         // Replace with actual API call
         const mockData: Resource[] = [
            {
               id: "R001",
               name: "Conference Room A",
               type: "Meeting Room",
               location: "Floor 3",
               status: "Available",
               lastUpdated: "2024-07-20",
            },
            {
               id: "R002",
               name: "Projector - HR Dept",
               type: "Equipment",
               location: "HR Office",
               status: "In Use",
               lastUpdated: "2024-07-19",
            },
            {
               id: "R003",
               name: "Company Van #1",
               type: "Vehicle",
               location: "Parking Lot",
               status: "Maintenance",
               lastUpdated: "2024-07-18",
            },
            {
               id: "R004",
               name: "Laptop - IT Stock",
               type: "Equipment",
               location: "IT Storage",
               status: "Available",
               lastUpdated: "2024-07-21",
            },
         ];
         setResources(mockData);
      };
      fetchResources();
   }, []);

   const filteredResources = resources.filter(
      (resource) =>
         (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || resource.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Available":
            return "bg-green-100 text-green-800";
         case "In Use":
            return "bg-blue-100 text-blue-800";
         case "Maintenance":
            return "bg-yellow-100 text-yellow-800";
         case "Retired":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <Box className="flex ">
         <Card className="w-full !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               <Grid container spacing={3} className="my-6">
                  <Grid size={6}>
                     <Box className="flex items-center mb-6">
                        <Typography variant="h5" className="!font-semibold text-gray-800">
                           Resource List
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by name, type or location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-md"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <SearchIcon className="text-gray-500" />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid size={3}>
                     <FormControl fullWidth variant="outlined" className="rounded-md">
                        <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                        <Select
                           size="small"
                           labelId="status-filter-label"
                           label="Filter by Status"
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value as string)}
                        >
                           <MenuItem value="All">All</MenuItem>
                           <MenuItem value="Available">Available</MenuItem>
                           <MenuItem value="In Use">In Use</MenuItem>
                           <MenuItem value="Maintenance">Maintenance</MenuItem>
                           <MenuItem value="Retired">Retired</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">
                              Resource ID
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Resource Name
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Type</TableCell>
                           <TableCell className="font-semibold text-gray-700">Location</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Last Updated
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredResources.length > 0 ? (
                           filteredResources.map((resource) => (
                              <TableRow key={resource.id} className="hover:bg-gray-50">
                                 <TableCell>{resource.id}</TableCell>
                                 <TableCell>{resource.name}</TableCell>
                                 <TableCell>{resource.type}</TableCell>
                                 <TableCell>{resource.location}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={resource.status}
                                       className={`${getStatusColor(resource.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>{resource.lastUpdated}</TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() =>
                                          console.log(`View details for ${resource.id}`)
                                       }
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                 No resources found
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
            </CardContent>
         </Card>
      </Box>
   );
};

export default ResourceList;
