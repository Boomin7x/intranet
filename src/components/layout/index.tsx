import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cn } from "../../lib/utils";
import { sidebarVisibility } from "../../store/atom";
import MobileNavbar from "./mobileNavbar";
import Sidebar from "./sidebar";

export type MUIIconType = typeof DashboardOutlinedIcon;

const MainDashboardLayout = () => {
   const [isSidebarVisible] = useRecoilState(sidebarVisibility);
   return (
      <div className="w-screen h-screen overflow-y-auto overflow-x-hidden md:overflow-hidden flex flex-col md:flex-row ">
         <MobileNavbar>
            <div
               className={cn(
                  "w-1/6  hidden md:flex  flex-col h-full overflow-y-auto max-w-7xl transition-all duration-300 ease-in-out",
                  !isSidebarVisible && "w-fit",
               )}
            >
               <Sidebar />
            </div>
            <div className=" flex flex-col flex-1   ">
               <Outlet />
            </div>
         </MobileNavbar>
      </div>
   );
};

export default MainDashboardLayout;
