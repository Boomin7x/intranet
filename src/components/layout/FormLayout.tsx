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
               // Responsive adjustments for header layout
               alignItems: { xs: "flex-start", sm: "center" },
               justifyContent: "space-between",
               flexDirection: { xs: "column", sm: "row" },
               gap: 2, // Added gap for spacing between elements
            }}
         >
            <Box>
               <Button
                  size="small"
                  disabled={false}
                  startIcon={<DashboardOutlinedIcon />}
                  onClick={onDashboard}
                  sx={{ flexShrink: 0 }} // Prevent button from shrinking on small screens
               >
                  Demand d'achat dashboard
               </Button>
            </Box>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap", // Allow buttons to wrap on smaller screens
                  justifyContent: { xs: "flex-start", sm: "flex-end" }, // Adjust alignment
                  "& > button": {
                     flexGrow: { xs: 1, sm: 0 }, // Allow buttons to grow on xs screens
                     minWidth: { xs: "100px", sm: "fit-content" }, // Prevent buttons from becoming too small
                  },
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
                     sx={{ py: { xs: 1, sm: 0.5 } }} // Adjust vertical padding for buttons
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
