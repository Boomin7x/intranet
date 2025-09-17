import { Box } from "@mui/material";
import MainFormLayout from "../../../../components/layout/FormLayout";
import MainLayout from "../../../../components/layout/MainLayout";
import DemandAchatForm from "./_forms";
import { useNavigate, useParams } from "react-router-dom";

const NewDemandAchat = () => {
   const navigate = useNavigate();
   const { lang } = useParams();
   return (
      <MainLayout title="New Demand d'achat">
         <MainFormLayout
            onAction={() => {}}
            onCreate={() => {}}
            onDashboard={() => {
               navigate({
                  pathname: `/${lang}/core-operations/demand-achat`,
                  search: `?tabs=index`,
               });
            }}
            onNew={() => {}}
            onPrint={() => {}}
         >
            <Box
               sx={{
                  px: 4,
               }}
            >
               <DemandAchatForm />
            </Box>
         </MainFormLayout>
      </MainLayout>
   );
};

export default NewDemandAchat;
