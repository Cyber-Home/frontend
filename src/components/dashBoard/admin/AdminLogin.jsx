// components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Dummy admin credentials for demo purposes
        const adminUser = {
            username: 'admin',
            password: 'password123'
        };

        // Simulate admin login check
        if (username === adminUser.username && password === adminUser.password) {
            // Redirect to admin dashboard upon successful login
            navigate('/admin/dashboard');
        } else {
            alert('Invalid admin credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
                {/* Dummy logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                </div>
                
                <h2 className="text-2xl font-semibold text-center text-gray-700">Admin Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
