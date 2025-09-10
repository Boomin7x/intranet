/* eslint-disable react-refresh/only-export-components */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton, Typography, Tooltip, useTheme, alpha } from "@mui/material";
import { useEffect, type FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate, useParams, useSearchParams, type To } from "react-router-dom";
import { useRecoilState } from "recoil";
import type { MUIIconType } from ".";
import { sidebarVisibility } from "../../store/atom";
import { navItems } from "./utils";

const Sidebar = () => {
   const { lang } = useParams();
   const theme = useTheme();

   return (
      <Box
         sx={{
            bgcolor: "background.paper",
            borderRight: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: theme.shadows[1],
         }}
      >
         <DashboardLogo />
         <Box
            sx={{
               borderTop: `1px solid ${alpha(theme.palette.primary.light, 0.15)}`,
               display: "flex",
               flexDirection: "column",
               flex: 1,
               pt: 1,
            }}
         >
            {navItems({ lang }).map((items, i) => (
               <NavItems
                  key={"navItems" + i}
                  {...items}
                  isActive={
                     typeof items.link === "object" && items.link?.pathname === location.pathname
                  }
               />
            ))}
         </Box>
      </Box>
   );
};

export const DashboardLogo = () => {
   const theme = useTheme();
   const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });
   const [isFullSidebar] = useRecoilState(sidebarVisibility);

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 3,
            justifyContent: isSmallLaptops ? "center" : "flex-start",
         }}
      >
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               width: 40,
               height: 40,
               borderRadius: 2,
               background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
               boxShadow: theme.shadows[3],
               flexShrink: 0,
            }}
         >
            <Typography
               variant="h5"
               sx={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.25rem",
               }}
            >
               O
            </Typography>
         </Box>
         <Typography
            variant="h5"
            sx={{
               fontSize: { xs: "1.25rem", md: "1.5rem" },
               fontWeight: 700,
               letterSpacing: "-0.025em",
               color: theme.palette.text.primary,
               overflow: "hidden",
               maxWidth: isSmallLaptops || !isFullSidebar ? 0 : "200px",
               transition: "max-width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
               whiteSpace: "nowrap",
            }}
         >
            Intranet
         </Typography>
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
   const theme = useTheme();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const navOpened = searchParams.get("navopened");
   const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });
   const [isSidebarVisible] = useRecoilState(sidebarVisibility);

   console.log({ isSidebarVisible });

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
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               overflow: "hidden",
               maxHeight: showNav ? "450px" : 0,
               transition: "max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
         >
            {navChildren.map((items, i) => {
               const { icons: Icon, title, link = "#" } = items;
               return (
                  <Tooltip
                     key={"navChildrenTooltip" + i}
                     title={title}
                     placement="right"
                     disableHoverListener={isSidebarVisible && !isSmallLaptops}
                     arrow
                  >
                     <Box
                        key={"navChildren" + i}
                        sx={{
                           bgcolor: showNav
                              ? alpha(theme.palette.primary.main, 0.08)
                              : "transparent",
                           borderLeft: showNav
                              ? `3px solid ${theme.palette.primary.main}`
                              : "3px solid transparent",
                           py: 2,
                           pl: 4,
                           transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                           ...(isSmallLaptops && {
                              p: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              aspectRatio: "1",
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                           }),
                           "&:hover": {
                              bgcolor: showNav
                                 ? alpha(theme.palette.primary.main, 0.12)
                                 : "transparent",
                           },
                        }}
                     >
                        <Box
                           component={Link}
                           to={link}
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              color: theme.palette.text.secondary,
                              textDecoration: "none",
                              "&:hover": {
                                 color: theme.palette.text.primary,
                              },
                           }}
                        >
                           <Icon
                              sx={{
                                 fontSize: "1rem",
                                 transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                           />
                           {isSidebarVisible && (
                              <Typography
                                 variant="caption"
                                 sx={{
                                    textTransform: "capitalize",
                                    fontWeight: 500,
                                    ml: 1.5,
                                    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    overflow: "hidden",
                                    maxWidth: isSmallLaptops ? 0 : "200px",
                                 }}
                              >
                                 {title}
                              </Typography>
                           )}
                        </Box>
                     </Box>
                  </Tooltip>
               );
            })}
         </Box>
      );
   };

   return (
      <>
         <Box
            sx={{
               bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : "transparent",
               borderLeft: isActive
                  ? `4px solid ${theme.palette.primary.main}`
                  : "4px solid transparent",
               transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
               "&:hover": {
                  bgcolor: isActive
                     ? alpha(theme.palette.primary.main, 0.12)
                     : alpha(theme.palette.action.hover, 0.04),
               },
            }}
         >
            <Tooltip
               title={title}
               placement="right"
               disableHoverListener={isSidebarVisible && !isSmallLaptops}
               arrow
            >
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: isSmallLaptops ? "center" : "space-between",
                     px: 3,
                     py: 2,
                     cursor: "pointer",
                  }}
                  onClick={() => {
                     handletoggleView(title);
                  }}
               >
                  <Box
                     component={Link}
                     to={link}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flex: 1,
                        justifyContent: isSmallLaptops ? "center" : "flex-start",
                        color: theme.palette.text.primary,
                        textDecoration: "none",
                        "&:hover .nav-icon": {
                           transform: "scale(1.05)",
                        },
                     }}
                  >
                     <Icon
                        className="nav-icon"
                        sx={{
                           fontSize: "1.25rem",
                           transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                     />
                     {isSidebarVisible && (
                        <Typography
                           variant="body2"
                           sx={{
                              textTransform: "capitalize",
                              fontWeight: 600,
                              letterSpacing: "0.025em",
                              transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                              overflow: "hidden",
                              maxWidth: isSmallLaptops ? 0 : "200px",
                           }}
                        >
                           {title}
                        </Typography>
                     )}
                  </Box>
                  {navChildren?.length && isSidebarVisible && !isSmallLaptops && (
                     <IconButton
                        disableRipple
                        size="small"
                        aria-label="chevron Button"
                        sx={{
                           color: theme.palette.text.secondary,
                           p: 0.5,
                           "&:hover": {
                              bgcolor: alpha(theme.palette.action.hover, 0.08),
                              color: theme.palette.text.primary,
                           },
                        }}
                        onClick={() => {
                           handletoggleView(title);
                        }}
                     >
                        <KeyboardArrowDownIcon
                           sx={{
                              fontSize: "1.125rem",
                              transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                              transform: navOpened === title ? "rotate(180deg)" : "rotate(0deg)",
                           }}
                        />
                     </IconButton>
                  )}
               </Box>
            </Tooltip>
         </Box>
         {renderChildren(navOpened === title)}
      </>
   );
};

export default Sidebar;
