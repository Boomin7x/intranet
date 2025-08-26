import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

interface DashboardData {
   pendingRequests: number;
   approvedRequests: number;
   budgetUtilization: number;
   recentActivity: { id: string; itemName: string; action: string; date: string }[];
}

const DemandAchatMainTab: React.FC = () => {
   const [, setData] = useState<DashboardData>({
      pendingRequests: 0,
      approvedRequests: 0,
      budgetUtilization: 0,
      recentActivity: [],
   });

   // Simulated API fetch
   useEffect(() => {
      const fetchData = async () => {
         // Replace with actual API call
         const mockData: DashboardData = {
            pendingRequests: 3,
            approvedRequests: 5,
            budgetUtilization: 65,
            recentActivity: [
               { id: "1", itemName: "Office Chairs", action: "Submitted", date: "2025-08-20" },
               { id: "2", itemName: "Laptops", action: "Approved", date: "2025-08-19" },
               { id: "3", itemName: "Printers", action: "Cancelled", date: "2025-08-15" },
            ],
         };
         setData(mockData);
      };
      fetchData();
   }, []);

   return (
      <Box className="flex-1 flex flex-col  p-6">
         {/* <Divider className="mb-6" /> */}
         {/*  */}
         <div className="flex-1 flex items-center justify-center text-2xl">Dashboard overview</div>
      </Box>
   );
};

export default DemandAchatMainTab;
