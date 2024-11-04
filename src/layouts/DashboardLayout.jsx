// DashboardLayout.js
import React from 'react';
// import Sidebar from './Sidebar'; 

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#BE9835]">
      {/* Sidebar with logo space at the bottom */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-grow p-6">{children}</div>
    </div> 

  );
};

export default DashboardLayout;
