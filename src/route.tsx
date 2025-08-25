import { Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./components/layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboardLayout />}>
        <Route index element={<>This is Home</>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
