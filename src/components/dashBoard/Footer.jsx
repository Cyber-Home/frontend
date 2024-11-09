import React from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, ArrowUpward } from '@mui/icons-material';
import siteLogo from '../../assets/d-spot-logo.png';


const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '40px 20px', marginTop: '90px'  }}>
            <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto'}}>

                {/* Logo and About */}
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <a href="#hero"><img src={siteLogo} alt="Daily Spot Logo" style={{ width: '250px', marginBottom: '20px' }} /></a>
                    <Typography variant="body1" className='text-left'>
                        Daily Spot is dedicated to simplifying your daily tasks, from shopping to car washing. Enjoy seamless, reliable services at your convenience!
                    </Typography>
                </Grid>

                {/* Subscription Form */}
                <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ marginBottom: '20px' }}>Subscribe to Our Newsletter</Typography>
                    <TextField
                        placeholder="Enter your email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                            input: { color: '#333', backgroundColor: '#fff' },
                            borderRadius: '5px',
                            mb: 2,
                        }}
                    />
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#04BE16', '&:hover': { backgroundColor: '#02A715' } }}>
                        Subscribe
                    </Button>
                </Grid>

                {/* Links and Social Media */}
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ marginBottom: '20px' }}>Quick Links</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <Button href="/about" sx={{ color: '#fff', marginBottom: '8px' }}>About Us</Button>
                        <Button href="/services" sx={{ color: '#fff', marginBottom: '8px' }}>Services</Button>
                        <Button href="/contact" sx={{ color: '#fff', marginBottom: '8px' }}>Contact</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <IconButton color="inherit" href="https://facebook.com">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit" href="https://twitter.com">
                            <Twitter />
                        </IconButton>
                        <IconButton color="inherit" href="https://instagram.com">
                            <Instagram />
                        </IconButton>
                        <IconButton color="inherit" href="https://linkedin.com">
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: '#555', my: 3 }} />

            {/* Footer Bottom */}
            <Box sx={{ textAlign: 'center', color: '#aaa' }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Daily Spot. All rights reserved. 
                </Typography>
                   <a href="#hero"><ArrowUpward className='ml-96 20 w-10 -mt-10 hover:bg-slate-600'/></a>
            </Box>
        </Box>
    );
};

export default Footer;
