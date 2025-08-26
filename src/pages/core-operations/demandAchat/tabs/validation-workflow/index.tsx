import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Box,
   Card,
   CardContent,
   Chip,
   FormControl,
   Grid,
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
import React, { useEffect, useState } from "react";

interface ValidationRequest {
   id: string;
   itemName: string;
   department: string;
   date: string;
   amount: number;
   currentStep: string;
   status: "Pending" | "In Review" | "Approved" | "Rejected";
}

const DemandAchatValidationWorkFlow: React.FC = () => {
   const [requests, setRequests] = useState<ValidationRequest[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchRequests = async () => {
         // Replace with actual API call
         const mockData: ValidationRequest[] = [
            {
               id: "1",
               itemName: "Office Chairs",
               department: "HR",
               date: "2025-08-20",
               amount: 5000,
               currentStep: "Manager Approval",
               status: "Pending",
            },
            {
               id: "2",
               itemName: "Laptops",
               department: "IT",
               date: "2025-08-18",
               amount: 15000,
               currentStep: "Finance Review",
               status: "In Review",
            },
            {
               id: "3",
               itemName: "Printers",
               department: "Finance",
               date: "2025-08-15",
               amount: 3000,
               currentStep: "Manager Approval",
               status: "Pending",
            },
            {
               id: "4",
               itemName: "Projectors",
               department: "Marketing",
               date: "2025-08-10",
               amount: 7000,
               currentStep: "Final Approval",
               status: "In Review",
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
         case "In Review":
            return "bg-blue-100 text-blue-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleApprove = (id: string) => {
      console.log(`Approve request ${id}`);
      // Implement approval logic
   };

   const handleReject = (id: string) => {
      console.log(`Reject request ${id}`);
      // Implement rejection logic
   };

   const handleViewDetails = (id: string) => {
      console.log(`View details for ${id}`);
      // Show modal or navigate to details
   };

   const handleViewHistory = (id: string) => {
      console.log(`View history for ${id}`);
      // Show history timeline
   };

   return (
      <Box className="flex  p-6">
         <Card className="w-full  !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  {/* <CheckIcon className="text-blue-600 mr-3" fontSize="large" /> */}
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Validation Workflow
                  </Typography>
               </Box>
               {/* <Divider className="mb-6" /> */}

               {/* Search and Filter */}
               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        fullWidth
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
                           labelId="status-filter-label"
                           label="Filter by Status"
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value as string)}
                        >
                           <MenuItem value="All">All</MenuItem>
                           <MenuItem value="Pending">Pending</MenuItem>
                           <MenuItem value="In Review">In Review</MenuItem>
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
                           <TableCell className="font-semibold text-gray-700">
                              Current Step
                           </TableCell>
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
                                       label={request.currentStep}
                                       className="bg-purple-100 text-purple-800 font-medium"
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <Chip
                                       label={request.status}
                                       className={`${getStatusColor(request.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => handleViewDetails(request.id)}
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                       color="success"
                                       onClick={() => handleApprove(request.id)}
                                    >
                                       <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                       color="error"
                                       onClick={() => handleReject(request.id)}
                                    >
                                       <CloseIcon />
                                    </IconButton>
                                    <IconButton
                                       color="default"
                                       onClick={() => handleViewHistory(request.id)}
                                    >
                                       <HistoryIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
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

export default DemandAchatValidationWorkFlow;
