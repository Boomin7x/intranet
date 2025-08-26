import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

import { navigationPath } from "../../utils/navigationPath";
import type { INavItems } from "./sidebar";

export const navItems: INavItems[] = [
   {
      icons: DashboardOutlinedIcon,
      title: "Dashboard",
      link: {
         pathname: navigationPath.dashboard,
      },
   },
   {
      icons: AttachMoneyIcon,
      title: "Core operations",
      link: {
         pathname: navigationPath.financeManagement.index,
      },
      navChildren: [
         {
            icons: ShoppingCartOutlinedIcon,
            title: "Demand d'achat",
            link: {
               pathname: navigationPath.financeManagement.demand_achat,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: InventoryOutlinedIcon,
            title: "Resources",
            link: {
               pathname: navigationPath.financeManagement.resource,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: DashboardCustomizeOutlinedIcon,
            title: "Partner",
            link: {
               pathname: navigationPath.financeManagement.partner,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: BuildOutlinedIcon,
            title: "Maintainance",
            link: {
               pathname: navigationPath.financeManagement.maintainance,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: LocalDiningOutlinedIcon,
            title: "Demand Consumation",
            link: {
               pathname: navigationPath.financeManagement.demand_consumation,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: DescriptionOutlinedIcon,
            title: "Contract",
            link: {
               pathname: navigationPath.financeManagement.contract,
               search: "?navopened=Core+operations",
            },
         },
         {
            icons: AccountBalanceWalletOutlinedIcon,
            title: "Budget",
            link: {
               pathname: navigationPath.financeManagement.budget,
               search: "?navopened=Core+operations",
            },
         },
      ],
   },
   {
      icons: AttachMoneyIcon,
      title: "Finance Management",
      link: "#",
      navChildren: [
         {
            icons: DashboardCustomizeOutlinedIcon,
            title: "New Dashboard",
         },
      ],
   },
];
