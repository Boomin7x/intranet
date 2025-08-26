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

interface Contract {
   id: string;
   contractName: string;
   vendor: string;
   startDate: string;
   endDate: string;
   amount: number;
   status: "Active" | "Expired" | "Terminated" | "Pending";
}

const ContractList: React.FC = () => {
   const [contracts, setContracts] = useState<Contract[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchContracts = async () => {
         // Replace with actual API call
         const mockData: Contract[] = [
            {
               id: "C001",
               contractName: "Software License Agreement - Adobe",
               vendor: "Adobe Inc.",
               startDate: "2024-01-01",
               endDate: "2024-12-31",
               amount: 15000,
               status: "Active",
            },
            {
               id: "C002",
               contractName: "Cloud Services Agreement - AWS",
               vendor: "Amazon Web Services",
               startDate: "2023-06-15",
               endDate: "2024-06-14",
               amount: 50000,
               status: "Expired",
            },
            {
               id: "C003",
               contractName: "Office Cleaning Services",
               vendor: "Sparkle Cleaners",
               startDate: "2024-03-01",
               endDate: "2025-02-28",
               amount: 12000,
               status: "Active",
            },
            {
               id: "C004",
               contractName: "Consulting Services - Q2",
               vendor: "Acme Consultants",
               startDate: "2024-04-01",
               endDate: "2024-06-30",
               amount: 25000,
               status: "Pending",
            },
         ];
         setContracts(mockData);
      };
      fetchContracts();
   }, []);

   const filteredContracts = contracts.filter(
      (contract) =>
         (contract.contractName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.vendor.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || contract.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800";
         case "Expired":
            return "bg-red-100 text-red-800";
         case "Terminated":
            return "bg-gray-100 text-gray-800";
         case "Pending":
            return "bg-yellow-100 text-yellow-800";
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
                           Contract List
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by name or vendor"
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
                           <MenuItem value="Active">Active</MenuItem>
                           <MenuItem value="Expired">Expired</MenuItem>
                           <MenuItem value="Terminated">Terminated</MenuItem>
                           <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">
                              Contract ID
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Contract Name
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Vendor</TableCell>
                           <TableCell className="font-semibold text-gray-700">Start Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">End Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">Amount</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredContracts.length > 0 ? (
                           filteredContracts.map((contract) => (
                              <TableRow key={contract.id} className="hover:bg-gray-50">
                                 <TableCell>{contract.id}</TableCell>
                                 <TableCell>{contract.contractName}</TableCell>
                                 <TableCell>{contract.vendor}</TableCell>
                                 <TableCell>{contract.startDate}</TableCell>
                                 <TableCell>{contract.endDate}</TableCell>
                                 <TableCell>${contract.amount.toLocaleString()}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={contract.status}
                                       className={`${getStatusColor(contract.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() =>
                                          console.log(`View details for ${contract.id}`)
                                       }
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                                 No contracts found
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

export default ContractList;
