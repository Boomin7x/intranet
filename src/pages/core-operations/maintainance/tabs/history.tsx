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

interface MaintenanceHistoryEntry {
   id: string;
   resource: string;
   issue: string;
   action: string;
   date: string;
   user: string;
   details: string;
   status: "Submitted" | "Assigned" | "Resolved" | "Cancelled";
   history: { timestamp: string; event: string; actor: string }[];
}

const MaintainanceHistory: React.FC = () => {
   const [historyEntries, setHistoryEntries] = useState<MaintenanceHistoryEntry[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [openTimeline, setOpenTimeline] = useState(false);
   const [selectedEntry, setSelectedEntry] = useState<MaintenanceHistoryEntry | null>(null);

   // Simulated API fetch for maintenance history
   useEffect(() => {
      const fetchHistory = async () => {
         // Replace with actual API call to fetch audit logs
         const mockData: MaintenanceHistoryEntry[] = [
            {
               id: "MHE001",
               resource: "HVAC Unit - Main Office",
               issue: "AC not cooling",
               action: "Request Submitted",
               date: "2024-07-20",
               user: "John Doe",
               details: "HVAC unit in main office is not cooling effectively",
               status: "Submitted",
               history: [
                  { timestamp: "2024-07-20 10:00", event: "Request Submitted", actor: "John Doe" },
                  {
                     timestamp: "2024-07-20 11:30",
                     event: "Assigned to Technician",
                     actor: "Admin",
                  },
                  { timestamp: "2024-07-21 14:00", event: "Resolved", actor: "Technician A" },
               ],
            },
            {
               id: "MHE002",
               resource: "Projector - Meeting Room B",
               issue: "Lamp burnt out",
               action: "Request Assigned",
               date: "2024-07-18",
               user: "Jane Smith",
               details: "Projector lamp in Meeting Room B is not working",
               status: "Assigned",
               history: [
                  {
                     timestamp: "2024-07-18 09:00",
                     event: "Request Submitted",
                     actor: "Jane Smith",
                  },
                  {
                     timestamp: "2024-07-18 10:15",
                     event: "Assigned to Technician",
                     actor: "Admin",
                  },
               ],
            },
            {
               id: "MHE003",
               resource: "Company Car #2",
               issue: "Flat tire",
               action: "Request Resolved",
               date: "2024-07-22",
               user: "Bob Wilson",
               details: "Flat tire on company car #2, replaced spare",
               status: "Resolved",
               history: [
                  {
                     timestamp: "2024-07-22 08:00",
                     event: "Request Submitted",
                     actor: "Bob Wilson",
                  },
                  { timestamp: "2024-07-22 08:30", event: "Technician Dispatched", actor: "Admin" },
                  {
                     timestamp: "2024-07-22 09:15",
                     event: "Resolved",
                     actor: "Roadside Assistance",
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
         (entry.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || entry.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Submitted":
            return "bg-yellow-100 text-yellow-800";
         case "Assigned":
            return "bg-blue-100 text-blue-800";
         case "Resolved":
            return "bg-green-100 text-green-800";
         case "Cancelled":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleExport = (format: "PDF" | "Excel") => {
      // Simulate export functionality
      console.log(`Exporting maintenance history as ${format}`);
   };

   const handleViewTimeline = (entry: MaintenanceHistoryEntry) => {
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
                     Maintenance History
                  </Typography>
               </Box>

               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Search by resource, issue or user"
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
                           <MenuItem value="Submitted">Submitted</MenuItem>
                           <MenuItem value="Assigned">Assigned</MenuItem>
                           <MenuItem value="Resolved">Resolved</MenuItem>
                           <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                           <TableCell className="font-semibold text-gray-700">Resource</TableCell>
                           <TableCell className="font-semibold text-gray-700">Issue</TableCell>
                           <TableCell className="font-semibold text-gray-700">Action</TableCell>
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
                                 <TableCell>{entry.resource}</TableCell>
                                 <TableCell>{entry.issue}</TableCell>
                                 <TableCell>{entry.action}</TableCell>
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
                                 No maintenance history found
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
               Maintenance Timeline: {selectedEntry?.resource}
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

export default MaintainanceHistory;
