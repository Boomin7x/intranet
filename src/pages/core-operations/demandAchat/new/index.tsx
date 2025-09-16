import { Box } from "@mui/material";
import MainFormLayout from "../../../../components/layout/FormLayout";
import MainLayout from "../../../../components/layout/MainLayout";

const NewDemandAchat = () => {
   return (
      <MainLayout title="New Demand d'achat">
         <MainFormLayout
            onAction={() => {}}
            onCreate={() => {}}
            onDashboard={() => {}}
            onNew={() => {}}
            onPrint={() => {}}
         >
            <Box
               sx={{
                  px: 4,
               }}
            >
               Stats
            </Box>
         </MainFormLayout>
      </MainLayout>
   );
};

export default NewDemandAchat;
