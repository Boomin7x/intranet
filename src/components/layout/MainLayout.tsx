import { type FC, type ReactNode } from "react";
// import DashboardFooter from "./footer";
import DashboardNavbar from "./navbar";
import DashboardFooter from "./footer";

interface IMainLayout {
   children: ReactNode;
   title?: string;
}
const MainLayout: FC<IMainLayout> = ({ children, title }) => {
   return (
      <div className="flex flex-col flex-1 min-h-screen relative overflow-auto">
         <DashboardNavbar title={title} />
         <div className="flex-1 bg-gray-100">{children}</div>
         <div className="sticky bottom-0 flex-shrink-0">
            <DashboardFooter />
         </div>
      </div>
   );
};

export default MainLayout;
