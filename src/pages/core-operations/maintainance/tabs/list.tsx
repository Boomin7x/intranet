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

interface MaintenanceRequest {
   id: string;
   resource: string;
   issue: string;
   priority: "Low" | "Medium" | "High" | "Urgent";
   requestedDate: string;
   status: "Open" | "In Progress" | "Completed" | "Cancelled";
}

const MaintainanceList: React.FC = () => {
   const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchMaintenanceRequests = async () => {
         // Replace with actual API call
         const mockData: MaintenanceRequest[] = [
            {
               id: "M001",
               resource: "HVAC Unit - Main Office",
               issue: "AC not cooling",
               priority: "High",
               requestedDate: "2024-07-20",
               status: "In Progress",
            },
            {
               id: "M002",
               resource: "Projector - Meeting Room B",
               issue: "Lamp burnt out",
               priority: "Medium",
               requestedDate: "2024-07-18",
               status: "Open",
            },
            {
               id: "M003",
               resource: "Company Car #2",
               issue: "Flat tire",
               priority: "Urgent",
               requestedDate: "2024-07-22",
               status: "Completed",
            },
            {
               id: "M004",
               resource: "Office Printer",
               issue: "Paper jam frequently",
               priority: "Low",
               requestedDate: "2024-07-15",
               status: "Cancelled",
            },
         ];
         setMaintenanceRequests(mockData);
      };
      fetchMaintenanceRequests();
   }, []);

   const filteredMaintenanceRequests = maintenanceRequests.filter(
      (request) =>
         (request.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.issue.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || request.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Open":
            return "bg-yellow-100 text-yellow-800";
         case "In Progress":
            return "bg-blue-100 text-blue-800";
         case "Completed":
            return "bg-green-100 text-green-800";
         case "Cancelled":
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
                           Maintenance Request List
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by resource or issue"
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
                           <MenuItem value="Open">Open</MenuItem>
                           <MenuItem value="In Progress">In Progress</MenuItem>
                           <MenuItem value="Completed">Completed</MenuItem>
                           <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">Request ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Resource/Equipment
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Issue</TableCell>
                           <TableCell className="font-semibold text-gray-700">Priority</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Requested Date
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredMaintenanceRequests.length > 0 ? (
                           filteredMaintenanceRequests.map((request) => (
                              <TableRow key={request.id} className="hover:bg-gray-50">
                                 <TableCell>{request.id}</TableCell>
                                 <TableCell>{request.resource}</TableCell>
                                 <TableCell>{request.issue}</TableCell>
                                 <TableCell>{request.priority}</TableCell>
                                 <TableCell>{request.requestedDate}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={request.status}
                                       className={`${getStatusColor(request.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => console.log(`View details for ${request.id}`)}
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                 No maintenance requests found
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

export default MaintainanceList;
