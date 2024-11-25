import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
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
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage'; 
import ContactPage from './pages/ContactPage';  

// Main App Component
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AuthProvider>
      <Router>
        <Content
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          toggleCollapse={toggleCollapse}
          isSignUpModalOpen={isSignUpModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      </Router>
    </AuthProvider>
  );
}

// Content component
const Content = ({ 
  toggleTheme, 
  isDarkTheme, 
  isCollapsed, 
  setIsCollapsed, 
  toggleCollapse,
  isSignUpModalOpen,
  setIsSignUpModalOpen,
  isLoginModalOpen,
  setIsLoginModalOpen
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname === '/dashboard') {
      navigate('/login');
    }
  }, [location, navigate]);

  const handleCloseSignUp = () => {
    setIsSignUpModalOpen(false);
  };

  const handleShowLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  const shouldShowNavbar = (pathname) => {
    return !pathname.startsWith('/admin') && !pathname.startsWith('/dashboard');
  };

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
          <Route 
            path="/signup" 
            element={
              <SignUp 
                isOpen={isSignUpModalOpen} 
                onClose={handleCloseSignUp}
                showLoginModal={handleShowLogin}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <Login 
                isOpen={isLoginModalOpen}
                onClose={handleCloseLogin}
                setIsSignUpModalOpen={setIsSignUpModalOpen}
              />
            } 
          />
          
          {/* Access /dashboard without login for now */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <UserDashboard isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            } 
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
