import { Tab, Tabs } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { maintainanceNavPath } from "./_utils/maintainanceNavPath";
import MaintainanceMainTab from "./tabs/main";
import MaintainanceList from "./tabs/list";
import MaintainanceHistory from "./tabs/history";
import NewMaintainance from "./tabs/new";

const MaintainancePage = () => {
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
   const navItems = Object.entries(maintainanceNavPath).map(([key, value]) => ({
      title: key.replaceAll("-", " "),
      links: value,
   }));

   const RenderTab = () => {
      switch (tabs) {
         case maintainanceNavPath.new:
            return <NewMaintainance />;
         case maintainanceNavPath.list:
            return <MaintainanceList />;
         case maintainanceNavPath.history:
            return <MaintainanceHistory />;
         default:
            return <MaintainanceMainTab />;
      }
   };
   return (
      <MainLayout title="Maintainance">
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

export default MaintainancePage;
