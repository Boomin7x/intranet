import { Tab, Tabs } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { demandConsumationNavPath } from "./_utils/demandConsumationNavPath";
import DemandConsumationMainTab from "./tabs/main";
import DemandConsumationList from "./tabs/list";
import DemandConsumationHistory from "./tabs/history";
import NewDemandConsumation from "./tabs/new";

const DemandeConsumationPage = () => {
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
   const navItems = Object.entries(demandConsumationNavPath).map(([key, value]) => ({
      title: key.replaceAll("-", " "),
      links: value,
   }));

   const RenderTab = () => {
      switch (tabs) {
         case demandConsumationNavPath.new:
            return <NewDemandConsumation />;
         case demandConsumationNavPath.list:
            return <DemandConsumationList />;
         case demandConsumationNavPath.history:
            return <DemandConsumationHistory />;
         default:
            return <DemandConsumationMainTab />;
      }
   };
   return (
      <MainLayout title="Demand Consumations">
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

export default DemandeConsumationPage;
