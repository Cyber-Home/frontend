import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './dashBoard/UserDashboard';
import DashboardLayout from '../layouts/DashboardLayout';

const AppRouter = () => (
  <Routes>
    {/* Default Home Route */}
    <Route path="/" element={<HomePage />} />

    {/* Dashboard Route wrapped in DashboardLayout */}
    <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
  </Routes>
);

export default AppRouter;
