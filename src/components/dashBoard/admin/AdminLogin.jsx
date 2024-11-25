// components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import Swal from 'sweetalert2'; // Import SweetAlert2 
import userAvatar from '../../../assets/user-avatar.png'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
                email,
                password
            });

            console.log('Login response:', response.data); // Log the entire response

            if (response.status === 200) {
                const { role } = response.data.user; // Access the role from the user object
                console.log('User role:', role); // Log the user role

                // Check if the role matches exactly
                if (role && role.toLowerCase() === 'admin') { // Use toLowerCase() for case-insensitive comparison
                    navigate('/admin/dashboard');
                } else {
                    Swal.fire({
                        title: 'Access Denied',
                        text: 'You do not have permission to access this area.',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid admin credentials',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                title: 'Login Error',
                text: 'An error occurred while trying to log in. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
                {/* //avatar  */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"><img src={userAvatar} alt="img" /></div>
                </div>
                
                <h2 className="text-2xl font-semibold text-center text-gray-700">Admin Login</h2> 
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-yellow-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
