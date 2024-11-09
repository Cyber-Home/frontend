import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material'; // Floating action button
import { ArrowUpward } from '@mui/icons-material'; // Up arrow icon

const ScrollUpArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the scroll-up button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show after scrolling 300px
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Fab 
        color="primary"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: '#04BE16',
          '&:hover': { backgroundColor: '#02A715' },
        }}
      >
        <ArrowUpward />
      </Fab>
    )
  );
};

export default ScrollUpArrow;
