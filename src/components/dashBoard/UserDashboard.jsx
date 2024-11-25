import React, { useState, useEffect } from 'react'; 
import { FaTasks, FaChartLine, FaUserClock, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TaskManager from './TaskManager';
import UserAvatar from '../../assets/user-avatar.png';
import siteLogo from '../../assets/d-spot-logo.png';
import Swal from 'sweetalert2';
import Login from '../../components/login'; 
import { FaClock } from 'react-icons/fa';
// import TaskDisplay from './TaskDisplay';

const UserDashboard = ({ isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showPlans, setShowPlans] = useState(false);
  const [activeComponent, setActiveComponent] = useState('default');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userName, setUserName] = useState(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).firstName : 'User';
  });
  const [isTaskManagerOpen, setIsTaskManagerOpen] = useState(false);

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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setIsLoginModalOpen(true);
      }
    });
  };

  const handleOpenTaskManager = () => {
    setIsTaskManagerOpen(true);
  };

  const handleCloseTaskManager = () => {
    setIsTaskManagerOpen(false);
  };

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'createTask':
        return <TaskManager isOpen={isTaskManagerOpen} onClose={handleCloseTaskManager} />;
      case 'monitorTasks':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Monitor Tasks</h2>
            {/* Add your Monitor Tasks content here */}
            <div>Monitor Tasks Component Content</div>
          </div>
        );
      case 'history':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">History & Stats</h2>
            {/* Add your History & Stats content here */}
            <div>History & Stats Component Content</div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600">Please select a task option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} flex flex-col justify-between p-4 shadow-lg`}>
        {/* Avatar and Welcome Message */}
        <div className="flex flex-col items-center">
          <img
            src={UserAvatar}
            alt="User Avatar"
            className="rounded-full h-20 w-20 mb-4 border-2 border-green-500"
          />
          <h2 className="text-lg font-semibold">Welcome, {userName}</h2>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-4">
          <SidebarItem 
            icon={<FaTasks />} 
            label="Create Task" 
            onClick={() => setActiveComponent('createTask')}
            active={activeComponent === 'createTask'}
          />
          <SidebarItem 
            icon={<FaChartLine />} 
            label="Monitor Tasks" 
            onClick={() => setActiveComponent('monitorTasks')}
            active={activeComponent === 'monitorTasks'}
          />
          <SidebarItem 
            icon={<FaUserClock />} 
            label="History & Stats" 
            onClick={() => setActiveComponent('history')}
            active={activeComponent === 'history'}
          />
        </nav>

        {/* Support Link and Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center">
            <a href="/support" className="text-green-500 text-sm underline mr-2">Support</a>
            <button onClick={toggleTheme} className="text-green-600">
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button> 
          </div>
          {/* <div className="mt-6">
            <a href="/"> <img src={siteLogo} alt="Logo" className="w-34 h-auto" /></a>
          </div>  */}
        </div> 

        <button
          className="mt-6 flex items-center justify-center w-20  py-2 px-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 ml-16"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="ml-2" /> 
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-lg text-gray-600"><FaClock className="text-green-600 text-xl animate-pulse"/>{currentTime}</p>
          </div>
        </div>

        {/* Render active component */}
        <div className="mt-6">
          {renderActiveComponent()}
        </div>

        {/* <div className="flex-1 overflow-auto">
          <TaskDisplay />
        </div> */}
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Login 
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            navigate('/');
          }}
          showSignUpModal={() => {
            setIsLoginModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, onClick, active }) => (
  <div 
    className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200
      ${active ? 'bg-[#04BE16] text-white' : 'hover:bg-[#04BE16] hover:text-white'}`}
    onClick={onClick}
  >
    <div className="text-xl">{icon}</div>
    <span className="ml-4 text-lg">{label}</span>
  </div>
);

export default UserDashboard;