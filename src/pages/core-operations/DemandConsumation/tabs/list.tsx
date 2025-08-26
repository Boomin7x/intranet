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

interface DemandConsumation {
   id: string;
   itemName: string;
   department: string;
   quantity: number;
   requestDate: string;
   status: "Pending" | "Approved" | "Rejected" | "Fulfilled";
}

const DemandConsumationList: React.FC = () => {
   const [demands, setDemands] = useState<DemandConsumation[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchDemands = async () => {
         // Replace with actual API call
         const mockData: DemandConsumation[] = [
            {
               id: "DC001",
               itemName: "Printer Paper",
               department: "Admin",
               quantity: 10,
               requestDate: "2024-07-15",
               status: "Pending",
            },
            {
               id: "DC002",
               itemName: "Staplers",
               department: "Office Supplies",
               quantity: 5,
               requestDate: "2024-07-10",
               status: "Approved",
            },
            {
               id: "DC003",
               itemName: "Ink Cartridges",
               department: "IT",
               quantity: 3,
               requestDate: "2024-07-12",
               status: "Fulfilled",
            },
            {
               id: "DC004",
               itemName: "Whiteboard Markers",
               department: "Marketing",
               quantity: 20,
               requestDate: "2024-07-18",
               status: "Rejected",
            },
         ];
         setDemands(mockData);
      };
      fetchDemands();
   }, []);

   const filteredDemands = demands.filter(
      (demand) =>
         (demand.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demand.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || demand.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Pending":
            return "bg-yellow-100 text-yellow-800";
         case "Approved":
            return "bg-green-100 text-green-800";
         case "Rejected":
            return "bg-red-100 text-red-800";
         case "Fulfilled":
            return "bg-blue-100 text-blue-800";
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
                           Demand Consumation List
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by item or department"
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
                           <MenuItem value="Pending">Pending</MenuItem>
                           <MenuItem value="Approved">Approved</MenuItem>
                           <MenuItem value="Rejected">Rejected</MenuItem>
                           <MenuItem value="Fulfilled">Fulfilled</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">Demand ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">Item Name</TableCell>
                           <TableCell className="font-semibold text-gray-700">Department</TableCell>
                           <TableCell className="font-semibold text-gray-700">Quantity</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Request Date
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredDemands.length > 0 ? (
                           filteredDemands.map((demand) => (
                              <TableRow key={demand.id} className="hover:bg-gray-50">
                                 <TableCell>{demand.id}</TableCell>
                                 <TableCell>{demand.itemName}</TableCell>
                                 <TableCell>{demand.department}</TableCell>
                                 <TableCell>{demand.quantity}</TableCell>
                                 <TableCell>{demand.requestDate}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={demand.status}
                                       className={`${getStatusColor(demand.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => console.log(`View details for ${demand.id}`)}
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                 No demand consumations found
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

export default DemandConsumationList;
