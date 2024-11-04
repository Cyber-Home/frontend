import React, { useState, useEffect } from 'react'; 
import { FaTasks, FaChartLine, FaUserClock, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import TaskManager from './TaskManager'; // Import the TaskManager component 
import UserAvatar from '../../assets/user-avatar.png' 
import cyHomeLogo from '../../assets/logo.png'

const UserDashboard = ({ isDarkTheme, toggleTheme }) => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showPlans, setShowPlans] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // State to manage active component

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${isDarkTheme ? 'bg-green-700' : 'bg-green-500'} flex flex-col justify-between p-4`}>
        {/* Avatar and Welcome Message */}
        <div className="flex flex-col items-center">
          <img
            src={UserAvatar}
            alt="User Avatar"
            className="rounded-full h-20 w-20 mb-4 border-2 border-white"
          />
          <h2 className="text-lg font-semibold">Welcome, [User]</h2>
          {/* Subscription Plan with dropdown */}
          {/* <div className="relative mt-2">
            <button onClick={() => setShowPlans(!showPlans)} className="text-white">
              Subscription Plan: Premium
            </button>
            {showPlans && (
              <div className="absolute bg-white text-gray-800 rounded-md shadow-lg mt-1">
                <a href="/pricing" className="block px-4 py-2 hover:bg-green-600">Basic Plan</a>
                <a href="/pricing" className="block px-4 py-2 hover:bg-green-600">Standard Plan</a>
                <a href="/pricing" className="block px-4 py-2 hover:bg-green-600">Premium Plan</a>
              </div>
            )}
          </div> */}
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-4">
          <SidebarItem icon={<FaTasks />} label="Create Task" onClick={() => setActiveComponent(<TaskManager />)} />
          <SidebarItem icon={<FaChartLine />} label="Monitor Tasks" onClick={() => setActiveComponent(<div>Monitor Tasks Component</div>)} />
          <SidebarItem icon={<FaUserClock />} label="History & Stats" onClick={() => setActiveComponent(<div>History & Stats Component</div>)} />
        </nav>

        {/* Support Link and Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center">
            <a href="/support" className="text-white text-sm underline mr-2">Support</a>
            <button onClick={toggleTheme} className="text-white">
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button> 
          </div>
          <div className="mt-6">
           <a href="/"> <img src={cyHomeLogo} alt="Logo" className="w-24 h-auto" /></a>
          </div> 
        </div> 
        <a href="/login"><button className="mt-6 flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button></a>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-lg">Current Time: {currentTime}</p>
        </div>
        <p className="mt-2">Here you can manage your tasks, track progress, view assigned history, and more.</p>

        {/* Render active component */}
        <div className="mt-6 space-y-4">
          {activeComponent || <div>Please select a task option from the sidebar.</div>}
        </div>
      </div> 
    </div>
  );
};

// Reusable Sidebar Item
const SidebarItem = ({ icon, label, onClick }) => (
  <div className="flex items-center p-2 hover:bg-green-600 rounded-md cursor-pointer" onClick={onClick}>
    <div className="text-xl">{icon}</div>
    <span className="ml-4 text-lg">{label}</span>
  </div> 

  
);

export default UserDashboard;
