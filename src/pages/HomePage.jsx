import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { School, ShoppingCart, LocalCarWash, CheckCircle, TaskAlt, AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import SignUp from '../components/signUp';
import sliderImg1 from '../assets/img5.jpg';
import sliderImg2 from '../assets/img4.jpg';
import sliderImg3 from '../assets/img3.jpg';
import aboutImg from '../assets/img2.jpg'; // About section image
import howItWorksImg from '../assets/img1.jpg';

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Step slider state
  const images = [sliderImg1, sliderImg2, sliderImg3];

  const steps = [
    { icon: <AccessTime />, title: 'Step 1: Sign Up', description: 'Get started by signing up and create your account.' },
    { icon: <TaskAlt />, title: 'Step 2: Choose a Service', description: 'Select the service you need from our list.' },
    { icon: <CheckCircle />, title: 'Step 3: Enjoy the Service', description: 'Our team will handle the rest while you relax.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length); // Cycle through steps
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen overflow-hidden">
      {/* Hero Section */}
      <Box sx={{ height: '100vh', position: 'relative' }}>
        <motion.div
          className="absolute inset-0"
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ height: '100vh' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 5,
              }}
            />
            <Box sx={{ textAlign: 'center', color: 'white', zIndex: 10 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Welcome to Daily Spot!
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                ...your daily chores simplified!
              </Typography>
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
            <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ backgroundColor: '#04BE16', mr: 2, '&:hover': { backgroundColor: '#02A715' } }}
                onClick={() => setIsSignUpOpen(true)}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ borderColor: '#04BE16', color: '#04BE16', '&:hover': { borderColor: '#02A715', color: '#FFFFFF', backgroundColor: '#F9DF00' } }}
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box sx={{ padding: '40px', backgroundColor: '#F9F9F9' }}>
        <Grid container spacing={4} className='m-20 pr-28 pl-28 pt-20'>
          <Grid item xs={12} md={6}>
            <img
              src={aboutImg}
              alt="About Daily Spot"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
              About Daily Spot
            </Typography>
            <Typography variant="body1" paragraph className='pt-2'>
              At Daily Spot, we simplify your daily chores and errands so you can focus on what matters most.
              Whether it's shopping, car washes, school drop-offs, or anything else that might get in your way,
              we've got you covered. Our goal is to make your life easier by providing reliable, affordable,
              and efficient services right at your doorstep.
            </Typography>
            <Typography variant="body1" paragraph>
              With Daily Spot, you can rest assured that you're in good hands. Our team is dedicated to offering
              exceptional customer service, ensuring you have a smooth experience every time. Get started today
              and experience the convenience of having your tasks handled for you!
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Featured Services Section */}
      <Box sx={{ padding: '20px', mt: 8, ml: 18, mr: 18 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Featured Services
        </Typography>
        <Grid container spacing={4}>
          {[{ title: 'School Drop Off', icon: <School />, link: '/services#school' },
          { title: 'Shopping', icon: <ShoppingCart />, link: '/services#shopping' },
          { title: 'Car Wash', icon: <LocalCarWash />, link: '/services#carwash' }].map((service, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ padding: '20px', textAlign: 'center', boxShadow: 3, transition: 'transform 0.3s' }}>
                  {service.icon}
                  <CardContent>
                    <Typography variant="h5" gutterBottom>{service.title}</Typography>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                    <Link to={service.link} style={{ textDecoration: 'none', color: '#04BE16', fontWeight: 'bold' }}>
                      Learn More
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#04BE16', '&:hover': { backgroundColor: '#02A715' } }} href="/services">
            View All Services
          </Button>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ padding: '20px', mt: 8, ml: 18, mr: 18 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          How It Works
        </Typography>
        <Grid container spacing={2}>
          {/* Left Column: Text Slider */}
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: '#04BE16', padding: 6, borderRadius: '8px', mt: 10, maxHeight: '400px', overflow: 'hidden' }}>
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {steps[currentStepIndex].title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {steps[currentStepIndex].description}
                </Typography>
              </motion.div>
            </Box>
          </Grid>

          {/* Right Column: Image */}
          <Grid item xs={12} md={6}>
            <img
              src={howItWorksImg}
              alt="How It Works"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Modals */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
};

export default HomePage;
