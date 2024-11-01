// Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope, FaServicestack, FaDollarSign, FaSun, FaMoon, FaArrowLeft, FaBars, FaBookOpen, FaUserAlt } from 'react-icons/fa'; 
import siteLogo from '../assets/react.svg' 
import { Link } from 'react-router-dom';


const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`h-screen transition-width duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-green-800'}`}>
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full p-5 flex flex-col`}>
        {/* Logo & Hamburger Icon */}
        <div className="flex items-center mb-5">
            <Link to='/'><img className='w-7' src={siteLogo} alt="logo" /></Link>
          {!isCollapsed && <Link to='/'><div className="text-2xl font-normal p-2">CyberHome</div></Link>} 
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
          <NavItem to="/signup" icon={<FaBookOpen />} label="Register" isCollapsed={isCollapsed} />
          <NavItem to="/login" icon={<FaUserAlt />} label="Login" isCollapsed={isCollapsed} />
          <NavItem to="/pricing" icon={<FaDollarSign />} label="Pricing" isCollapsed={isCollapsed} />
        </nav>

        {/* Back Arrow Button */}
        {isCollapsed && (
          <button onClick={toggleCollapse} className="flex items-center mt-4 p-2 text-white hover:bg-gold-500 rounded-md">
            <FaArrowLeft className="mr-2" />
          </button>
        )}

        {/* Theme Switch */}
        <button
          className="mt-auto p-2 bg-gold-500 text-white rounded-md hover:bg-gold-600"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

// Reusable NavItem component
const NavItem = ({ to, icon, label, isCollapsed }) => (
  <NavLink
    to={to}
    className="flex items-center space-x-2 hover:bg-[#BE9835] p-2 rounded cursor-pointer text-white"
    activeClassName="bg-green-700"
  >
    <div className="text-xl">{icon}</div>
    {!isCollapsed && <span>{label}</span>}
  </NavLink>
);

export default Navbar;
