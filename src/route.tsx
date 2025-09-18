import DashboardHome from "./pages/home";
import MainDashboardLayout from "./components/layout";
import { navigationPath } from "./utils/navigationPath";
import BudgetPage from "./pages/core-operations/budget";
import ContractPage from "./pages/core-operations/contract";
import ResourcesPage from "./pages/core-operations/resources";
import DemandAchatPage from "./pages/core-operations/demandAchat";
import MaintainancePage from "./pages/core-operations/maintainance";
import DemandeConsumationPage from "./pages/core-operations/DemandConsumation";
import {
   Navigate,
   createBrowserRouter,
   RouterProvider,
   type RouteObject,
   useParams,
   Outlet,
   useNavigate,
} from "react-router-dom";
import MainAuthLayout from "./components/layout/auth";
import Signin from "./pages/auth/signin";
import { useEffect } from "react";
import i18n from "./i18n";
import NewDemandAchat from "./pages/core-operations/demandAchat/new";
import Otp from "./pages/auth/otp";

const Root = () => {
   const { lang } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const supportedLanguages = ["en", "fr"];
      if (lang && supportedLanguages.includes(lang) && i18n.language !== lang) {
         i18n.changeLanguage(lang);
      } else if (lang && !supportedLanguages.includes(lang)) {
         navigate(`/fr/`, { replace: true });
      } else if (!lang) {
         navigate(`/fr/`, { replace: true });
      }
   }, [lang, navigate]);

   return <Outlet />;
};

const routes: RouteObject[] = [
   {
      path: "/",
      element: <Navigate to={`/fr/auth`} replace />,
   },
   {
      path: "/:lang",
      element: <Root />,
      children: [
         {
            path: "",
            element: <MainDashboardLayout />,
            children: [
               { index: true, element: <DashboardHome /> },
               {
                  path: "core-operations",
                  children: [
                     {
                        index: true,
                        element: (
                           <Navigate
                              replace
                              to={{
                                 pathname: `/${i18n.language}${navigationPath.financeManagement.demand_achat}`,
                                 search: "?navopened=Core+operations",
                              }}
                           />
                        ),
                     },
                     {
                        path: "demand-achat",
                        children: [
                           {
                              index: true,
                              element: <DemandAchatPage />,
                           },
                           {
                              path: "new",
                              element: <NewDemandAchat />,
                           },
                        ],
                     },
                     { path: "resource", element: <ResourcesPage /> },
                     { path: "maintainance", element: <MaintainancePage /> },
                     { path: "demand-consumation", element: <DemandeConsumationPage /> },
                     { path: "contract", element: <ContractPage /> },
                     { path: "budget", element: <BudgetPage /> },
                  ],
               },
            ],
         },
         {
            path: "auth",
            element: <MainAuthLayout />,
            children: [
               {
                  index: true,
                  element: (
                     <Navigate
                        replace
                        to={{
                           pathname: `/${i18n.language}/auth/signin`,
                        }}
                     />
                  ),
               },
               {
                  path: "signin",
                  element: <Signin />,
               },
               {
                  path: "otp",
                  element: <Otp />,
               },
            ],
         },
         {
            path: "*", // Catch-all for undefined routes
            element: <Navigate to={`/fr/`} replace />,
         },
      ],
   },
   {
      path: "*", // Catch-all for routes without lang parameter
      element: <Navigate to={`/fr/`} replace />,
   },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
   return <RouterProvider router={router} />;
};

export default AppRoutes;
