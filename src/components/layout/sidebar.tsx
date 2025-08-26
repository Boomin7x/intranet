/* eslint-disable react-refresh/only-export-components */
import { type FC } from "react";
import type { MUIIconType } from ".";
import { Link, useNavigate, useSearchParams, type To } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { navItems } from "./utils";

// Professional color scheme
export const professionalTheme = {
   // Main sidebar background - sophisticated dark blue-gray
   sidebarBackground: "#1e293b", // slate-800

   // Active item background - subtle blue accent
   activeBackground: "#3b82f6", // blue-500

   // Hover states
   hoverBackground: "#334155", // slate-700

   // Text colors
   primaryText: "#ffffff",
   secondaryText: "#cbd5e1", // slate-300

   // Logo gradient
   logoGradientFrom: "#4f46e5", // indigo-600
   logoGradientTo: "#7c3aed", // violet-600

   // Children/submenu background
   submenuBackground: "#0f172a", // slate-900
};

const Sidebar = () => {
   return (
      <Box
         sx={{
            bgcolor: professionalTheme.sidebarBackground,
            borderRight: "1px solid #334155", // subtle border
         }}
         className="flex-1 flex flex-col"
      >
         <DashboardLogo />
         <div className="flex-1 flex flex-col">
            {navItems.map((items, i) => (
               <NavItems
                  key={"navItems" + i}
                  {...items}
                  isActive={
                     typeof items.link === "object" && items.link?.pathname === location.pathname
                  }
               />
            ))}
         </div>
      </Box>
   );
};

export const DashboardLogo = () => {
   return (
      <Box className="flex items-center space-x-3 p-6 border-b border-slate-700">
         {/* Logo Mark */}
         <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg"
            style={{
               background: `linear-gradient(135deg, ${professionalTheme.logoGradientFrom} 0%, ${professionalTheme.logoGradientTo} 100%)`,
            }}
         >
            <span className="text-white text-2xl font-extrabold">O</span>
         </div>

         {/* Logo Text */}
         <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: professionalTheme.primaryText }}
         >
            Intranet
         </h1>
      </Box>
   );
};

interface NavItemProps {
   title: string;
   icons: MUIIconType;
   link?: To;
   isActive?: boolean;
}
export interface INavItems extends NavItemProps {
   navChildren?: NavItemProps[];
}

const NavItems: FC<INavItems> = ({
   icons: Icon,
   link = {
      pathname: "#",
   },
   title,
   isActive = false,
   navChildren,
}) => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const navOpened = searchParams.get("navopened");

   const handletoggleView = (title: string) => {
      if (navOpened === title) {
         searchParams.delete("navopened");
      } else {
         searchParams.set("navopened", title);
      }
      navigate(
         {
            search: `?${searchParams.toString()}`,
         },
         {
            replace: true,
            preventScrollReset: true,
         },
      );
   };

   const renderChildren = (showNav: boolean = false) => {
      if (!navChildren || !navChildren.length) {
         return null;
      }

      return (
         <div
            className={cn(
               "flex flex-col h-fit overflow-hidden transition-all duration-300 ease-in-out",
               showNav ? "max-h-[28rem]" : "max-h-0",
            )}
         >
            {navChildren.map((items, i) => {
               const { icons: Icon, title, link = "#" } = items;
               return (
                  <Box
                     sx={{
                        bgcolor: showNav ? professionalTheme.submenuBackground : "transparent",
                        borderLeft: showNav
                           ? `3px solid ${professionalTheme.activeBackground}`
                           : "3px solid transparent",
                        "&:hover": {
                           bgcolor: showNav ? "#1e1b2e" : "transparent",
                        },
                     }}
                     key={"navChildren" + i}
                     className="py-3 pl-12 pr-6 transition-all duration-200 ease-in-out"
                  >
                     <Link
                        to={link}
                        className="flex items-center gap-3 group"
                        style={{ color: professionalTheme.secondaryText }}
                     >
                        <Icon className="text-lg group-hover:text-white transition-colors duration-200" />
                        <p className="capitalize font-medium group-hover:text-white transition-colors duration-200">
                           {title}
                        </p>
                     </Link>
                  </Box>
               );
            })}
         </div>
      );
   };

   return (
      <>
         <Box
            sx={{
               bgcolor: isActive ? professionalTheme.activeBackground : "transparent",
               "&:hover": {
                  bgcolor: isActive
                     ? professionalTheme.activeBackground
                     : professionalTheme.hoverBackground,
               },
               borderLeft: isActive ? `4px solid #60a5fa` : "4px solid transparent", // blue-300 accent
            }}
            className="transition-all duration-200 ease-in-out"
         >
            <div className="flex items-center justify-between px-6 py-4">
               <Link
                  to={link}
                  className="flex items-center gap-3 group flex-1"
                  style={{ color: professionalTheme.primaryText }}
               >
                  <Icon className="text-xl group-hover:scale-105 transition-transform duration-200" />
                  <p className="capitalize font-semibold tracking-wide">{title}</p>
               </Link>
               {navChildren?.length ? (
                  <IconButton
                     disableRipple
                     size="small"
                     aria-label="chevron Button"
                     sx={{
                        color: professionalTheme.primaryText,
                        padding: "4px",
                        "&:hover": {
                           bgcolor: "rgba(255, 255, 255, 0.1)",
                        },
                     }}
                     onClick={() => {
                        handletoggleView(title);
                     }}
                  >
                     <KeyboardArrowDownIcon
                        className={cn(
                           "transition-all duration-300 ease-in-out",
                           navOpened === title && "rotate-180",
                        )}
                     />
                  </IconButton>
               ) : null}
            </div>
         </Box>
         {renderChildren(navOpened === title)}
      </>
   );
};

export default Sidebar;
