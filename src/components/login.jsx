import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ClipLoader } from 'react-spinners'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsSubmitted(true);
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Stop loading after 2 seconds
        navigate('/dashboard'); // Redirect to the dashboard
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen shadow-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        ) : isSubmitted ? (
          <div className="text-center text-green-600 font-semibold">
            Login successful! Redirecting to your dashboard...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-5 text-black">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 p-2 w-full border rounded-md focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 p-2 w-full border rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="mt-6 w-full bg-[#BE9835] text-white p-2 rounded-md hover:bg-green-600"
            >
              Login
            </button> 
            <div>
              <p className='text-center text-black '>
                Do not have an account? <Link to='/signup' className='text-[#166534]'>Register</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
