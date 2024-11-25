import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const loginUser = async (email, password) => {
    try {
        console.log('Base URL:', BASE_URL);

        const response = await axios.post(`${BASE_URL}/api/user/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login response:', response.data);

        // Store token if it exists in response
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        
        return response;
    } catch (error) {
        console.error('Login error:', error);
        
        // More specific error messages based on error type
        if (error.response) {
            throw new Error(error.response.data?.message || 'Login failed. Please check your credentials.');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export default loginUser;