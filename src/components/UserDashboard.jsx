// UserDashboard.js
import React from 'react';
import { FaTasks, FaChartLine, FaUserClock, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#BE9835] text-white flex flex-col justify-between p-4">
        {/* Avatar and Welcome Message */}
        <div className="flex flex-col items-center">
          <img
            src="/path/to/avatar.png" // Replace with avatar path or user image URL
            alt="User Avatar"
            className="rounded-full h-20 w-20 mb-4 border-2 border-white"
          />
          <h2 className="text-lg font-semibold">Welcome, [User]</h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-4">
          <SidebarItem icon={<FaTasks />} label="Create Task" />
          <SidebarItem icon={<FaChartLine />} label="Monitor Tasks" />
          <SidebarItem icon={<FaUserClock />} label="History & Stats" />
        </nav>

        {/* Support Link and Logo */}
        <div className="flex flex-col items-center mt-4">
          <a href="/support" className="text-white text-sm underline">
            Support
          </a>
          <div className="mt-6">
            <img src="/path/to/logo.png" alt="Logo" className="w-16 h-auto" />
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Here you can manage your tasks, track progress, view assigned history and more.
        </p>

        {/* Task Components */}
        <div className="mt-6 space-y-4">
          {/* Insert components for task creation, progress monitoring, etc., here */}
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Item
const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center p-2 hover:bg-green-600 rounded-md cursor-pointer">
    <div className="text-xl">{icon}</div>
    <span className="ml-4 text-lg">{label}</span>
  </div>
);

export default UserDashboard;
