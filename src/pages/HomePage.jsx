import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg1 from '../assets/pic1.jpg';
import heroImg2 from '../assets/pic2.jpg';
import heroImg3 from '../assets/pic3.webp';

const images = [heroImg1, heroImg2, heroImg3];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update image index every 10 seconds (10000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar placeholder with a fixed width */}
      <div className="w-64 bg-gray-800"></div>

      {/* Main slider container with remaining space */}
      <div className="flex-grow relative">
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Overlay text and buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to CyberHome</h1>
          <p className="text-white text-3xl mb-8">....your daily chores simplified!</p>
          <div className="flex space-x-4">
            <Link to="/services" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
              Services
            </Link>
            <Link to="/about" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
