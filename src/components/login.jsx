import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = ({ isOpen, onClose, showSignUpModal, onLogout }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Close modal if clicking outside of the modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  // Handle logout with SweetAlert2 and redirect
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout(); // Call the onLogout function passed as a prop
        navigate('/'); // Redirect to the home page after logout
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="login-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => onClose()}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              className="absolute top-2 right-2 text-xl text-gray-600 p-2"
            >
              X
            </button>
            <h2 className="text-2xl font-bold text-center mb-5 text-black">Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="mt-4 p-2 w-full border rounded-md focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="mt-4 p-2 w-full border rounded-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="mt-6 w-full bg-[#04BE16] text-white p-2 rounded-md hover:bg-green-600"
              >
                Login
              </button>
            </form>
            <div>
              <p className="text-center text-black">
                Do not have an account? 
                <button 
                  type="button"
                  onClick={() => {
                    onClose(); // Close login modal
                    showSignUpModal(); // Open signup modal
                  }}
                  className="text-[#166534] ml-1"
                >
                  Register
                </button>
              </p>
            </div>

            {/* Logout Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
