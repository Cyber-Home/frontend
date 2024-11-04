import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const AdminRoute = () => {
    const { user } = useContext(AuthContext); 

    // Check if the user is logged in and is an admin
    if (!user || user.role !== 'admin') {
        // Redirect if not logged in or not an admin
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;  // Renders the nested route (e.g., AdminDashboard)
};

export default AdminRoute;
