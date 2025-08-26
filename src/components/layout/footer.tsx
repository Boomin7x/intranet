import { Link } from "react-router-dom";

const DashboardFooter = () => {
   return (
      <div className="w-full bg-white p-2 text-center text-sm text-gray-500 border-t border-gray-200 sticky bottom-0 left-0">
         © {new Date().getFullYear()} Company Name. All rights reserved. Powered by{" "}
         <Link to="https://unisoft-eight.vercel.app/" className="text-blue-600 hover:underline">
            Univsoft
         </Link>
      </div>
   );
};

export default DashboardFooter;
