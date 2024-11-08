import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUp from './components/signUp';
import Login from './components/login';
import UserDashboard from './components/dashBoard/UserDashboard';
import AdminLogin from './components/dashBoard/admin/AdminLogin';
import AdminRoute from './layouts/AdminRoute';
import Unauthorized from './components/dashBoard/admin/UnAuthorized';
import { AuthProvider, useAuth } from './AuthContext';
import AdminDashboard from './components/dashBoard/admin/AdminDashboard'; 
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage' 
import ContactPage from './pages/ContactPage' 

// Main App Component
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const shouldShowNavbar = (pathname) => {
    return !pathname.startsWith('/admin') && !pathname.startsWith('/dashboard');
  };

  // console.log("App component is rendering");

  return (
    <AuthProvider>
      <Router>
        <Content
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          shouldShowNavbar={shouldShowNavbar}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          toggleCollapse={toggleCollapse}
          isSignUpModalOpen={isSignUpModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      </Router>
    </AuthProvider>
  );
}

// Separate content component to access location
const Content = ({ toggleTheme, isDarkTheme, shouldShowNavbar, isCollapsed, setIsCollapsed, toggleCollapse, isSignUpModalOpen, setIsSignUpModalOpen }) => {
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  console.log("Content component is rendering with pathname:", location.pathname);

  return (
    <div className={`flex ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
      {shouldShowNavbar(location.pathname) && (
        <Navbar
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          toggleCollapse={toggleCollapse}
        />
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage isCollapsed={isCollapsed} />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/signup" element={<SignUp isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />} />
          <Route path="/login" element={<Login setIsSignUpModalOpen={setIsSignUpModalOpen} login={login} />} />
          <Route path="/dashboard" element={isAuthenticated ? <UserDashboard isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} /> : <Navigate to="/login" />} />

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
