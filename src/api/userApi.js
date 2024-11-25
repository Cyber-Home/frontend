import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signUp = async (formData) => {
  try {
    console.log('Attempting to register with URL:', `${BASE_URL}/api/user/register`);
    const response = await axios.post(`${BASE_URL}/api/user/register`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Full error:', error);
    throw error;
  }
};

export default {
  signUp
};
