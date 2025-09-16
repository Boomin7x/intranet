import { alpha, Box, Button, type ButtonProps } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { grey } from "@mui/material/colors";
import type { FC, ReactNode } from "react";

interface IFormLayout {
   children: ReactNode;
   onNew: () => void;
   onPrint: () => void;
   onAction: () => void;
   onCreate: () => void;
   onDashboard: () => void;
}
const MainFormLayout: FC<IFormLayout> = ({
   children,
   onAction,
   onCreate,
   onDashboard,
   onNew,
   onPrint,
}) => {
   const buttonArr: Array<ButtonProps & { label: string }> = [
      {
         label: "New",
         startIcon: <AddOutlinedIcon />,
         variant: "outlined",
         onClick: onNew,
      },
      {
         label: "save",
         startIcon: <SaveOutlinedIcon />,
         variant: "outlined",
         onClick: onCreate,
      },
      {
         label: "Print",
         startIcon: <LocalPrintshopOutlinedIcon />,
         variant: "outlined",
         onClick: onPrint,
      },
      {
         label: "Action",
         startIcon: <TouchAppOutlinedIcon />,
         variant: "contained",
         color: "secondary",
         onClick: onAction,
      },
   ];

   return (
      <>
         <Box
            sx={{
               width: "100%",
               px: 3,
               pl: 3.5,
               py: 2,
               borderBottom: () => `1px solid ${alpha(grey[800], 0.2)}`,
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <Box>
               <Button
                  size="small"
                  disabled={false}
                  startIcon={<DashboardOutlinedIcon />}
                  onClick={onDashboard}
               >
                  Demand d'achat dashboard
               </Button>
            </Box>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
               }}
            >
               {buttonArr.map((btn, idx) => (
                  <Button
                     key={btn.label + idx}
                     size="small"
                     disabled={false}
                     startIcon={btn.startIcon}
                     variant={btn.variant}
                     color={btn.color}
                     onClick={btn.onClick}
                  >
                     {btn.label}
                  </Button>
               ))}
            </Box>
         </Box>
         {children}
      </>
   );
};

export default MainFormLayout;
