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

interface Order {
   id: string;
   itemName: string;
   department: string;
   date: string;
   amount: number;
   status: "Approved" | "Rejected" | "Completed" | "Cancelled";
   history: { timestamp: string; action: string; user: string }[];
}

const DemandAchatOrderHistory: React.FC = () => {
   const [orders, setOrders] = useState<Order[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [openTimeline, setOpenTimeline] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

   // Simulated API fetch for order history
   useEffect(() => {
      const fetchOrders = async () => {
         // Replace with actual API call to fetch audit logs
         const mockData: Order[] = [
            {
               id: "1",
               itemName: "Office Chairs",
               department: "HR",
               date: "2025-08-20",
               amount: 5000,
               status: "Completed",
               history: [
                  { timestamp: "2025-08-20 10:00", action: "Submitted", user: "John Doe" },
                  {
                     timestamp: "2025-08-21 14:30",
                     action: "Approved by Manager",
                     user: "Jane Smith",
                  },
                  { timestamp: "2025-08-22 09:15", action: "Completed", user: "Finance Team" },
               ],
            },
            {
               id: "2",
               itemName: "Laptops",
               department: "IT",
               date: "2025-08-18",
               amount: 15000,
               status: "Approved",
               history: [
                  { timestamp: "2025-08-18 08:00", action: "Submitted", user: "Alice Brown" },
                  {
                     timestamp: "2025-08-19 11:45",
                     action: "Approved by Manager",
                     user: "Bob Wilson",
                  },
               ],
            },
            {
               id: "3",
               itemName: "Printers",
               department: "Finance",
               date: "2025-08-15",
               amount: 3000,
               status: "Cancelled",
               history: [
                  { timestamp: "2025-08-15 12:00", action: "Submitted", user: "Emma Davis" },
                  { timestamp: "2025-08-16 16:20", action: "Cancelled", user: "Finance Team" },
               ],
            },
         ];
         setOrders(mockData);
      };
      fetchOrders();
   }, []);

   const filteredOrders = orders.filter(
      (order) =>
         (order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (statusFilter === "All" || order.status === statusFilter),
   );

   const getStatusColor = (status: string) => {
      switch (status) {
         case "Approved":
            return "bg-green-100 text-green-800";
         case "Completed":
            return "bg-blue-100 text-blue-800";
         case "Rejected":
            return "bg-red-100 text-red-800";
         case "Cancelled":
            return "bg-gray-100 text-gray-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   const handleExport = (format: "PDF" | "Excel") => {
      // Simulate export functionality
      console.log(`Exporting order history as ${format}`);
   };

   const handleViewTimeline = (order: Order) => {
      setSelectedOrder(order);
      setOpenTimeline(true);
   };

   const handleCloseTimeline = () => {
      setOpenTimeline(false);
      setSelectedOrder(null);
   };

   return (
      <Box className="flex  p-6">
         <Card className="w-full !shadow-none rounded-xl overflow-hidden">
            <CardContent className="p-8 bg-white">
               <Box className="flex items-center mb-6">
                  <Typography variant="h5" className="!font-semibold text-gray-800">
                     Order History
                  </Typography>
               </Box>

               <Grid container spacing={3} className="mb-6">
                  <Grid size={3}>
                     <TextField
                        size="small"
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
                           size="small"
                           labelId="status-filter-label"
                           label="Filter by Status"
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value as string)}
                        >
                           <MenuItem value="All">All</MenuItem>
                           <MenuItem value="Approved">Approved</MenuItem>
                           <MenuItem value="Completed">Completed</MenuItem>
                           <MenuItem value="Rejected">Rejected</MenuItem>
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
                           <TableCell className="font-semibold text-gray-700">Order ID</TableCell>
                           <TableCell className="font-semibold text-gray-700">Item Name</TableCell>
                           <TableCell className="font-semibold text-gray-700">Department</TableCell>
                           <TableCell className="font-semibold text-gray-700">Date</TableCell>
                           <TableCell className="font-semibold text-gray-700">Amount</TableCell>
                           <TableCell className="font-semibold text-gray-700">Status</TableCell>
                           <TableCell className="font-semibold text-gray-700">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {filteredOrders.length > 0 ? (
                           filteredOrders.map((order) => (
                              <TableRow key={order.id} className="hover:bg-gray-50">
                                 <TableCell>{order.id}</TableCell>
                                 <TableCell>{order.itemName}</TableCell>
                                 <TableCell>{order.department}</TableCell>
                                 <TableCell>{order.date}</TableCell>
                                 <TableCell>${order.amount.toLocaleString()}</TableCell>
                                 <TableCell>
                                    <Chip
                                       label={order.status}
                                       className={`${getStatusColor(order.status)} font-medium`}
                                    />
                                 </TableCell>
                                 <TableCell>
                                    <IconButton
                                       color="primary"
                                       onClick={() => handleViewTimeline(order)}
                                    >
                                       <TimelineIcon />
                                    </IconButton>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                                 No orders found
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
               Order Timeline: {selectedOrder?.itemName}
            </DialogTitle>
            <DialogContent>
               {selectedOrder?.history.map((event, index) => (
                  <Box key={index} className="mb-4">
                     <Typography className="font-semibold text-gray-700">
                        {event.timestamp}
                     </Typography>
                     <Typography className="text-gray-600">{event.action}</Typography>
                     <Typography className="text-sm text-gray-500">By: {event.user}</Typography>
                     {index < selectedOrder.history.length - 1 && <Divider className="my-2" />}
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

export default DemandAchatOrderHistory;
