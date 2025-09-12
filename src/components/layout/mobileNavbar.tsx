import React, { useState, type ReactNode } from "react";
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Box,
   useTheme,
   Avatar,
   Divider,
   Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
   Home as HomeIcon,
   Settings as SettingsIcon,
   Logout as LogoutIcon,
   AccountCircle as AccountCircleIcon,
   Notifications as NotificationsIcon,
   DarkMode as DarkModeIcon,
   Help as HelpIcon,
   Dashboard as DashboardIcon,
} from "@mui/icons-material";
import LanguageSwitcher from "../languageSwithcer";
import { useMediaQuery } from "react-responsive";

interface IMobileNavbar {
   title?: string;
   children: ReactNode;
}

const MobileNavbar: React.FC<IMobileNavbar> = ({ title = "Dashboard", children }) => {
   const { t } = useTranslation("common"); // Using a common namespace for now
   const navigate = useNavigate();
   const { lang } = useParams();
   const theme = useTheme();
   const mobileDevices = useMediaQuery({ maxWidth: 768 });

   const [drawerOpen, setDrawerOpen] = useState(false);

   const toggleDrawer = (open: boolean) => () => {
      setDrawerOpen(open);
   };

   const handleNavigation = (path: string) => {
      navigate(`/${lang}${path}`);
      setDrawerOpen(false);
   };

   const menuItems = [
      {
         text: t("home") || "Home",
         icon: <HomeIcon sx={{ color: theme.palette.primary.main }} />,
         path: "/",
      },
      {
         text: t("dashboard") || "Dashboard",
         icon: <DashboardIcon sx={{ color: theme.palette.secondary.main }} />,
         path: "/core-operations",
      },
      // Add more dynamic routes here based on `route.tsx` if needed
   ];

   const profileMenuItems = [
      {
         text: t("myProfile") || "My Profile",
         icon: <AccountCircleIcon sx={{ color: theme.palette.info.main }} />,
         onClick: () => console.log("My Profile"),
      },
      {
         text: t("settings") || "Settings",
         icon: <SettingsIcon sx={{ color: theme.palette.warning.main }} />,
         onClick: () => console.log("Settings"),
      },
      {
         text: t("notifications") || "Notifications",
         icon: <NotificationsIcon sx={{ color: theme.palette.success.main }} />,
         onClick: () => console.log("Notifications"),
         badge: 3,
      },
      {
         text: t("darkMode") || "Dark Mode",
         icon: <DarkModeIcon sx={{ color: theme.palette.text.primary }} />,
         onClick: () => console.log("Dark Mode"),
      },
      {
         text: t("helpSupport") || "Help & Support",
         icon: <HelpIcon sx={{ color: theme.palette.error.main }} />,
         onClick: () => console.log("Help"),
      },
   ];

   return (
      <Box
         sx={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
         }}
      >
         <AppBar
            position="sticky"
            elevation={0}
            sx={{
               bgcolor: theme.palette.background.default,
               borderBottom: `1px solid ${theme.palette.divider}`,
               zIndex: theme.zIndex.appBar + 1,
               display: mobileDevices ? "inline-block" : "none",
            }}
         >
            <Toolbar sx={{ justifyContent: "space-between" }}>
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 2, color: theme.palette.text.primary }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  variant="h6"
                  component="div"
                  sx={{
                     flexGrow: 1,
                     fontWeight: 700,
                     color: theme.palette.text.primary,
                  }}
               >
                  {title}
               </Typography>
               <LanguageSwitcher />
               <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/1.jpg" // Replace with dynamic user avatar
                  sx={{ width: 32, height: 32, ml: 2 }}
               />
            </Toolbar>

            <Drawer
               anchor="left"
               open={drawerOpen}
               onClose={toggleDrawer(false)}
               sx={{
                  "& .MuiDrawer-paper": {
                     width: 250,
                     boxSizing: "border-box",
                     bgcolor: theme.palette.background.default,
                     borderRight: `1px solid ${theme.palette.divider}`,
                  },
               }}
            >
               <Box
                  sx={{
                     height: 180,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                     bgcolor: theme.palette.primary.main,
                     color: theme.palette.primary.contrastText,
                     p: 2,
                     background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                     boxShadow: `0 4px 20px rgba(0,0,0,0.1)`,
                  }}
               >
                  <Avatar
                     alt="Muhammad Jamiu"
                     src="/static/images/avatar/1.jpg"
                     sx={{
                        width: 72,
                        height: 72,
                        mb: 1.5,
                        border: `3px solid ${theme.palette.primary.contrastText}`,
                        boxShadow: `0 4px 12px ${theme.palette.primary.dark}40`,
                     }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                     Muhammad Jamiu
                  </Typography>
                  <Chip
                     label="Employee"
                     size="small"
                     sx={{
                        backgroundColor: theme.palette.primary.contrastText + "30",
                        color: theme.palette.primary.contrastText,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                     }}
                  />
               </Box>
               <List sx={{ p: 2 }}>
                  {menuItems.map((item, index) => (
                     <ListItem
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                           borderRadius: theme.shape.borderRadius,
                           mb: 1,
                           "&:hover": {
                              bgcolor: theme.palette.action.hover,
                           },
                           color: theme.palette.text.primary,
                        }}
                        component="li"
                     >
                        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                     </ListItem>
                  ))}
               </List>
               <Divider sx={{ my: 1 }} />
               <List sx={{ p: 2 }}>
                  {profileMenuItems.map((item, index) => (
                     <ListItem
                        key={index}
                        onClick={() => {
                           item.onClick();
                           setDrawerOpen(false);
                        }}
                        sx={{
                           borderRadius: theme.shape.borderRadius,
                           mb: 1,
                           "&:hover": {
                              bgcolor: theme.palette.action.hover,
                           },
                           color: theme.palette.text.primary,
                        }}
                        component="li"
                     >
                        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        {item.badge && (
                           <Chip
                              label={item.badge}
                              size="small"
                              color="error"
                              sx={{ height: 20, minWidth: 20, fontSize: "0.75rem" }}
                           />
                        )}
                     </ListItem>
                  ))}
                  <ListItem
                     onClick={() => {
                        navigate(`/${lang}/auth`);
                        setDrawerOpen(false);
                     }}
                     sx={{
                        borderRadius: theme.shape.borderRadius,
                        mt: 2,
                        bgcolor: theme.palette.error.main + "10",
                        color: theme.palette.error.main,
                        "&:hover": {
                           bgcolor: theme.palette.error.main + "20",
                        },
                     }}
                     component="li"
                  >
                     <ListItemIcon sx={{ minWidth: 40 }}>
                        <LogoutIcon sx={{ color: theme.palette.error.main }} />
                     </ListItemIcon>
                     <ListItemText primary={t("signOut") || "Sign Out"} />
                  </ListItem>
               </List>
            </Drawer>
         </AppBar>
         <Box
            sx={{
               flex: 1,
               flexShrink: 1,
               display: "flex",
               overflowY: "auto",
               overflowX: "hidden",
               minHeight: "100vh",
            }}
         >
            {children}
         </Box>
      </Box>
   );
};

export default MobileNavbar;
