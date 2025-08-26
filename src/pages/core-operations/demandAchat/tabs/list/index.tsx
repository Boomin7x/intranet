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

interface Request {
   id: string;
   itemName: string;
   department: string;
   date: string;
   amount: number;
   status: "Draft" | "Pending" | "Approved" | "Rejected";
}

const DemandAchatList: React.FC = () => {
   const [requests, setRequests] = useState<Request[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchRequests = async () => {
         // Replace with actual API call
         const mockData: Request[] = [
            {
               id: "1",
               itemName: "Office Chairs",
               department: "HR",
               date: "2025-08-20",
               amount: 5000,
               status: "Pending",
            },
            {
               id: "2",
               itemName: "Laptops",
               department: "IT",
               date: "2025-08-18",
               amount: 15000,
               status: "Approved",
            },
            {
               id: "3",
               itemName: "Printers",
               department: "Finance",
               date: "2025-08-15",
               amount: 3000,
               status: "Draft",
            },
            {
               id: "4",
               itemName: "Projectors",
               department: "Marketing",
               date: "2025-08-10",
               amount: 7000,
               status: "Rejected",
            },
         ];
         setRequests(mockData);
      };
      fetchRequests();
   }, []);

   const filteredRequests = requests.filter(
      (request) =>
         (request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || request.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Approved":
            return "bg-green-100 text-green-800";
         case "Pending":
            return "bg-yellow-100 text-yellow-800";
         case "Rejected":
            return "bg-red-100 text-red-800";
         case "Draft":
            return "bg-gray-100 text-gray-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <Box className="flex  ">
         <Card className="w-full  !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               {/* <Divider className="mb-6" /> */}

               {/* Search and Filter */}
               <Grid container spacing={3} className="my-6">
                  <Grid size={6}>
                     <Box className="flex items-center mb-6">
                        {/* <SearchIcon className="text-blue-600 mr-3" fontSize="large" /> */}
                        <Typography variant="h5" className="!font-semibold text-gray-800">
                           Procurement Request List
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
                           <MenuItem value="Draft">Draft</MenuItem>
                           <MenuItem value="Pending">Pending</MenuItem>
                           <MenuItem value="Approved">Approved</MenuItem>
                           <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               {/* Table */}
               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">Request ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">Item Name</TableCell>
                           <TableCell className="font-semibold text-gray-700">Department</TableCell>
                           <TableCell className="font-semibold text-gray-700">Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">Amount</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredRequests.length > 0 ? (
                           filteredRequests.map((request) => (
                              <TableRow key={request.id} className="hover:bg-gray-50">
                                 <TableCell>{request.id}</TableCell>
                                 <TableCell>{request.itemName}</TableCell>
                                 <TableCell>{request.department}</TableCell>
                                 <TableCell>{request.date}</TableCell>
                                 <TableCell>${request.amount.toLocaleString()}</TableCell>
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
                                 No requests found
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

export default DemandAchatList;
