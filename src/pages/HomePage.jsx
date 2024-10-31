import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import heroImg1 from '../assets/pic1.jpg'; 
import heroImg2 from '../assets/pic2.jpg';
import heroImg3 from '../assets/pic3.webp';

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000, // Set slide transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // Carousel speed set to 10 seconds
    arrows: false,
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...sliderSettings} className="absolute inset-0">
        {[heroImg1, heroImg2, heroImg3].map((img, index) => (
          <div key={index} className="w-full h-full">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
        ))}
      </Slider>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to CyberHome</h1>
        <p className='text-white text-3xl mb-8'>....your daily chores simplified!</p>
        <div className="flex space-x-4">
          <Link to="/services" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
            Services
          </Link>
          <Link to="/readmore" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
