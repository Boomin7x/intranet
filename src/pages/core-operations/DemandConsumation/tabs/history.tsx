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

interface DemandConsumationHistoryEntry {
   id: string;
   itemName: string;
   action: string;
   department: string;
   date: string;
   user: string;
   details: string;
   status: "Requested" | "Approved" | "Rejected" | "Fulfilled";
   history: { timestamp: string; event: string; actor: string }[];
}

const DemandConsumationHistory: React.FC = () => {
   const [historyEntries, setHistoryEntries] = useState<DemandConsumationHistoryEntry[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [openTimeline, setOpenTimeline] = useState(false);
   const [selectedEntry, setSelectedEntry] = useState<DemandConsumationHistoryEntry | null>(null);

   // Simulated API fetch for demand consumation history
   useEffect(() => {
      const fetchHistory = async () => {
         // Replace with actual API call to fetch audit logs
         const mockData: DemandConsumationHistoryEntry[] = [
            {
               id: "DCHE001",
               itemName: "Printer Paper",
               action: "Requested",
               department: "Admin",
               date: "2024-07-15",
               user: "John Doe",
               details: "Request for 10 reams of A4 paper",
               status: "Requested",
               history: [
                  { timestamp: "2024-07-15 09:00", event: "Requested", actor: "John Doe" },
                  {
                     timestamp: "2024-07-16 14:30",
                     event: "Approved by Manager",
                     actor: "Jane Smith",
                  },
                  { timestamp: "2024-07-17 10:00", event: "Fulfilled", actor: "Warehouse Team" },
               ],
            },
            {
               id: "DCHE002",
               itemName: "Staplers",
               action: "Approved",
               department: "Office Supplies",
               date: "2024-07-10",
               user: "Alice Brown",
               details: "Request for 5 staplers approved",
               status: "Approved",
               history: [
                  { timestamp: "2024-07-10 11:00", event: "Requested", actor: "Alice Brown" },
                  { timestamp: "2024-07-11 16:00", event: "Approved", actor: "Bob Wilson" },
               ],
            },
            {
               id: "DCHE003",
               itemName: "Ink Cartridges",
               action: "Rejected",
               department: "IT",
               date: "2024-07-12",
               user: "Emma White",
               details: "Request for ink cartridges rejected due to budget constraints",
               status: "Rejected",
               history: [
                  { timestamp: "2024-07-12 10:00", event: "Requested", actor: "Emma White" },
                  { timestamp: "2024-07-13 15:00", event: "Rejected", actor: "Finance Team" },
               ],
            },
         ];
         setHistoryEntries(mockData);
      };
      fetchHistory();
   }, []);

   const filteredHistory = historyEntries.filter(
      (entry) =>
         (entry.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || entry.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Requested":
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

   const handleExport = (format: "PDF" | "Excel") => {
      // Simulate export functionality
      console.log(`Exporting demand consumation history as ${format}`);
   };

   const handleViewTimeline = (entry: DemandConsumationHistoryEntry) => {
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
                     Demand Consumation History
                  </Typography>
               </Box>

               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Search by item, department or user"
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
                           <MenuItem value="Requested">Requested</MenuItem>
                           <MenuItem value="Approved">Approved</MenuItem>
                           <MenuItem value="Rejected">Rejected</MenuItem>
                           <MenuItem value="Fulfilled">Fulfilled</MenuItem>
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
                           <TableCell className="font-semibold text-gray-700">Item Name</TableCell>
                           <TableCell className="font-semibold text-gray-700">Action</TableCell>
                           <TableCell className="font-semibold text-gray-700">Department</TableCell>
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
                                 <TableCell>{entry.itemName}</TableCell>
                                 <TableCell>{entry.action}</TableCell>
                                 <TableCell>{entry.department}</TableCell>
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
                                 No demand consumation history found
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
               Demand Consumation Timeline: {selectedEntry?.itemName}
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

export default DemandConsumationHistory;
