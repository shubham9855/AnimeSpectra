import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";

export const SidebarLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
