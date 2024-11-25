import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Dialog, IconButton } from '@mui/material';
import { useAuth } from '../AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = ({ isOpen, onClose, setIsSignUpModalOpen }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading state
      Swal.fire({
        title: 'Processing...',
        text: 'Logging you in',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await login(formData);
      
      // Handle response
      if (response && response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          onClose(); // Close the modal
          navigate('/dashboard'); // Navigate to dashboard
        });

        console.log('Login response:', response.data); // Log the entire response
        const { role } = response.data.user; // Access the role from the user object
        console.log('User role:', role); // Log the user role

        // Check if the role matches exactly
        if (role && role.toLowerCase() === 'user') { // Use toLowerCase() for case-insensitive comparison
          navigate('/dashboard'); // Navigate to dashboard for user role
        } else {
          Swal.fire({
            title: 'Access Denied',
            text: 'You do not have permission to access this area.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Check if error response exists and contains a message
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Full error:', error.response);

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error'
      });
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <div className="p-6 relative">
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className="max-w-md w-full">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Email Input */}
              <div>
                <label htmlFor="email-address" className="sr-only mb-5">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Password Input with Visibility Toggle */}
              <div className="relative">
                <label htmlFor="password" className="sr-only mt-5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default Login;