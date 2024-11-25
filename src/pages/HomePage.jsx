import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { School, ShoppingCart, LocalCarWash, CheckCircle, TaskAlt, AccessTime, LocalLaundryService, LocalPharmacy, FoodBank, Kitchen } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import SignUp from '../components/signUp';
import sliderImg1 from '../assets/img5.jpg';
import sliderImg2 from '../assets/img4.jpg';
import sliderImg3 from '../assets/img3.jpg';
import aboutImg from '../assets/img2.jpg';
import howItWorksImg from '../assets/img1.jpg';
import Footer from '../components/Footer';
import LogoMarquee from '../components/LogoMarquee';

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const images = [sliderImg1, sliderImg2, sliderImg3];

  const steps = [
    { icon: <AccessTime />, title: 'Step 1: Sign Up', description: 'Get started by signing up and create your account.' },
    { icon: <TaskAlt />, title: 'Step 2: Choose a Service', description: 'Select the service you need from our list.' },
    { icon: <CheckCircle />, title: 'Step 3: Enjoy the Service', description: 'Our team will handle the rest while you relax.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen overflow-hidden">
      {/* Hero Section */}
      <Box id='hero' sx={{ height: '100vh', position: 'relative' }}>
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
                sx={{ borderColor: '#04BE16', mr: '40px', color: '#04BE16', '&:hover': { borderColor: '#02A715', color: '#FFFFFF', backgroundColor: '#F9DF00' } }}
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box sx={{ padding: '40px', backgroundColor: '#F9F9F9', padding: '120px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={aboutImg}
              alt="About Us"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '40px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', mb: 4, pt: 5 }}>
              About Us
            </Typography>
            <Typography variant="body1">
              At Daily Spot, we understand the demands of a busy lifestyle and the struggle to balance work, family, and personal errands. That’s why we’re here to help you handle daily chores with ease and efficiency. Whether it’s shopping for essentials, arranging a car wash, or ensuring your child gets safely to their destination, Daily Spot provides reliable and seamless solutions to simplify your day.

              Our mission is to take the hassle out of everyday tasks so you can focus on what truly matters. With user-friendly tools and a dedicated team, we aim to make your experience stress-free and convenient, saving you time and energy.

              Let Daily Spot take care of the small things so you can enjoy life’s bigger moments.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Featured Services Section */}
      <Box sx={{ padding: '20px', mt: 8, ml: 18, mr: 18 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {/* School Drop-Off Service Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <School fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  School Drop-Off
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Convenient school transportation for your child.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Shopping Services Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <ShoppingCart fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Shopping Services
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  We’ll take care of your shopping needs, big or small.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Car Wash Service Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <LocalCarWash fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Car Wash
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Professional car washing services at your convenience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: '20px', mt: 8, ml: 18, mr: 18 }}>
        <Grid container spacing={4}>
          {/* Laundry Service Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <LocalLaundryService fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Laundry
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Let's handle the tedious washing and ironing
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pharmacy Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <LocalPharmacy fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Medics
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Got a routine prescription? We can help you get it in your comfort zone
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Food-stuff processing Service Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <Kitchen fontSize="large" sx={{ color: '#02A715' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Food Stuff Prep
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  We help clients prepare food stuffs amd make them ready for cooking by washing, peeling and chopping of food items like vegtables, tubers etc on request
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>


      {/* How It Works Section */}
      <Box sx={{ padding: '20px', mt: 8, ml: 18, mr: 18 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          How It Works
        </Typography>
        <Grid container spacing={2}>
          {/* Left Column: Text Slider */}
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: '#4FC35D', padding: 18, borderRadius: '8px', mt: 0, maxHeight: '400px', overflow: 'hidden', color: 'white' }}>
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
                {currentStepIndex === 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#04BE16', mt: 2, '&:hover': { backgroundColor: '#02A715' } }}
                    onClick={() => setIsSignUpOpen(true)}
                  >
                    Register
                  </Button>
                )}
              </motion.div>
            </Box>
          </Grid>

          {/* Right Column: Image */}
          <Grid item xs={12} md={6}>
            <img
              src={howItWorksImg}
              alt="How It Works"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Login and SignUp Modals */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <LogoMarquee />

      {/* Footer starts here */}
      <Footer className='mt-[10rem]' />
    </div>
  );
};

export default HomePage;
