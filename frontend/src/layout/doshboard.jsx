import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../component/usermanu";
const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar/User Menu */}
      <aside className="w-64  p-4 ">
        <UserMenu />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 ">
        <Outlet /> {/* Nested route content goes here */}
      </main>
    </div>
  );
};

export default Dashboard;
