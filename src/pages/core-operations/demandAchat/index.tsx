import { Tab, Tabs } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { coreOperationNavPath } from "../_utils/coreOperationNavPath";
import BudgetLinkageTab from "./tabs/budget-linkage";
import DemandAchatList from "./tabs/list";
import DemandAchatMainTab from "./tabs/main";
import NewDemandAchat from "./tabs/new";
import DemandAchatOrderHistory from "./tabs/order-history";
import DemandAchatValidationWorkFlow from "./tabs/validation-workflow";

const DemandAchatPage = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const tabs = searchParams.get("tabs");

   const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
      console.log(event);
      const query = new URLSearchParams(searchParams);
      if (newValue.startsWith("/")) {
         query.set("tabs", "");
      } else {
         query.set("tabs", newValue);
      }

      navigate(
         {
            search: `?${query.toString()}`,
         },
         {
            replace: true,
         },
      );
   };
   const navItems = Object.entries(coreOperationNavPath).map(([key, value]) => ({
      title: key.replaceAll("-", " "),
      links: value,
   }));

   const RenderTab = () => {
      switch (tabs) {
         case coreOperationNavPath.new:
            return <NewDemandAchat />;
         case coreOperationNavPath.list:
            return <DemandAchatList />;
         case coreOperationNavPath["Order-history"]:
            return <DemandAchatOrderHistory />;
         case coreOperationNavPath["budget-linkage"]:
            return <BudgetLinkageTab />;
         case coreOperationNavPath["valifation-workflow"]:
            return <DemandAchatValidationWorkFlow />;
         default:
            return <DemandAchatMainTab />;
      }
   };
   return (
      <MainLayout title="Demand d'achat">
         <div className="flex flex-col flex-1 size-full">
            <Tabs
               value={tabs}
               onChange={onTabChange}
               textColor="secondary"
               indicatorColor="secondary"
               aria-label="secondary tabs example"
            >
               {navItems?.map((items, i) => {
                  return <Tab key={"Navtabs" + i} value={items.links} label={items?.title} />;
               })}
            </Tabs>
            <div className="flex-1 flex flex-col bg-white p-6">
               <RenderTab />
            </div>
         </div>
      </MainLayout>
   );
};

export default DemandAchatPage;
