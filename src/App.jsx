// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SignUp from './components/signup';
import Login from './components/login';
import UserDashboard from './components/UserDashboard';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Router>
      <div className={`flex ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
        <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <div className="flex-grow">
          <Routes> 
            {/* Route to various pages */}
            <Route path="/" element={<HomePage />} /> {/* Home Page Route */}
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} />  
            <Route path="/dashboard" element={<UserDashboard />} />  
            {/* <Route path="/dashboard" element={<ProtectedRoute component={UserDashboard} />} /> */}

          
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
