import SearchIcon from "@mui/icons-material/Search";
import {
   Box,
   FormControl,
   InputAdornment,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
   useTheme,
   useMediaQuery,
   Button,
   Paper,
} from "@mui/material";
import { ClearOutlined as ClearOutlinedIcon } from "@mui/icons-material";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
// import type { TFunction } from "react-i18next";
import ResponsiveTable from "./ResponsiveTable";
import type { Request, Order, HeadCell } from "./types.ts";

const DemandAchatListPage: React.FC = () => {
   const { t } = useTranslation("demandAchatList");
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const [requests, setRequests] = useState<Request[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [order, setOrder] = useState<Order>("asc");
   const [orderBy, setOrderBy] = useState<keyof Request>("id");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

   const headCells: HeadCell[] = [
      { id: "id", numeric: false, label: "Request ID" },
      { id: "itemName", numeric: false, label: "Item Name" },
      { id: "department", numeric: false, label: "Department" },
      { id: "date", numeric: false, label: "Date" },
      { id: "amount", numeric: true, label: "Amount" },
      { id: "status", numeric: false, label: "Status" },
   ];

   useEffect(() => {
      const fetchedRequests: Request[] = [
         {
            id: "REQ001",
            itemName: "Laptop",
            department: "IT",
            date: "2023-01-15",
            amount: 1200,
            status: "Approved",
         },
         {
            id: "REQ002",
            itemName: "Office Chairs",
            department: "HR",
            date: "2023-01-20",
            amount: 500,
            status: "Pending",
         },
         {
            id: "REQ003",
            itemName: "Printer Ink",
            department: "Admin",
            date: "2023-01-22",
            amount: 150,
            status: "Draft",
         },
         {
            id: "REQ004",
            itemName: "Server Upgrade",
            department: "IT",
            date: "2023-02-01",
            amount: 3500,
            status: "Rejected",
         },
         {
            id: "REQ005",
            itemName: "New Monitors",
            department: "IT",
            date: "2023-02-05",
            amount: 800,
            status: "Approved",
         },
         {
            id: "REQ006",
            itemName: "Desk Supplies",
            department: "Admin",
            date: "2023-02-10",
            amount: 100,
            status: "Pending",
         },
         {
            id: "REQ007",
            itemName: "Software Licenses",
            department: "IT",
            date: "2023-02-15",
            amount: 2000,
            status: "Approved",
         },
         {
            id: "REQ008",
            itemName: "Coffee Machine",
            department: "HR",
            date: "2023-02-18",
            amount: 300,
            status: "Draft",
         },
         {
            id: "REQ009",
            itemName: "Projector",
            department: "Marketing",
            date: "2023-02-20",
            amount: 700,
            status: "Pending",
         },
         {
            id: "REQ010",
            itemName: "External Hard Drive",
            department: "IT",
            date: "2023-02-25",
            amount: 250,
            status: "Approved",
         },
         {
            id: "REQ011",
            itemName: "Whiteboard Markers",
            department: "Admin",
            date: "2023-03-01",
            amount: 50,
            status: "Approved",
         },
         {
            id: "REQ012",
            itemName: "Networking Cables",
            department: "IT",
            date: "2023-03-05",
            amount: 120,
            status: "Pending",
         },
         {
            id: "REQ013",
            itemName: "Ergonomic Keyboards",
            department: "HR",
            date: "2023-03-08",
            amount: 400,
            status: "Approved",
         },
         {
            id: "REQ014",
            itemName: "Subscription Renewal",
            department: "Marketing",
            date: "2023-03-10",
            amount: 600,
            status: "Rejected",
         },
         {
            id: "REQ015",
            itemName: "New Desks",
            department: "HR",
            date: "2023-03-12",
            amount: 1500,
            status: "Approved",
         },
      ];
      setRequests(fetchedRequests);
   }, []);

   const handleRequestSort = (property: keyof Request) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
   };

   const sortedRequests = useMemo(() => {
      const array = [...requests];
      return array.sort((a, b) => {
         const aValue = a[orderBy as keyof Request];
         const bValue = b[orderBy as keyof Request];

         if (typeof aValue === "string" && typeof bValue === "string") {
            return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
         } else if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc" ? aValue - bValue : bValue - aValue;
         }
         return 0;
      });
   }, [requests, order, orderBy]);

   const filteredRequests = sortedRequests.filter((request) => {
      const matchesSearchTerm =
         request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      return matchesSearchTerm && matchesStatus;
   });

   const paginatedRequests = useMemo(() => {
      return filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
   }, [filteredRequests, page, rowsPerPage]);

   const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleClearFilters = () => {
      setSearchTerm("");
      setStatusFilter("All");
      setPage(0);
   };

   const getStatusChipColor = (status: Request["status"]) => {
      switch (status) {
         case "Approved":
            return "success";
         case "Pending":
            return "warning";
         case "Rejected":
            return "error";
         default:
            return "default";
      }
   };

   return (
      <Box sx={{ flexGrow: 1, p: isMobile ? 2 : 4, bgcolor: theme.palette.grey[50] }}>
         {/* Header */}
         <Box
            sx={{
               mb: isMobile ? 3 : 4,
               display: "flex",
               justifyContent: "space-between",
               alignItems: isMobile ? "flex-start" : "center",
               flexDirection: isMobile ? "column" : "row",
            }}
         >
            <Typography
               variant={isMobile ? "h5" : "h4"}
               sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: isMobile ? 1 : 0 }}
            >
               {t("list.title") || "Procurement Request List"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
               {t("list.totalRequests", { count: filteredRequests.length }) ||
                  `Total Requests: ${filteredRequests.length}`}
            </Typography>
         </Box>

         {/* Action Bar (Search, Filter, Clear) */}
         <Paper
            elevation={1}
            sx={{
               mb: isMobile ? 3 : 4,
               borderRadius: 1,
               boxShadow: "none",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 2 : 3,
                  alignItems: "center",
                  width: "100%",
               }}
            >
               <Box sx={{ flex: isMobile ? "none" : 1, width: isMobile ? "100%" : "auto" }}>
                  <TextField
                     fullWidth
                     size="small"
                     variant="outlined"
                     placeholder={t("list.searchPlaceholder") || "Search by item or department"}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon sx={{ color: theme.palette.text.disabled }} />
                           </InputAdornment>
                        ),
                     }}
                     sx={{
                        ".MuiOutlinedInput-root": {
                           borderRadius: 1,
                        },
                     }}
                  />
               </Box>
               <Box sx={{ flex: isMobile ? "none" : 1, width: isMobile ? "100%" : "auto" }}>
                  <FormControl fullWidth size="small" variant="outlined">
                     <InputLabel id="status-filter-label">
                        {t("list.filterByStatus") || "Filter by Status"}
                     </InputLabel>
                     <Select
                        labelId="status-filter-filter-label"
                        label={t("list.filterByStatus") || "Filter by Status"}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as string)}
                        sx={{
                           borderRadius: 1,
                        }}
                     >
                        <MenuItem value="All">{t("list.statusAll") || "All"}</MenuItem>
                        <MenuItem value="Draft">{t("list.statusDraft") || "Draft"}</MenuItem>
                        <MenuItem value="Pending">{t("list.statusPending") || "Pending"}</MenuItem>
                        <MenuItem value="Approved">
                           {t("list.statusApproved") || "Approved"}
                        </MenuItem>
                        <MenuItem value="Rejected">
                           {t("list.statusRejected") || "Rejected"}
                        </MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box sx={{ flex: isMobile ? "none" : 1, width: isMobile ? "100%" : "auto" }}>
                  <Button
                     fullWidth
                     variant="outlined"
                     color="secondary"
                     startIcon={<ClearOutlinedIcon />}
                     onClick={handleClearFilters}
                     sx={{
                        textTransform: "capitalize",
                        borderRadius: 1.5,
                        borderColor: theme.palette.grey[300],
                        color: theme.palette.text.secondary,
                        "&:hover": {
                           borderColor: theme.palette.primary.main,
                           color: theme.palette.primary.main,
                           bgcolor: theme.palette.primary.light + "10",
                        },
                     }}
                  >
                     {t("list.clearFilters") || "Clear Filters"}
                  </Button>
               </Box>
            </Box>
         </Paper>
         <ResponsiveTable
            headCells={headCells}
            paginatedRequests={paginatedRequests}
            filteredRequests={filteredRequests}
            orderBy={orderBy}
            order={order}
            handleRequestSort={handleRequestSort}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getStatusChipColor={getStatusChipColor}
         />
      </Box>
   );
};

export default DemandAchatListPage;
