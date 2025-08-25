import { Box, IconButton } from "@mui/material";
import { Link, Outlet, type To, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { themeVariables } from "../../utils/themeVariables";
import type { FC } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { cn } from "../../lib/utils";
import React from "react";

export type MUIIconType = typeof DashboardOutlinedIcon;

const MainDashboardLayout = () => {
  const dashboardTitle = (
    <Box className="text-4xl flex items-center text-white  scale-80 ">
      <div className="font-extrabold text-5xl size-12 text-white  flex items-center justify-center">
        o
      </div>
      Intranet
    </Box>
  );

  const navItems: INavItems[] = [
    {
      icons: DashboardOutlinedIcon,
      title: "Dashboard",
      link: {
        pathname: "/",
      },
    },
    {
      icons: AttachMoneyIcon,
      title: "Finance Management",
      link: {
        pathname: "/",
      },
      navChildren: [
        {
          icons: DashboardOutlinedIcon,
          title: "New Dashboard",
        },
      ],
    },
    {
      icons: AttachMoneyIcon,
      title: "Finance Management 2",
      link: {
        pathname: "/",
      },
      navChildren: [
        {
          icons: DashboardOutlinedIcon,
          title: "New Dashboard",
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden grid grid-cols-6">
      <Box
        sx={{
          bgcolor: themeVariables.secondaryDark,
        }}
        className=" flex-1 flex flex-col"
      >
        {dashboardTitle}
        <div className="flex-1 flex flex-col ">
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
      <div className="col-span-5 flex flex-col size-full  ">
        <Outlet />
      </div>
    </div>
  );
};

interface NavItemProps {
  title: string;
  icons: MUIIconType;
  link?: To;
  isActive?: boolean;
}
interface INavItems extends NavItemProps {
  navChildren?: NavItemProps[];
}

// type Box = typeof Box["sx"]
const NavItems: FC<INavItems> = ({
  icons: Icon,
  link = {
    pathname: "#",
  },
  title,
  isActive = false,
  navChildren,
}) => {
  //   const location = useLocation();
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
          showNav ? "max-h-96" : "max-h-0",
        )}
      >
        {navChildren.map((items, i) => {
          const { icons: Icon, title, link = "#" } = items;
          return (
            <Box
              sx={{
                bgcolor: showNav ? "#0c0300" : undefined,
              }}
              key={"navChildren" + i}
              className="py-4 pl-8 !transition-all text-white !duration-300 !ease-in-out"
            >
              <Link to={link} className="flex items-center gap-2">
                <Icon />
                <p className="capitalize font-bold ">{title}</p>
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
          bgcolor: isActive ? themeVariables.primaryDark : undefined,
        }}
        className="text-white p-6"
      >
        <div className="flex items-center justify-between">
          <Link to={link} className="flex items-center gap-2">
            <Icon />
            <p className="capitalize font-bold ">{title}</p>
          </Link>
          {navChildren?.length ? (
            <IconButton
              disableRipple
              size="small"
              aria-label="chevron Button"
              className=" !rounded !text-white  "
              sx={{
                ":hover": {
                  bgcolor: themeVariables.primaryDark,
                },
              }}
              onClick={() => {
                // handleToggleNav();
                handletoggleView(title);
              }}
            >
              <KeyboardArrowDownIcon
                className={cn("!transition-all duration-300", navOpened === title && "rotate-180")}
              />
            </IconButton>
          ) : null}
        </div>
      </Box>
      {renderChildren(navOpened === title)}
    </>
  );
};

export default MainDashboardLayout;
