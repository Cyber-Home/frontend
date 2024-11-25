import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createTask = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      `${BASE_URL}/api/task/tasks`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Create Task Error:', error.response?.data || error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/api/task/tasks`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Response Data:', error.response?.data);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/api/task/tasks/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Response Data:', error.response?.data);
    throw error;
  }
};

export const updateTaskProgress = async (taskId, progress) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.patch(`${BASE_URL}/api/task/tasks/${taskId}`, 
      { progress },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Response Data:', error.response?.data);
    throw error;
  }
};

export default createTask;