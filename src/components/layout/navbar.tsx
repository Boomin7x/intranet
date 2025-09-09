import {
   ChevronRight,
   DarkMode,
   Help,
   Logout,
   Notifications,
   Person,
   Settings,
} from "@mui/icons-material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import {
   Avatar,
   Box,
   Chip,
   Divider,
   ListItemIcon,
   ListItemText,
   MenuItem,
   MenuList,
   Paper,
   Popover,
   Tooltip,
   Typography,
} from "@mui/material";

import React, { type FC } from "react";
import ButtonWithDropdown from "../ButtonWithDropdown";
import { useNavigate, useParams } from "react-router-dom";
import LanguageSwitcher from "../languageSwithcer";
interface IDashboardNavbar {
   title?: string;
}
const DashboardNavbar: FC<IDashboardNavbar> = ({ title = "Dashboard" }) => {
   const navigate = useNavigate();
   const { lang } = useParams();

   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   const toggleProfile = (event: React.MouseEvent<HTMLButtonElement>) =>
      !anchorEl ? setAnchorEl(event.currentTarget) : setAnchorEl(null);

   console.log({ title });
   const navElements = [
      {
         isActive: false,
         title: "Settings",
         icon: SettingsOutlinedIcon,
         children: [
            { title: "Products Management", icon: CategoryOutlinedIcon },
            { title: "Store", icon: StorefrontOutlinedIcon },
         ],
      },
      {
         isActive: false,
         title: "notifications",
         icon: NotificationsNoneIcon,
      },
   ];
   return (
      <>
         <div className="flex items-center sticky top-0 justify-between px-6 py-3 border-b border-gray-200 bg-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex items-center gap-2">
               <LanguageSwitcher />
               {navElements.map((items, i) => {
                  const Icons = items?.icon;

                  if (items?.children !== undefined) {
                     return (
                        <ButtonWithDropdown
                           tooltipTitle={items?.title}
                           trigger={
                              <button className="size-10 group  flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full relative  cursor-pointer transition-all duration-300 ease-in-out">
                                 {items?.isActive ? (
                                    <div className="absolute top-0 right-0 size-2 rounded-full bg-red-600" />
                                 ) : null}
                                 <Icons className="text-gray-500 group-hover:text-gray-700 !text-xl " />
                              </button>
                           }
                           key={"navElements" + i}
                        >
                           <div className="flex flex-col p-2">
                              {items.children?.map((child, j) => (
                                 <button
                                    key={"child-" + j}
                                    className="flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 rounded-md"
                                 >
                                    {child.icon && <child.icon fontSize="small" />}
                                    {child.title}
                                 </button>
                              ))}
                           </div>
                        </ButtonWithDropdown>
                     );
                  }
                  return (
                     <Tooltip key={"navElements" + i} title={items?.title} arrow>
                        <button className="size-10 group  flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full relative  cursor-pointer transition-all duration-300 ease-in-out">
                           {items?.isActive ? (
                              <div className="absolute top-0 right-0 size-3 rounded-full bg-red-600" />
                           ) : null}
                           <Icons className="text-gray-500 group-hover:text-gray-700 !text-xl " />
                        </button>
                     </Tooltip>
                  );
               })}
               <button
                  onClick={toggleProfile}
                  aria-describedby={"profile"}
                  className="flex items-center gap-1 bg-gray-100 p-2 rounded-full pr-5 hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
               >
                  <Avatar
                     alt="Remy Sharp"
                     src="/static/images/avatar/1.jpg"
                     sx={{ width: 30, height: 30 }}
                  />
                  <div className="text-start">
                     <p className="text-sm font-semibold leading-1">Muhammad jamiu</p>
                     <p className="text-xs text-gray-500  mt-3 leading-1">Employee</p>
                  </div>
               </button>
            </div>
         </div>
         <Popover
            id={"profile"}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={toggleProfile}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.08))",
                  mt: 1.5,
                  borderRadius: 3,
                  minWidth: 320,
                  maxWidth: 400,
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     left: 28,
                     width: 12,
                     height: 12,
                     bgcolor: "background.paper",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
         >
            <Box className="p-0">
               {/* Profile Header */}
               <Box className="px-6 py-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                  <Box className="flex items-center gap-4">
                     <Avatar
                        src="/static/images/avatar/1.jpg"
                        alt="Muhammad Jamiu"
                        sx={{
                           width: 56,
                           height: 56,
                           border: "3px solid white",
                           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                     />
                     <Box className="flex-1">
                        <Typography variant="h6" className="font-semibold text-gray-900 mb-1">
                           Muhammad Jamiu
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mb-2">
                           jamiu@company.com
                        </Typography>
                        <Chip
                           label="Employee"
                           size="small"
                           sx={{
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              color: "rgb(59, 130, 246)",
                              fontWeight: 500,
                              fontSize: "0.75rem",
                           }}
                        />
                     </Box>
                  </Box>
               </Box>

               {/* Menu Items */}
               <Paper elevation={0} className="p-2">
                  <MenuList dense>
                     <MenuItem
                        onClick={() => console.log("My Profile clicked")}
                        className="rounded-lg mb-1 px-4 py-3 hover:bg-gray-50 transition-all duration-200"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-blue-100 rounded-lg">
                              <Person sx={{ color: "rgb(59, 130, 246)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText primary="My Profile" secondary="Manage your account" />
                        <ChevronRight sx={{ color: "rgb(156, 163, 175)", fontSize: 18 }} />
                     </MenuItem>

                     <MenuItem
                        onClick={() => console.log("Settings clicked")}
                        className="rounded-lg mb-1 px-4 py-3 hover:bg-gray-50 transition-all duration-200"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-purple-100 rounded-lg">
                              <Settings sx={{ color: "rgb(147, 51, 234)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText primary="Settings" secondary="Preferences & privacy" />
                        <ChevronRight sx={{ color: "rgb(156, 163, 175)", fontSize: 18 }} />
                     </MenuItem>

                     <MenuItem
                        onClick={() => console.log("Notifications clicked")}
                        className="rounded-lg mb-1 px-4 py-3 hover:bg-gray-50 transition-all duration-200"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-green-100 rounded-lg">
                              <Notifications sx={{ color: "rgb(34, 197, 94)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText primary="Notifications" secondary="Manage alerts" />
                        <Chip
                           label="3"
                           size="small"
                           sx={{
                              backgroundColor: "rgb(239, 68, 68)",
                              color: "white",
                              fontSize: "0.75rem",
                              height: 20,
                              minWidth: 20,
                           }}
                        />
                     </MenuItem>

                     <MenuItem
                        onClick={() => console.log("Dark Mode clicked")}
                        className="rounded-lg mb-1 px-4 py-3 hover:bg-gray-50 transition-all duration-200"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-indigo-100 rounded-lg">
                              <DarkMode sx={{ color: "rgb(99, 102, 241)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText primary="Dark Mode" secondary="Toggle theme" />
                        <ChevronRight sx={{ color: "rgb(156, 163, 175)", fontSize: 18 }} />
                     </MenuItem>

                     <MenuItem
                        onClick={() => console.log("Help clicked")}
                        className="rounded-lg mb-2 px-4 py-3 hover:bg-gray-50 transition-all duration-200"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-orange-100 rounded-lg">
                              <Help sx={{ color: "rgb(249, 115, 22)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText primary="Help & Support" secondary="Get assistance" />
                        <ChevronRight sx={{ color: "rgb(156, 163, 175)", fontSize: 18 }} />
                     </MenuItem>

                     <Divider className="my-2" />

                     {/* Logout Button */}
                     <MenuItem
                        onClick={() => {
                           console.log("Logout clicked");
                           navigate(`/${lang}/auth`);
                        }}
                        className="rounded-lg px-4 py-3 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100"
                     >
                        <ListItemIcon className="min-w-0 mr-4">
                           <Box className="p-2 bg-red-100 rounded-lg">
                              <Logout sx={{ color: "rgb(239, 68, 68)", fontSize: 20 }} />
                           </Box>
                        </ListItemIcon>
                        <ListItemText
                           primary="Sign Out"
                           secondary="End your session"
                           primaryTypographyProps={{
                              className: "font-medium text-red-600",
                              variant: "body2",
                           }}
                           secondaryTypographyProps={{
                              className: "text-red-500 text-xs",
                           }}
                        />
                     </MenuItem>
                  </MenuList>
               </Paper>
            </Box>
         </Popover>
      </>
   );
};

export default DashboardNavbar;
