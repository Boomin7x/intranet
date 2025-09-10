import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useMediaQuery } from "react-responsive";
import { cn } from "../../lib/utils";
import { useRecoilState } from "recoil";
import { sidebarVisibility } from "../../store/atom";

export type MUIIconType = typeof DashboardOutlinedIcon;

const MainDashboardLayout = () => {
   const isSmallLaptops = useMediaQuery({ maxWidth: 1200, minWidth: 768 });
   const [isSidebarVisible] = useRecoilState(sidebarVisibility);
   return (
      <div className="w-screen h-screen overflow-hidden flex ">
         <div
            className={cn(
               "w-1/6  flex flex-col max-w-7xl transition-all duration-300 ease-in-out",
               isSmallLaptops && "w-fit",
               !isSidebarVisible && "w-fit",
            )}
         >
            <Sidebar />
         </div>
         <div className=" flex flex-col flex-1  ">
            <Outlet />
         </div>
      </div>
   );
};

export default MainDashboardLayout;
