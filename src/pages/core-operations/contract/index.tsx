import { Tab, Tabs } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import { contractNavPath } from "./_utils/contractNavPath";
import ContractMainTab from "./tabs/main";
import ContractList from "./tabs/list";
import ContractHistory from "./tabs/history";
import NewContract from "./tabs/new";

const ContractPage = () => {
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
   const navItems = Object.entries(contractNavPath).map(([key, value]) => ({
      title: key.replaceAll("-", " "),
      links: value,
   }));

   const RenderTab = () => {
      switch (tabs) {
         case contractNavPath.new:
            return <NewContract />;
         case contractNavPath.list:
            return <ContractList />;
         case contractNavPath.history:
            return <ContractHistory />;
         default:
            return <ContractMainTab />;
      }
   };
   return (
      <MainLayout title="Contract">
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

export default ContractPage;
