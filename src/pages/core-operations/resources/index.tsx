import { Tab, Tabs } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { resourcesNavPath } from "./_utils/resourcesNavPath";
import ResourceList from "./tabs/list";
import NewResource from "./tabs/new";
import ResourceMainTab from "./tabs/main";
import ResourceHistory from "./tabs/history";

const ResourcesPage = () => {
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
   const navItems = Object.entries(resourcesNavPath).map(([key, value]) => ({
      title: key.replaceAll("-", " "),
      links: value,
   }));

   const RenderTab = () => {
      switch (tabs) {
         case resourcesNavPath.new:
            return <NewResource />;
         case resourcesNavPath.list:
            return <ResourceList />;
         case resourcesNavPath.history:
            return <ResourceHistory />;
         default:
            return <ResourceMainTab />;
      }
   };
   return (
      <MainLayout title="Resources">
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

export default ResourcesPage;
