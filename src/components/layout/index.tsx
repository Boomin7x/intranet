import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export type MUIIconType = typeof DashboardOutlinedIcon;

const MainDashboardLayout = () => {
   return (
      <div className="w-screen h-screen overflow-hidden grid grid-cols-6">
         <Sidebar />
         <div className="col-span-5 flex flex-col size-full  ">
            <Outlet />
         </div>
      </div>
   );
};

export default MainDashboardLayout;
