// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SignUp from './components/signup';
import Login from './components/login';
import UserDashboard from './components/dashBoard/UserDashboard';
import AdminLogin from './components/dashBoard/admin/AdminLogin';
import AdminRoute from './layouts/AdminRoute';
import Unauthorized from './components/dashBoard/admin/UnAuthorized';
import { AuthProvider, useAuth } from './AuthContext';
import AdminDashboard from './components/dashBoard/admin/AdminDashboard';

// Main App Component
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const shouldShowNavbar = (pathname) => {
    // Hide navbar for all admin-related paths and specific user dashboard paths
    return !pathname.startsWith('/admin') && !pathname.startsWith('/dashboard');
  };

  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <Router>
        <Content toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} shouldShowNavbar={shouldShowNavbar} />
      </Router>
    </AuthProvider>
  );
}

// Separate content component to access location
const Content = ({ toggleTheme, isDarkTheme, shouldShowNavbar }) => {
  const location = useLocation(); // This should be fine if used within the Router

  return (
    <div className={`flex ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
      {shouldShowNavbar(location.pathname) && <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
