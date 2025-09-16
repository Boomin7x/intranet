import { ClearOutlined as ClearOutlinedIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
   Box,
   Button,
   FormControl,
   InputAdornment,
   InputLabel,
   MenuItem,
   Paper,
   Select,
   TextField,
   Typography,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
// import type { TFunction } from "react-i18next";
import useGetDemandAchatList from "./_hooks/useGetDemandAchatList.ts";
import ResponsiveTable from "./ResponsiveTable";

const DemandAchatListPage: React.FC = () => {
   const { t } = useTranslation("demandAchatList");
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const {
      getStatusChipColor,
      handleChangePage,
      handleChangeRowsPerPage,
      handleClearFilters,
      handleRequestSort,
      headCells,
      paginatedRequests,
      filteredRequests,
      order,
      orderBy,
      page,
      rowsPerPage,
      searchTerm,
      setSearchTerm,
      setStatusFilter,
      statusFilter,
   } = useGetDemandAchatList();

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
