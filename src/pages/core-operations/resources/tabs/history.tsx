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

interface ResourceHistoryEntry {
   id: string;
   resourceName: string;
   type: string;
   action: string;
   date: string;
   user: string;
   details: string;
   status: "Active" | "Archived" | "Deleted";
   history: { timestamp: string; event: string; actor: string }[];
}

const ResourceHistory: React.FC = () => {
   const [historyEntries, setHistoryEntries] = useState<ResourceHistoryEntry[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [openTimeline, setOpenTimeline] = useState(false);
   const [selectedEntry, setSelectedEntry] = useState<ResourceHistoryEntry | null>(null);

   // Simulated API fetch for resource history
   useEffect(() => {
      const fetchHistory = async () => {
         // Replace with actual API call to fetch resource history logs
         const mockData: ResourceHistoryEntry[] = [
            {
               id: "HIST001",
               resourceName: "Conference Room A",
               type: "Meeting Room",
               action: "Booked",
               date: "2024-07-22",
               user: "Alice Brown",
               details: "Booked for team meeting",
               status: "Active",
               history: [
                  { timestamp: "2024-07-22 09:00", event: "Booked", actor: "Alice Brown" },
                  { timestamp: "2024-07-22 10:30", event: "Occupied", actor: "System" },
                  { timestamp: "2024-07-22 12:00", event: "Released", actor: "System" },
               ],
            },
            {
               id: "HIST002",
               resourceName: "Projector - HR Dept",
               type: "Equipment",
               action: "Assigned",
               date: "2024-07-21",
               user: "Bob Johnson",
               details: "Assigned to HR presentation",
               status: "Active",
               history: [
                  { timestamp: "2024-07-21 14:00", event: "Assigned", actor: "Bob Johnson" },
                  { timestamp: "2024-07-21 17:00", event: "Returned", actor: "Bob Johnson" },
               ],
            },
            {
               id: "HIST003",
               resourceName: "Company Van #1",
               type: "Vehicle",
               action: "Maintenance Scheduled",
               date: "2024-07-20",
               user: "Service Team",
               details: "Scheduled for routine maintenance",
               status: "Archived",
               history: [
                  {
                     timestamp: "2024-07-20 11:00",
                     event: "Maintenance Scheduled",
                     actor: "Service Team",
                  },
                  {
                     timestamp: "2024-07-20 16:00",
                     event: "Maintenance Completed",
                     actor: "Mechanic",
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
         (entry.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || entry.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Active":
            return "bg-green-100 text-green-800";
         case "Archived":
            return "bg-blue-100 text-blue-800";
         case "Deleted":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleExport = (format: "PDF" | "Excel") => {
      // Simulate export functionality
      console.log(`Exporting resource history as ${format}`);
   };

   const handleViewTimeline = (entry: ResourceHistoryEntry) => {
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
                     Resource History
                  </Typography>
               </Box>

               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Search by resource, type or user"
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
                           <MenuItem value="Archived">Archived</MenuItem>
                           <MenuItem value="Deleted">Deleted</MenuItem>
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
                              Resource Name
                           </TableCell>
                           <TableCell className="font-semibold text-gray-700">Type</TableCell>
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
                                 <TableCell>{entry.resourceName}</TableCell>
                                 <TableCell>{entry.type}</TableCell>
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
                                 No resource history found
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
               Resource Timeline: {selectedEntry?.resourceName}
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

export default ResourceHistory;
