import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope, FaServicestack, FaDollarSign, FaSun, FaMoon, FaArrowLeft, FaBars, FaBookOpen, FaUserAlt } from 'react-icons/fa';
import siteLogo from '../assets/daily-spot-logo.png';

const Navbar = ({ isCollapsed, toggleCollapse, isDarkTheme, toggleTheme }) => {
  return (
    <div className={`h-screen transition-all duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white fixed z-30'}`}>
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full p-5 flex flex-col`}>
        {/* Logo & Hamburger Icon */}
        <div className="flex items-center mb-5">
          <Link to='/'><img className='w-full h-full' src={siteLogo} alt="logo" /></Link>
          <button onClick={toggleCollapse} className="ml-auto text-xl">
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-2">
          <NavItem to="/" icon={<FaHome />} label="Home" isCollapsed={isCollapsed} />
          <NavItem to="/about" icon={<FaInfoCircle />} label="About" isCollapsed={isCollapsed} />
          <NavItem to="/contact" icon={<FaEnvelope />} label="Contact" isCollapsed={isCollapsed} />
          <NavItem to="/services" icon={<FaServicestack />} label="Services" isCollapsed={isCollapsed} />
          {/* <NavItem to="/signup" icon={<FaBookOpen />} label="Register" isCollapsed={isCollapsed} />
          <NavItem to="/login" icon={<FaUserAlt />} label="Login" isCollapsed={isCollapsed} />
          <NavItem to="/pricing" icon={<FaDollarSign />} label="Pricing" isCollapsed={isCollapsed} /> */}
        </nav>

        {/* Back Arrow Button */}
        {isCollapsed && (
          <button onClick={toggleCollapse} className="flex items-center mt-4 p-2 text-white hover:bg-gold-500 rounded-md">
            <FaArrowLeft className="mr-2" />
          </button>
        )}

        {/* <Link to="/admin/dashboard">Admin Dashboard</Link> */}

        {/* Theme Switch */}
        <button
          className="mt-auto p-2 bg-gold-500 text-[#04BE16] rounded-md hover:bg-gold-600"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isCollapsed }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 hover:bg-[#F9DF00] p-2 rounded cursor-pointer text-[#04BE16]"
  >
    <div className="text-xl">{icon}</div>
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

export default Navbar;
