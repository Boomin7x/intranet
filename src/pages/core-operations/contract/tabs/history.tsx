import GetAppIcon from "@mui/icons-material/GetApp";
import SearchIcon from "@mui/icons-material/Search";
import TimelineIcon from "@mui/icons-material/Timeline";
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
   Divider,
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

interface ContractHistoryEntry {
   id: string;
   contractName: string;
   action: string;
   vendor: string;
   date: string;
   user: string;
   details: string;
   status: "Created" | "Updated" | "Renewed" | "Expired" | "Terminated";
   history: { timestamp: string; event: string; actor: string }[];
}

const ContractHistory: React.FC = () => {
   const [historyEntries, setHistoryEntries] = useState<ContractHistoryEntry[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [openTimeline, setOpenTimeline] = useState(false);
   const [selectedEntry, setSelectedEntry] = useState<ContractHistoryEntry | null>(null);

   // Simulated API fetch for contract history
   useEffect(() => {
      const fetchHistory = async () => {
         // Replace with actual API call to fetch audit logs
         const mockData: ContractHistoryEntry[] = [
            {
               id: "CHE001",
               contractName: "Software License Agreement - Adobe",
               action: "Contract Created",
               vendor: "Adobe Inc.",
               date: "2024-01-01",
               user: "Alice Brown",
               details: "Initial 1-year software license agreement",
               status: "Created",
               history: [
                  {
                     timestamp: "2024-01-01 09:00",
                     event: "Contract Created",
                     actor: "Alice Brown",
                  },
                  {
                     timestamp: "2024-01-05 10:00",
                     event: "Approved by Legal",
                     actor: "Legal Team",
                  },
               ],
            },
            {
               id: "CHE002",
               contractName: "Cloud Services Agreement - AWS",
               action: "Contract Expired",
               vendor: "Amazon Web Services",
               date: "2024-06-14",
               user: "System",
               details: "Contract automatically expired",
               status: "Expired",
               history: [
                  {
                     timestamp: "2023-06-15 10:00",
                     event: "Contract Created",
                     actor: "Bob Johnson",
                  },
                  { timestamp: "2024-06-14 23:59", event: "Contract Expired", actor: "System" },
               ],
            },
            {
               id: "CHE003",
               contractName: "Office Cleaning Services",
               action: "Contract Renewed",
               vendor: "Sparkle Cleaners",
               date: "2025-02-28",
               user: "Charlie Davis",
               details: "Contract renewed for another year",
               status: "Renewed",
               history: [
                  {
                     timestamp: "2024-03-01 08:00",
                     event: "Contract Created",
                     actor: "Charlie Davis",
                  },
                  {
                     timestamp: "2025-02-20 15:00",
                     event: "Renewal Initiated",
                     actor: "Charlie Davis",
                  },
                  {
                     timestamp: "2025-02-28 09:00",
                     event: "Contract Renewed",
                     actor: "Charlie Davis",
                  },
               ],
            },
         ];
         setHistoryEntries(mockData);
      };
      fetchHistory();
   }, []);

   const filteredHistory = historyEntries.filter(
      (entry) =>
         (entry.contractName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || entry.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Created":
            return "bg-green-100 text-green-800";
         case "Updated":
            return "bg-blue-100 text-blue-800";
         case "Renewed":
            return "bg-purple-100 text-purple-800";
         case "Expired":
            return "bg-red-100 text-red-800";
         case "Terminated":
            return "bg-gray-100 text-gray-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleExport = (format: "PDF" | "Excel") => {
      // Simulate export functionality
      console.log(`Exporting contract history as ${format}`);
   };

   const handleViewTimeline = (entry: ContractHistoryEntry) => {
      setSelectedEntry(entry);
      setOpenTimeline(true);
   };

   const handleCloseTimeline = () => {
      setOpenTimeline(false);
      setSelectedEntry(null);
   };

   return (
      <Box className="flex p-6">
         <Card className="w-full !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Contract History
                  </Typography>
               </Box>

               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Search by contract, vendor or user"
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
                           <MenuItem value="Created">Created</MenuItem>
                           <MenuItem value="Updated">Updated</MenuItem>
                           <MenuItem value="Renewed">Renewed</MenuItem>
                           <MenuItem value="Expired">Expired</MenuItem>
                           <MenuItem value="Terminated">Terminated</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid size={6} className="flex justify-end">
                     <Button
                        size="small"
                        variant="outlined"
                        className="mr-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                        startIcon={<GetAppIcon />}
                        onClick={() => handleExport("PDF")}
                     >
                        Export PDF
                     </Button>
                     <Button
                        size="small"
                        variant="outlined"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        startIcon={<GetAppIcon />}
                        onClick={() => handleExport("Excel")}
                     >
                        Export Excel
                     </Button>
                  </Grid>
               </Grid>

               {/* Table */}
               <TableContainer component={Paper} className="rounded-md shadow-sm">
                  <Table>
                     <TableHead>
                        <TableRow className="bg-gray-50">
                           <TableCell className="font-semibold text-gray-700">History ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">
                              Contract Name
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Action</TableCell>
                           <TableCell className="font-semibold text-gray-700">Vendor</TableCell>
                           <TableCell className="font-semibold text-gray-700">Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">User</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredHistory.length > 0 ? (
                           filteredHistory.map((entry) => (
                              <TableRow key={entry.id} className="hover:bg-gray-50">
                                 <TableCell>{entry.id}</TableCell>
                                 <TableCell>{entry.contractName}</TableCell>
                                 <TableCell>{entry.action}</TableCell>
                                 <TableCell>{entry.vendor}</TableCell>
                                 <TableCell>{entry.date}</TableCell>
                                 <TableCell>{entry.user}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={entry.status}
                                       className={`${getStatusColor(entry.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => handleViewTimeline(entry)}
                                    >
                                       <TimelineIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                                 No contract history found
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
            </CardContent>
         </Card>

         {/* Timeline Dialog */}
         <Dialog open={openTimeline} onClose={handleCloseTimeline} maxWidth="sm" fullWidth>
            <DialogTitle className="font-bold text-gray-800">
               Contract Timeline: {selectedEntry?.contractName}
            </DialogTitle>
            <DialogContent>
               {selectedEntry?.history.map((event, index) => (
                  <Box key={index} className="mb-4">
                     <Typography className="font-semibold text-gray-700">
                        {event.timestamp}
                     </Typography>
                     <Typography className="text-gray-600">{event.event}</Typography>
                     <Typography className="text-sm text-gray-500">By: {event.actor}</Typography>
                     {index < selectedEntry.history.length - 1 && <Divider className="my-2" />}
                  </Box>
               ))}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseTimeline} className="text-gray-600">
                  Close
               </Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
};

export default ContractHistory;
