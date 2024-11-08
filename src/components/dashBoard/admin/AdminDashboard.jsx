import React, { useState, useEffect } from 'react';
import { FaTasks, FaChartLine, FaUserClock, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import AdminTaskManager from './AdminTaskManager';
import UserProfile from './UserProfile';
import StaffManager from './StaffManager';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ isDarkTheme, toggleTheme }) => {
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [activeComponent, setActiveComponent] = useState(null);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        navigate('/admin');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
            </div>
        );
    }

    return (
        <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'}`}>
            {/* Main Dashboard Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-lg">Current Time: {currentTime}</p>
                </div>
                <p className="mt-2">Manage tasks, control task statuses, and monitor admin activities here.</p>

                {/* Render active component */}
                <div className="mt-6 space-y-4">
                    {activeComponent || <div>Please select a section from the sidebar.</div>}
                </div>
            </div>

            {/* Sidebar on the right */}
            <div className={`w-64 ${isDarkTheme ? 'bg-green-700' : 'bg-green-500'} flex flex-col justify-between p-4 fixed right-0 top-0 h-full`}>
                {/* Navigation Links */}
                <nav className="mt-10 space-y-4">
                    <SidebarItem icon={<FaTasks />} label="Task Manager" onClick={() => setActiveComponent(<AdminTaskManager />)} />
                    <SidebarItem icon={<FaChartLine />} label="Monitor Tasks" onClick={() => setActiveComponent(<div>Monitor Tasks Component</div>)} />
                    <SidebarItem icon={<FaUserClock />} label="History & Stats" onClick={() => setActiveComponent(<div>History & Stats Component</div>)} />
                    <SidebarItem icon={<FaUserClock />} label="Staff Manager" onClick={() => setActiveComponent(<StaffManager />)} />
                </nav>

                {/* Support Link, Theme Toggle, and Logout Icon */}
                <div className="flex flex-col items-center mt-4">
                    <div className="flex items-center">
                        <a href="/support" className="text-white text-sm underline mr-2">Support</a>
                        <button onClick={toggleTheme} className="text-white">
                            {isDarkTheme ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                    <button onClick={handleLogout} className="mt-6 flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
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

export default AdminDashboard;
