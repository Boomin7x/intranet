import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./components/layout";
import DemandAchatPage from "./pages/core-operations/demandAchat";
import DashboardHome from "./pages/home";
import { navigationPath } from "./utils/navigationPath";
import ResourcesPage from "./pages/core-operations/resources";
import MaintainancePage from "./pages/core-operations/maintainance";
import DemandeConsumationPage from "./pages/core-operations/DemandConsumation";
import ContractPage from "./pages/core-operations/contract";
import BudgetPage from "./pages/core-operations/budget";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<MainDashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="core-operations">
               <Route
                  index
                  element={
                     <Navigate
                        replace
                        to={{
                           pathname: navigationPath.financeManagement.demand_achat,
                           search: "?navopened=Core+operations",
                        }}
                     />
                  }
               />
               <Route path="demand-achat" element={<DemandAchatPage />} />
               <Route path="resource" element={<ResourcesPage />} />
               <Route path="maintainance" element={<MaintainancePage />} />
               <Route path="demand-consumation" element={<DemandeConsumationPage />} />
               <Route path="contract" element={<ContractPage />} />
               <Route path="budget" element={<BudgetPage />} />
            </Route>
         </Route>
      </Routes>
   );
};

export default AppRoutes;
