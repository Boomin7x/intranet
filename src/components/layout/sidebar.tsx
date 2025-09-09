/* eslint-disable react-refresh/only-export-components */
import { useEffect, type FC } from "react";
import type { MUIIconType } from ".";
import { Link, useNavigate, useParams, useSearchParams, type To } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { navItems } from "./utils";
import { useMediaQuery } from "react-responsive";

// Professional color scheme
export const professionalTheme = {
   sidebarBackground: "#1e293b", // slate-800
   activeBackground: "#3b82f6", // blue-500
   hoverBackground: "#334155", // slate-700
   primaryText: "#ffffff",
   secondaryText: "#cbd5e1", // slate-300
   logoGradientFrom: "#4f46e5", // indigo-600
   logoGradientTo: "#7c3aed", // violet-600
   submenuBackground: "#0f172a", // slate-900
};

const Sidebar = () => {
   const { lang } = useParams();
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
            {navItems({ lang }).map((items, i) => (
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
   const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });
   return (
      <Box
         className={cn(
            "flex items-center space-x-1 p-3 border-b border-slate-700",
            isSmallLaptops && "justify-center",
         )}
      >
         <div
            className="flex items-center justify-center w-8 h-8 rounded-xl shadow-lg shrink-0"
            style={{
               background: `linear-gradient(135deg, ${professionalTheme.logoGradientFrom} 0%, ${professionalTheme.logoGradientTo} 100%)`,
            }}
         >
            <span className="text-white text-xl font-extrabold">O</span>
         </div>
         <h1
            className={cn(
               "text-xl md:text-2xl font-bold tracking-tight overflow-hidden max-w-7xl transition-all duration-300 ease-in-out",
               isSmallLaptops && "max-w-0",
            )}
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
   const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });

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

   useEffect(() => {
      searchParams.delete("navopened");
      if (isSmallLaptops) {
         navigate({
            search: "?" + searchParams.toString(),
         });
      }
   }, [isSmallLaptops, navigate, searchParams]);

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
                     className={cn(
                        "py-3 pl-5  transition-all duration-200 ease-in-out",
                        isSmallLaptops &&
                           "p-0 flex items-center !bg-red-300 justify-center w-full aspect-square",
                     )}
                  >
                     <Link
                        to={link}
                        className="flex items-center  group"
                        style={{ color: professionalTheme.secondaryText }}
                     >
                        <Icon className="!text-base group-hover:text-white transition-colors duration-200" />
                        {!isSmallLaptops && (
                           <p
                              className={cn(
                                 "capitalize text-xs pl-3 font-medium group-hover:text-white transition-all duration-200 overflow-hidden max-w-7xl",
                                 isSmallLaptops && "max-w-0",
                              )}
                           >
                              {title}
                           </p>
                        )}
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
            <div
               className={cn(
                  "flex items-center justify-between px-3 py-4",
                  isSmallLaptops && "justify-center",
               )}
            >
               <Link
                  to={link}
                  className={cn(
                     "flex items-center gap-3 group flex-1",
                     isSmallLaptops && "justify-center",
                  )}
                  style={{ color: professionalTheme.primaryText }}
               >
                  <Icon className="!text-xl group-hover:scale-105 transition-transform duration-200" />
                  <p
                     className={cn(
                        "capitalize !text-sm font-semibold tracking-wide transition-all duration-200 overflow-hidden max-w-7xl",
                        isSmallLaptops && "max-w-0",
                     )}
                  >
                     {title}
                  </p>
               </Link>
               {navChildren?.length && !isSmallLaptops ? (
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
                        display: isSmallLaptops ? "none" : undefined,
                     }}
                     onClick={() => {
                        handletoggleView(title);
                     }}
                  >
                     <KeyboardArrowDownIcon
                        className={cn(
                           "transition-all !text-lg duration-300 ease-in-out",
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
