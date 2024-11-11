import React from 'react';
import { Box, Typography } from '@mui/material';
import melcomLogo from '../assets/melcom.jpg';
import uberLogo from '../assets/uber.png';
import boltLogo from '../assets/bolt.png';
import drugnetLogo from '../assets/drugnet.png';
import gogoWash from '../assets/gogowash.jpg';

const logoImages = [melcomLogo, uberLogo, boltLogo, drugnetLogo, gogoWash];


const LogoMarquee = () => {
    return (
        <Box


            sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                backgroundColor: '#f4f4f4',
                padding: '30px 0',
                marginTop: '50px'
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'semibold', mb: 2, textAlign: 'center' }}>
                Our Partners
            </Typography>
            <Box
                sx={{
                    display: 'inline-block',
                    animation: 'marquee 15s linear infinite',
                }}
            >
                {logoImages.map((logo, index) => (
                    <Box
                        component="img"
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        key={index}
                        sx={{
                            height: '60px', // Set your logo height
                            width: 'auto',
                            margin: '0 20px', // Add some space between logos
                            display: 'inline-block',
                        }}
                    />
                ))}
                {/* Duplicate logos for seamless loop */}
                {logoImages.map((logo, index) => (
                    <Box
                        component="img"
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        key={`duplicate-${index}`}
                        sx={{
                            height: '60px',
                            width: 'auto',
                            margin: '0 20px',
                            display: 'inline-block',
                        }}
                    />
                ))}
            </Box>

            {/* CSS for marquee animation */}
            <style>
                {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
            </style>
        </Box>
    );
};

export default LogoMarquee;
