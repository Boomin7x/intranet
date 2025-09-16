import {
   Box,
   Button,
   MenuItem,
   MenuList,
   Popover,
   Typography,
   useTheme,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   IconButton,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { coreOperationNavPath } from "../_utils/coreOperationNavPath";
import BudgetLinkageTab from "./tabs/budget-linkage";
import DemandAchatList from "./tabs/list";
import DemandAchatMainTab from "./tabs/main";
import NewDemandAchat from "./tabs/new";
import DemandAchatOrderHistory from "./tabs/order-history";
import DemandAchatValidationWorkFlow from "./tabs/validation-workflow";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

const DemandAchatPage = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const tabs = React.useMemo(() => searchParams.get("tabs"), [searchParams]);
   const theme = useTheme();

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [openNewDemandModal, setOpenNewDemandModal] = React.useState(false);

   const popoverOpen = Boolean(anchorEl);

   const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const handleMenuItemClick = (newValue: string) => {
      const query = new URLSearchParams(searchParams);
      if (newValue.startsWith("/")) {
         query.set("tabs", "");
      } else {
         query.set("tabs", newValue);
      }

      navigate(
         {
            search: `?${query.toString()}`,
         },
         {
            replace: true,
         },
      );
      handlePopoverClose();
   };

   const navItems = Object.entries(coreOperationNavPath)
      .filter(([, value]) => value !== coreOperationNavPath.new) // Exclude "New Demand Achat" from dropdown
      .map(([key, value]) => ({
         title: key.replaceAll("-", " "),
         links: value,
      }));

   const RenderTab = () => {
      switch (tabs) {
         case coreOperationNavPath.list:
            return <DemandAchatList />;
         case coreOperationNavPath["Order-history"]:
            return <DemandAchatOrderHistory />;
         case coreOperationNavPath["budget-linkage"]:
            return <BudgetLinkageTab />;
         case coreOperationNavPath["valifation-workflow"]:
            return <DemandAchatValidationWorkFlow />;
         default:
            return <DemandAchatMainTab />;
      }
   };

   const handleOpenNewDemandModal = () => {
      const query = new URLSearchParams(searchParams);
      query.delete("tabs");
      navigate({
         pathname: "/fr/core-operations/demand-achat/new",
         search: "?" + query.toString(),
      });
      // setOpenNewDemandModal(true);
   };

   const handleCloseNewDemandModal = () => {
      setOpenNewDemandModal(false);
   };

   return (
      <MainLayout title="Demand d'achat">
         <div className="flex flex-col flex-1 size-full">
            <Box
               sx={{
                  padding: theme.spacing(2, 3),
                  // borderBottom: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.background.paper,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
               }}
            >
               <Box />
               <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                     variant="contained"
                     color="primary"
                     startIcon={<AddIcon />}
                     onClick={handleOpenNewDemandModal}
                     sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                     New Demand Achat
                  </Button>
                  <Button
                     aria-controls={popoverOpen ? "demand-achat-popover" : undefined}
                     aria-haspopup="true"
                     aria-expanded={popoverOpen ? "true" : undefined}
                     onClick={handlePopoverOpen}
                     variant="outlined"
                     color="primary"
                     endIcon={
                        <KeyboardArrowDownIcon
                           sx={{
                              transform: popoverOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "all 0.3s ease-in-out",
                           }}
                        />
                     }
                     sx={{
                        textTransform: "capitalize",
                        fontWeight: 600,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "&:hover": {
                           bgcolor: theme.palette.primary.light + "10",
                           borderColor: theme.palette.primary.dark,
                        },
                     }}
                  >
                     {navItems.find((item) => item.links === tabs)?.title || "Select View"}
                  </Button>
               </Box>

               <Popover
                  id="demand-achat-popover"
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                     vertical: "bottom",
                     horizontal: "right",
                  }}
                  transformOrigin={{
                     vertical: "top",
                     horizontal: "right",
                  }}
                  PaperProps={{
                     elevation: 8,
                     sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.08))",
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 200,
                        border: `1px solid ${theme.palette.divider}`,
                        "&:before": {
                           content: '""',
                           display: "block",
                           position: "absolute",
                           top: 0,
                           right: 14,
                           width: 12,
                           height: 12,
                           bgcolor: theme.palette.background.paper,
                           transform: "translateY(-50%) rotate(45deg)",
                           zIndex: 0,
                        },
                     },
                  }}
               >
                  <MenuList dense sx={{ p: 1 }}>
                     {navItems.map((item, i) => (
                        <MenuItem
                           key={"navItem-" + i}
                           onClick={() => handleMenuItemClick(item.links)}
                           selected={item.links === tabs}
                           sx={{
                              borderRadius: 1,
                              mb: 0.5,
                              px: 2,
                              py: 1,
                              fontWeight: 500,
                              color:
                                 item.links === tabs
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
                              bgcolor:
                                 item.links === tabs
                                    ? theme.palette.primary.light + "15"
                                    : "transparent",
                              "&:hover": {
                                 bgcolor:
                                    item.links === tabs
                                       ? theme.palette.primary.light + "25"
                                       : grey[50],
                              },
                           }}
                        >
                           {item.title}
                        </MenuItem>
                     ))}
                  </MenuList>
               </Popover>
            </Box>
            <Box
               sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "white",
                  padding: theme.spacing(2, 3),
                  // p: 6,
               }}
            >
               <RenderTab />
            </Box>
         </div>

         <Dialog
            open={openNewDemandModal}
            onClose={handleCloseNewDemandModal}
            maxWidth="md"
            fullWidth
            PaperProps={{
               sx: {
                  borderRadius: (theme.shape.borderRadius as number) * 2,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.1)`,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
               },
            }}
            TransitionProps={{ timeout: 500 }}
         >
            <DialogTitle
               sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  padding: theme.spacing(2, 3),
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 2px 8px rgba(0,0,0,0.1)`,
               }}
            >
               <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Create New Demand Achat
               </Typography>
               <IconButton onClick={handleCloseNewDemandModal} sx={{ color: "white" }}>
                  <AddIcon sx={{ transform: "rotate(45deg)" }} />
               </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4, bgcolor: theme.palette.background.default }}>
               {/* Placeholder for the actual NewDemandAchat form */}
               <NewDemandAchat />
            </DialogContent>
            <DialogActions
               sx={{
                  padding: theme.spacing(2, 3),
                  bgcolor: theme.palette.grey[100],
                  borderTop: `1px solid ${theme.palette.divider}`,
                  justifyContent: "flex-end",
                  gap: 1,
               }}
            >
               <Button onClick={handleCloseNewDemandModal} variant="outlined" color="secondary">
                  Cancel
               </Button>
               <Button onClick={handleCloseNewDemandModal} variant="contained" color="primary">
                  Submit Demand
               </Button>
            </DialogActions>
         </Dialog>
      </MainLayout>
   );
};

export default DemandAchatPage;
