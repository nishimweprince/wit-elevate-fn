import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <div className=" border-r-2 border-[#BEC8D0] border-dashed">
        <SideBar />
      </div>
      <div className="bg-black- flex-1 p-5 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
