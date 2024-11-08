import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Login from '../components/login'; // Verify this path
import SignUp from '../components/signUp'; // Make sure this path is correct
import sliderImg1 from '../assets/img5.jpg';
import sliderImg2 from '../assets/img4.jpg';
import sliderImg3 from '../assets/img3.jpg';

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Manage login modal open state
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Manage sign up modal open state
  const [currentIndex, setCurrentIndex] = useState(0); // Manage current image index
  const images = [sliderImg1, sliderImg2, sliderImg3]; // Array of images

  // Set up an interval to change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Image Background Slider with Framer Motion Transition */}
      <motion.div
        className="absolute inset-0"
        key={currentIndex} // Ensure the motion div changes on index change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundImage: `url(${images[currentIndex]})`, // Use current image from the state
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
          }}
        >
          {/* Overlay Effect */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
              zIndex: 5,
            }}
          />

          {/* Welcome Message */}
          <Box sx={{ textAlign: 'center', color: 'white', zIndex: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome to Daily Spot!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Your solution for all your home errands.
            </Typography>

            {/* Center Buttons: Services and Read More */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ backgroundColor: '#04BE16', '&:hover': { backgroundColor: '#02A715' } }}
                href="#services"
              >
                Services
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ borderColor: '#04BE16', color: '#04BE16', '&:hover': { borderColor: '#02A715', color: '#02A715' } }}
                href="#read-more"
              >
                Read More
              </Button>
            </Box>
          </Box>

          {/* Upper-right corner buttons: Get Started and Login */}
          <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ backgroundColor: '#04BE16', '&:hover': { backgroundColor: '#02A715' } }}
              onClick={() => setIsSignUpOpen(true)} // Open signup modal
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ borderColor: '#04BE16', color: '#04BE16', '&:hover': { borderColor: '#02A715', color: '#02A715' } }}
              onClick={() => setIsLoginOpen(true)} // Open login modal
            >
              Login
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Signup Modal */}
      <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
};

export default HomePage;
