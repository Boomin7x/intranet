import {
   Box,
   Chip,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   useTheme,
   useMediaQuery,
   TableSortLabel,
   TablePagination,
   Card,
   CardContent,
   Stack,
   Collapse,
   Divider,
   Checkbox, // Import Checkbox
   Tooltip, // Import Tooltip
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Request, Order, HeadCell } from "./types.ts";
import { toast } from "../../../../../utils/toast.ts";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

const ResponsiveTable = ({
   headCells,
   paginatedRequests,
   filteredRequests,
   orderBy,
   order,
   handleRequestSort,
   page,
   rowsPerPage,
   handleChangePage,
   handleChangeRowsPerPage,
   getStatusChipColor,
   showPagination = true,
}: {
   showPagination?: boolean;
   headCells: HeadCell[];
   paginatedRequests: Request[];
   filteredRequests: Request[];
   orderBy: keyof Request;
   order: Order;
   handleRequestSort: (property: keyof Request) => void;
   page: number;
   rowsPerPage: number;
   handleChangePage: (_event: React.MouseEvent<unknown> | null, newPage: number) => void;
   handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
   getStatusChipColor: (status: Request["status"]) => "success" | "warning" | "error" | "default";
}) => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
   const isSmallTablet = useMediaQuery(theme.breakpoints.down("lg"));

   const [expandedRows, setExpandedRows] = useState(new Set<string>());
   const [selected, setSelected] = useState<readonly string[]>([]); // New state for selected items
   const { t } = useTranslation("demandAchatList");

   const toggleRowExpansion = (rowId: string) => {
      const newExpanded = new Set(expandedRows);
      if (newExpanded.has(rowId)) {
         newExpanded.delete(rowId);
      } else {
         newExpanded.add(rowId);
      }
      setExpandedRows(newExpanded);
   };

   // New: Handle "select all" checkbox
   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
         const newSelecteds = paginatedRequests.map((n) => n.id);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   // New: Handle individual item checkbox click
   const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
         );
      }
      setSelected(newSelected);
   };

   const isSelected = (id: string) => selected.indexOf(id) !== -1;

   // Mobile Card Component
   const MobileCard = ({ request, index }: { request: Request; index: number }) => {
      const isExpanded = expandedRows.has(request.id);
      const isEvenRow = index % 2 === 0;
      const isItemSelected = isSelected(request.id);

      return (
         <Card
            sx={{
               mb: 1,
               bgcolor: isEvenRow ? theme.palette.background.paper : theme.palette.grey[50],
               border: `1px solid ${theme.palette.divider}`,
               borderRadius: 2,
               overflow: "hidden",
               transition: "all 0.2s ease-in-out",
               "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  transform: "translateY(-1px)",
                  boxShadow: theme.shadows[2],
               },
               ...(isItemSelected && {
                  bgcolor: theme.palette.action.selected,
                  border: `1px solid ${theme.palette.primary.light}`,
                  boxShadow: theme.shadows[3],
               }),
            }}
         >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
               {/* Primary Info Row */}
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "flex-start",
                     mb: 1,
                  }}
               >
                  <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1 }}>
                     <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, request.id)}
                        inputProps={{ "aria-labelledby": `mobile-checkbox-${request.id}` }}
                        size="small"
                     />
                     <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 0.5 }}
                        id={`mobile-checkbox-${request.id}`}
                     >
                        #{request.id}
                     </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
                     <Chip
                        label={t(`list.status.${request.status}`) || request.status}
                        color={getStatusChipColor(request.status)}
                        size="small"
                        sx={{
                           fontWeight: 600,
                           fontSize: "0.7rem",
                           height: 24,
                           borderRadius: 1,
                        }}
                     />
                     <IconButton
                        size="small"
                        onClick={() => toggleRowExpansion(request.id)}
                        sx={{
                           p: 0.5,
                           bgcolor: theme.palette.grey[100],
                           "&:hover": { bgcolor: theme.palette.grey[200] },
                        }}
                     >
                        {isExpanded ? (
                           <ExpandLessIcon fontSize="small" />
                        ) : (
                           <ExpandMoreIcon fontSize="small" />
                        )}
                     </IconButton>
                  </Box>
               </Box>

               {/* Quick Info Row */}
               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                     {request.department} • {request.date}
                  </Typography>
                  <Typography
                     variant="body2"
                     sx={{ fontWeight: 600, color: theme.palette.success.main }}
                  >
                     ${request.amount.toLocaleString()}
                  </Typography>
               </Box>

               {/* Expandable Details */}
               <Collapse in={isExpanded} timeout={200}>
                  <Divider sx={{ my: 1.5 }} />
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 0,
                        width: "100%",
                        "& > div": { width: "50%" },
                        "& > div:last-child": { width: "100%" },
                     }}
                  >
                     <Box>
                        <Typography
                           variant="caption"
                           sx={{ color: theme.palette.text.secondary, display: "block" }}
                        >
                           Department
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                           {request.department}
                        </Typography>
                     </Box>
                     <Box>
                        <Typography
                           variant="caption"
                           sx={{ color: theme.palette.text.secondary, display: "block" }}
                        >
                           Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                           {request.date}
                        </Typography>
                     </Box>
                     <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                           <Tooltip title={t("list.actions.view") || "View"}>
                              <IconButton
                                 color="primary"
                                 size="small"
                                 onClick={() => console.log(`View details for ${request.id}`)}
                                 sx={{
                                    bgcolor: theme.palette.primary.main + "10",
                                    "&:hover": { bgcolor: theme.palette.primary.main + "20" },
                                    borderRadius: 2,
                                 }}
                              >
                                 <VisibilityOutlinedIcon fontSize="small" />
                              </IconButton>
                           </Tooltip>
                           <Tooltip title={t("list.actions.print") || "Print"}>
                              <IconButton
                                 color="info"
                                 size="small"
                                 onClick={() => console.log(`Print request ${request.id}`)}
                                 sx={{
                                    bgcolor: theme.palette.info.main + "10",
                                    "&:hover": { bgcolor: theme.palette.info.main + "20" },
                                    borderRadius: 2,
                                 }}
                              >
                                 <PrintOutlinedIcon fontSize="small" />
                              </IconButton>
                           </Tooltip>
                           <Tooltip title={t("list.actions.cancel") || "Cancel"}>
                              <IconButton
                                 color="error"
                                 size="small"
                                 onClick={() => console.log(`Cancel request ${request.id}`)}
                                 sx={{
                                    bgcolor: theme.palette.error.main + "10",
                                    "&:hover": { bgcolor: theme.palette.error.main + "20" },
                                    borderRadius: 2,
                                 }}
                              >
                                 <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
                              </IconButton>
                           </Tooltip>
                        </Box>
                     </Box>
                  </Box>
               </Collapse>
            </CardContent>
         </Card>
      );
   };

   // Tablet Card Component (Horizontal Layout)
   const TabletCard = ({ request, index }: { request: Request; index: number }) => {
      const isEvenRow = index % 2 === 0;
      const isItemSelected = isSelected(request.id);

      return (
         <Card
            sx={{
               mb: 1,
               bgcolor: isEvenRow ? theme.palette.background.paper : theme.palette.grey[50],
               border: `1px solid ${theme.palette.divider}`,
               borderRadius: 2,
               overflow: "hidden",
               transition: "all 0.2s ease-in-out",
               "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  transform: "translateY(-1px)",
                  boxShadow: theme.shadows[1],
               },
               ...(isItemSelected && {
                  bgcolor: theme.palette.action.selected,
                  border: `1px solid ${theme.palette.primary.light}`,
                  boxShadow: theme.shadows[2],
               }),
            }}
         >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 2,
                     width: "100%",
                     "& > div:nth-of-type(1)": { flexBasis: "25%" }, // Request ID
                     "& > div:nth-of-type(2)": { flexBasis: "35%" }, // Item Name
                     "& > div:nth-of-type(3)": { flexBasis: "15%" }, // Amount
                     "& > div:nth-of-type(4)": { flexBasis: "15%" }, // Status
                     "& > div:nth-of-type(5)": { flexBasis: "10%", textAlign: "center" }, // Actions
                  }}
               >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                     <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, request.id)}
                        inputProps={{ "aria-labelledby": `tablet-checkbox-${request.id}` }}
                        size="small"
                     />
                     <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, display: "block" }}
                     >
                        Request ID
                     </Typography>
                     <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                        id={`tablet-checkbox-${request.id}`}
                     >
                        #{request.id}
                     </Typography>
                  </Box>
                  <Box>
                     <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, display: "block" }}
                     >
                        Item Name
                     </Typography>
                     <Typography
                        variant="body2"
                        sx={{
                           fontWeight: 500,
                           overflow: "hidden",
                           textOverflow: "ellipsis",
                           whiteSpace: "nowrap",
                        }}
                     >
                        {request.itemName}
                     </Typography>
                  </Box>
                  <Box>
                     <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, display: "block" }}
                     >
                        Amount
                     </Typography>
                     <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: theme.palette.success.main }}
                     >
                        ${request.amount.toLocaleString()}
                     </Typography>
                  </Box>
                  <Box>
                     <Chip
                        label={t(`list.status.${request.status}`) || request.status}
                        color={getStatusChipColor(request.status)}
                        size="small"
                        sx={{
                           fontWeight: 600,
                           fontSize: "0.75rem",
                           borderRadius: 1,
                        }}
                     />
                  </Box>
                  <Box>
                     <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                        <Tooltip title={t("list.actions.view") || "View"}>
                           <IconButton
                              color="primary"
                              size="small"
                              onClick={(event) => {
                                 event.stopPropagation();
                                 toast.info(`Viewing request ${request.id}`);
                                 console.log(`View details for ${request.id}`);
                              }}
                              aria-label="view details"
                              sx={{
                                 bgcolor: theme.palette.primary.main + "10",
                                 "&:hover": {
                                    bgcolor: theme.palette.primary.main + "20",
                                    transform: "scale(1.1)",
                                 },
                                 transition: "all 0.2s ease-in-out",
                                 borderRadius: 2,
                              }}
                           >
                              <VisibilityOutlinedIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title={t("list.actions.print") || "Print"}>
                           <IconButton
                              color="info"
                              size="small"
                              onClick={(event) => {
                                 event.stopPropagation();
                                 toast.info(`Printing request ${request.id}`);
                                 console.log(`Print request ${request.id}`);
                              }}
                              aria-label="print request"
                              sx={{
                                 bgcolor: theme.palette.info.main + "10",
                                 "&:hover": {
                                    bgcolor: theme.palette.info.main + "20",
                                    transform: "scale(1.1)",
                                 },
                                 transition: "all 0.2s ease-in-out",
                                 borderRadius: 2,
                              }}
                           >
                              <PrintOutlinedIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title={t("list.actions.cancel") || "Cancel"}>
                           <IconButton
                              color="error"
                              size="small"
                              onClick={(event) => {
                                 event.stopPropagation();
                                 toast.error(`Cancelling request ${request.id}`);
                                 console.log(`Cancel request ${request.id}`);
                              }}
                              aria-label="cancel request"
                              sx={{
                                 bgcolor: theme.palette.error.main + "10",
                                 "&:hover": {
                                    bgcolor: theme.palette.error.main + "20",
                                    transform: "scale(1.1)",
                                 },
                                 transition: "all 0.2s ease-in-out",
                                 borderRadius: 2,
                              }}
                           >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                     </Box>
                  </Box>
               </Box>
            </CardContent>
         </Card>
      );
   };

   // Responsive Table for Desktop/Large Tablets
   const DesktopTable = () => (
      <TableContainer
         sx={{
            minHeight: 300,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            overflow: "hidden",
         }}
      >
         <Table stickyHeader aria-label="responsive sticky table">
            <TableHead>
               <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                  <TableCell padding="checkbox">
                     <Checkbox
                        indeterminate={
                           selected.length > 0 && selected.length < paginatedRequests.length
                        }
                        checked={
                           paginatedRequests.length > 0 &&
                           selected.length === paginatedRequests.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                     />
                  </TableCell>
                  {headCells.map((headCell) => (
                     <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={isSmallTablet ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                           fontWeight: 600,
                           color: theme.palette.text.secondary,
                           bgcolor: theme.palette.grey[100],
                           borderBottom: `1px solid ${theme.palette.divider}`,
                           whiteSpace: "nowrap",
                           px: isSmallTablet ? 1 : 2,
                           fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                        }}
                     >
                        <TableSortLabel
                           active={orderBy === headCell.id}
                           direction={orderBy === headCell.id ? order : "asc"}
                           onClick={() => handleRequestSort(headCell.id)}
                           sx={{
                              ".MuiTableSortLabel-icon": {
                                 color: `${theme.palette.text.secondary} !important`,
                                 opacity: 0.6,
                              },
                           }}
                        >
                           {t(`list.tableHeader.${headCell.id}`) || headCell.label}
                        </TableSortLabel>
                     </TableCell>
                  ))}
                  <TableCell
                     align="center"
                     padding={isSmallTablet ? "none" : "normal"}
                     sx={{
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                        bgcolor: theme.palette.grey[100],
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        whiteSpace: "nowrap",
                        px: isSmallTablet ? 1 : 2,
                        fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                     }}
                  >
                     {t("list.tableHeader.actions") || "Actions"}
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request, index) => {
                     const isEvenRow = index % 2 === 0;
                     const isItemSelected = isSelected(request.id);
                     const labelId = `enhanced-table-checkbox-${index}`;

                     return (
                        <TableRow
                           hover
                           onClick={(event) => handleClick(event, request.id)}
                           role="checkbox"
                           aria-checked={isItemSelected}
                           tabIndex={-1}
                           key={request.id}
                           selected={isItemSelected}
                           sx={{
                              bgcolor: isEvenRow
                                 ? theme.palette.background.paper
                                 : theme.palette.grey[50],
                              "&:hover": {
                                 bgcolor: theme.palette.action.hover,
                                 transform: "scale(1.001)",
                              },
                              transition: "all 0.15s ease-in-out",
                           }}
                        >
                           <TableCell padding="checkbox">
                              <Checkbox
                                 checked={isItemSelected}
                                 inputProps={{ "aria-labelledby": labelId }}
                              />
                           </TableCell>
                           <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                                 fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                                 fontWeight: 600,
                                 color: theme.palette.primary.main,
                              }}
                           >
                              #{request.id}
                           </TableCell>
                           <TableCell
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                                 fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                                 maxWidth: isSmallTablet ? "120px" : "200px",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis",
                              }}
                           >
                              {request.itemName}
                           </TableCell>
                           <TableCell
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                                 fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                              }}
                           >
                              {request.department}
                           </TableCell>
                           <TableCell
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                                 fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                              }}
                           >
                              {request.date}
                           </TableCell>
                           <TableCell
                              align="right"
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                                 fontSize: isSmallTablet ? "0.8rem" : "0.875rem",
                                 fontWeight: 600,
                                 color: theme.palette.success.main,
                              }}
                           >
                              ${request.amount.toLocaleString()}
                           </TableCell>
                           <TableCell
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                              }}
                           >
                              <Chip
                                 label={t(`list.status.${request.status}`) || request.status}
                                 color={getStatusChipColor(request.status)}
                                 size="small"
                                 sx={{
                                    fontWeight: 600,
                                    textTransform: "capitalize",
                                    borderRadius: 1,
                                    fontSize: isSmallTablet ? "0.7rem" : "0.75rem",
                                    height: isSmallTablet ? 24 : 28,
                                 }}
                              />
                           </TableCell>
                           <TableCell
                              align="center"
                              sx={{
                                 whiteSpace: "nowrap",
                                 px: isSmallTablet ? 1 : 2,
                              }}
                           >
                              <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                                 <Tooltip title={t("list.actions.view") || "View"}>
                                    <IconButton
                                       color="primary"
                                       size="small"
                                       onClick={(event) => {
                                          event.stopPropagation();
                                          toast.info(`Viewing request ${request.id}`);
                                          console.log(`View details for ${request.id}`);
                                       }}
                                       aria-label="view details"
                                       sx={{
                                          bgcolor: theme.palette.primary.main + "10",
                                          "&:hover": {
                                             bgcolor: theme.palette.primary.main + "20",
                                             transform: "scale(1.1)",
                                          },
                                          transition: "all 0.2s ease-in-out",
                                          borderRadius: 2,
                                       }}
                                    >
                                       <VisibilityOutlinedIcon fontSize="small" />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title={t("list.actions.print") || "Print"}>
                                    <IconButton
                                       color="info"
                                       size="small"
                                       onClick={(event) => {
                                          event.stopPropagation();
                                          toast.info(`Printing request ${request.id}`);
                                          console.log(`Print request ${request.id}`);
                                       }}
                                       aria-label="print request"
                                       sx={{
                                          bgcolor: theme.palette.info.main + "10",
                                          "&:hover": {
                                             bgcolor: theme.palette.info.main + "20",
                                             transform: "scale(1.1)",
                                          },
                                          transition: "all 0.2s ease-in-out",
                                          borderRadius: 2,
                                       }}
                                    >
                                       <PrintOutlinedIcon fontSize="small" />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title={t("list.actions.cancel") || "Cancel"}>
                                    <IconButton
                                       color="error"
                                       size="small"
                                       onClick={(event) => {
                                          event.stopPropagation();
                                          toast.error(`Cancelling request ${request.id}`);
                                          console.log(`Cancel request ${request.id}`);
                                       }}
                                       aria-label="cancel request"
                                       sx={{
                                          bgcolor: theme.palette.error.main + "10",
                                          "&:hover": {
                                             bgcolor: theme.palette.error.main + "20",
                                             transform: "scale(1.1)",
                                          },
                                          transition: "all 0.2s ease-in-out",
                                          borderRadius: 2,
                                       }}
                                    >
                                       <DeleteOutlineOutlinedIcon fontSize="small" />
                                    </IconButton>
                                 </Tooltip>
                              </Box>
                           </TableCell>
                        </TableRow>
                     );
                  })
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={headCells.length + 2} // +2 for checkbox and actions
                        sx={{
                           textAlign: "center",
                           py: 6,
                           color: theme.palette.text.secondary,
                           fontSize: "1rem",
                        }}
                     >
                        <Box
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 1,
                           }}
                        >
                           <Typography
                              variant="h6"
                              sx={{ color: theme.palette.text.secondary, mb: 1 }}
                           >
                              📋
                           </Typography>
                           <Typography variant="body1">
                              {t("list.noRequestsFound") || "No requests found"}
                           </Typography>
                           <Typography variant="body2" sx={{ opacity: 0.7 }}>
                              {t("list.adjustFilters") || "Try adjusting your search filters"}
                           </Typography>
                        </Box>
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );

   // Enhanced Pagination Component
   const EnhancedPagination = () => (
      <Box
         sx={{
            mt: 2,
            p: 2,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            ...(isMobile && {
               p: 1.5,
            }),
         }}
      >
         <TablePagination
            rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25]}
            component="div"
            count={filteredRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={isMobile ? "" : t("list.rowsPerPage") || "Rows per page:"}
            labelDisplayedRows={({ from, to, count }) =>
               isMobile
                  ? `${from}-${to}/${count}`
                  : t("list.displayedRows", { from, to, count }) || `${from}-${to} of ${count}`
            }
            sx={{
               ".MuiTablePagination-toolbar": {
                  px: 0,
                  py: isMobile ? 0.5 : 1,
                  minHeight: isMobile ? 48 : 56,
                  ...(isMobile && {
                     flexDirection: "column",
                     alignItems: "flex-start",
                     gap: 1,
                  }),
               },
               ".MuiTablePagination-spacer": {
                  ...(isMobile && { display: "none" }),
               },
               ".MuiTablePagination-selectLabel": {
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  ...(isMobile && { mb: 0.5 }),
               },
               ".MuiTablePagination-displayedRows": {
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  ...(isMobile && { order: -1, mb: 0.5 }),
               },
               ".MuiTablePagination-actions": {
                  ...(isMobile && { ml: 0, alignSelf: "center" }),
               },
               ".MuiTablePagination-select": {
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
               },
            }}
         />
      </Box>
   );

   return (
      <Box sx={{ width: "100%", overflow: "hidden" }}>
         {/* Mobile View */}
         {isMobile && (
            <Stack spacing={1}>
               {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request, index) => (
                     <MobileCard key={request.id} request={request} index={index} />
                  ))
               ) : (
                  <Card sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                     <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        📋
                     </Typography>
                     <Typography variant="body1" sx={{ mb: 1 }}>
                        {t("list.noRequestsFound") || "No requests found"}
                     </Typography>
                     <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {t("list.adjustFilters") || "Try adjusting your search filters"}
                     </Typography>
                  </Card>
               )}
            </Stack>
         )}
         {/* Tablet View */}
         {isTablet && !isMobile && (
            <Stack spacing={1}>
               {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request, index) => (
                     <TabletCard key={request.id} request={request} index={index} />
                  ))
               ) : (
                  <Card sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                     <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        📋
                     </Typography>
                     <Typography variant="body1" sx={{ mb: 1 }}>
                        {t("list.noRequestsFound") || "No requests found"}
                     </Typography>
                     <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {t("list.adjustFilters") || "Try adjusting your search filters"}
                     </Typography>
                  </Card>
               )}
            </Stack>
         )}
         {/* Desktop View */}
         {!isTablet && <DesktopTable />}
         {/* Enhanced Pagination */}
         {showPagination && <EnhancedPagination />}
      </Box>
   );
};

export default ResponsiveTable;
