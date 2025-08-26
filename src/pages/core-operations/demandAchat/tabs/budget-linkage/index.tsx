import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkIcon from "@mui/icons-material/Link";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
   Box,
   Button,
   Card,
   CardContent,
   Chip,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
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

interface Budget {
   id: string;
   name: string;
   available: number;
}

interface Request {
   id: string;
   itemName: string;
   amount: number;
   status: "Pending" | "Linked" | "Insufficient";
   linkedBudget?: string;
}

const BudgetLinkageTab: React.FC = () => {
   const [requests, setRequests] = useState<Request[]>([]);
   const [budgets, setBudgets] = useState<Budget[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
   const [selectedBudget, setSelectedBudget] = useState<string>("");

   // Simulated API fetch for requests and budgets
   useEffect(() => {
      const fetchData = async () => {
         // Replace with actual API calls
         const mockRequests: Request[] = [
            { id: "1", itemName: "Office Chairs", amount: 5000, status: "Pending" },
            {
               id: "2",
               itemName: "Laptops",
               amount: 15000,
               status: "Linked",
               linkedBudget: "Budget 2025 - IT",
            },
            { id: "3", itemName: "Printers", amount: 3000, status: "Insufficient" },
            { id: "4", itemName: "Projectors", amount: 7000, status: "Pending" },
         ];
         setRequests(mockRequests);

         const mockBudgets: Budget[] = [
            { id: "b1", name: "Budget 2025 - HR", available: 10000 },
            { id: "b2", name: "Budget 2025 - IT", available: 20000 },
            { id: "b3", name: "Budget 2025 - Finance", available: 5000 },
            { id: "b4", name: "Budget 2025 - Marketing", available: 15000 },
         ];
         setBudgets(mockBudgets);
      };
      fetchData();
   }, []);

   const filteredRequests = requests.filter((request) =>
      request.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Linked":
            return "bg-green-100 text-green-800";
         case "Pending":
            return "bg-yellow-100 text-yellow-800";
         case "Insufficient":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleOpenDialog = (request: Request) => {
      setSelectedRequest(request);
      setSelectedBudget(request.linkedBudget || "");
      setOpenDialog(true);
   };

   const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedRequest(null);
      setSelectedBudget("");
   };

   const handleLinkBudget = () => {
      if (selectedRequest && selectedBudget) {
         const budget = budgets.find((b) => b.id === selectedBudget);
         if (budget && budget.available >= selectedRequest.amount) {
            // Update request status and linked budget
            setRequests((prev) =>
               prev.map((req) =>
                  req.id === selectedRequest.id
                     ? { ...req, status: "Linked", linkedBudget: budget.name }
                     : req,
               ),
            );
            // Update budget availability (simulated)
            setBudgets((prev) =>
               prev.map((b) =>
                  b.id === selectedBudget
                     ? { ...b, available: b.available - selectedRequest.amount }
                     : b,
               ),
            );
         } else {
            // Set insufficient
            setRequests((prev) =>
               prev.map((req) =>
                  req.id === selectedRequest.id ? { ...req, status: "Insufficient" } : req,
               ),
            );
         }
      }
      handleCloseDialog();
   };

   const handleCheckAvailability = (request: Request) => {
      // Simulate real-time check
      console.log(`Checking availability for request ${request.id}`);
   };

   return (
      <Box className="flex  p-6">
         <Card className="w-full !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  {/* <AccountBalanceIcon className="text-blue-600 mr-3" fontSize="large" /> */}
                  <Typography variant="h4" className="!font-semibold text-gray-800">
                     Budget Linkage
                  </Typography>
               </Box>
               {/* <Divider className="mb-6" /> */}

               {/* Search */}
               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by item name"
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
               </Grid>

               {/* Table */}
               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">Request ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">Item Name</TableCell>
                           <TableCell className="font-semibold text-gray-700">Amount</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Linked Budget
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
                                 <TableCell>${request.amount.toLocaleString()}</TableCell>
                                 <TableCell>{request.linkedBudget || "None"}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={request.status}
                                       className={`${getStatusColor(request.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => handleOpenDialog(request)}
                                    >
                                       <LinkIcon />
                                    </IconButton>
                                    <IconButton
                                       color="secondary"
                                       onClick={() => handleCheckAvailability(request)}
                                    >
                                       <RefreshIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                 No requests found
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
            </CardContent>
         </Card>

         {/* Dialog for Linking Budget */}
         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle className="font-bold text-gray-800">Link Budget to Request</DialogTitle>
            <DialogContent>
               <Typography className="mb-4">
                  Select a budget for request: {selectedRequest?.itemName} ($
                  {selectedRequest?.amount.toLocaleString()})
               </Typography>
               <FormControl fullWidth variant="outlined" className="rounded-md">
                  <InputLabel id="budget-select-label">Select Budget</InputLabel>
                  <Select
                     labelId="budget-select-label"
                     label="Select Budget"
                     value={selectedBudget}
                     onChange={(e) => setSelectedBudget(e.target.value as string)}
                  >
                     {budgets.map((budget) => (
                        <MenuItem key={budget.id} value={budget.id}>
                           {budget.name} (Available: ${budget.available.toLocaleString()})
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDialog} className="text-gray-600">
                  Cancel
               </Button>
               <Button
                  onClick={handleLinkBudget}
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  startIcon={<CheckCircleIcon />}
               >
                  Link & Check
               </Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
};

export default BudgetLinkageTab;
