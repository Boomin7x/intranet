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

interface Budget {
   id: string;
   budgetName: string;
   department: string;
   amount: number;
   spent: number;
   status: "Active" | "Closed" | "Overspent" | "Pending";
   startDate: string;
   endDate: string;
}

const BudgetList: React.FC = () => {
   const [budgets, setBudgets] = useState<Budget[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");

   // Simulated API fetch
   useEffect(() => {
      const fetchBudgets = async () => {
         // Replace with actual API call
         const mockData: Budget[] = [
            {
               id: "B001",
               budgetName: "Q3 Marketing Campaign",
               department: "Marketing",
               amount: 50000,
               spent: 35000,
               status: "Active",
               startDate: "2024-07-01",
               endDate: "2024-09-30",
            },
            {
               id: "B002",
               budgetName: "Annual IT Software",
               department: "IT",
               amount: 120000,
               spent: 125000,
               status: "Overspent",
               startDate: "2024-01-01",
               endDate: "2024-12-31",
            },
            {
               id: "B003",
               budgetName: "HR Training Programs",
               department: "HR",
               amount: 30000,
               spent: 10000,
               status: "Active",
               startDate: "2024-06-01",
               endDate: "2024-11-30",
            },
            {
               id: "B004",
               budgetName: "Office Renovation",
               department: "Facilities",
               amount: 80000,
               spent: 80000,
               status: "Closed",
               startDate: "2024-03-01",
               endDate: "2024-06-30",
            },
         ];
         setBudgets(mockData);
      };
      fetchBudgets();
   }, []);

   const filteredBudgets = budgets.filter(
      (budget) =>
         (budget.budgetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            budget.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || budget.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800";
         case "Closed":
            return "bg-gray-100 text-gray-800";
         case "Overspent":
            return "bg-red-100 text-red-800";
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
                           Budget List
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by name or department"
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
                           <MenuItem value="Closed">Closed</MenuItem>
                           <MenuItem value="Overspent">Overspent</MenuItem>
                           <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>

               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">Budget ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Budget Name
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Department</TableCell>
                           <TableCell className="font-semibold text-gray-700">Amount</TableCell>
                           <TableCell className="font-semibold text-gray-700">Spent</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Start Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">End Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredBudgets.length > 0 ? (
                           filteredBudgets.map((budget) => (
                              <TableRow key={budget.id} className="hover:bg-gray-50">
                                 <TableCell>{budget.id}</TableCell>
                                 <TableCell>{budget.budgetName}</TableCell>
                                 <TableCell>{budget.department}</TableCell>
                                 <TableCell>${budget.amount.toLocaleString()}</TableCell>
                                 <TableCell>${budget.spent.toLocaleString()}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={budget.status}
                                       className={`${getStatusColor(budget.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>{budget.startDate}</TableCell>
                                 <TableCell>{budget.endDate}</TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => console.log(`View details for ${budget.id}`)}
                                    >
                                       <VisibilityIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={9} className="text-center text-gray-500 py-4">
                                 No budgets found
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

export default BudgetList;
