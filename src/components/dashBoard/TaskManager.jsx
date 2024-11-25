import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const services = [
  { _id: "67335717c9059e5e916c3601", name: "Laundry" },
  { _id: "67335717c9059e5e916c3602", name: "House Cleaning" },
  { _id: "67335717c9059e5e916c3603", name: "Gardening" },
  { _id: "67335717c9059e5e916c3604", name: "Cooking" },
  { _id: "67335717c9059e5e916c3605", name: "Dog Walking" }
];

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    service: '',
    title: '',
    description: '',
    scheduledDate: new Date(),
    contactPerson: '',
    phone: '',
    location: '',
    upload: null,
    previewUrl: null
  });
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceInput, setServiceInput] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/task/tasks`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Task data:', response.data[0]);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch tasks',
        icon: 'error'
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add this function to fetch the image
  const fetchImage = async (imagePath) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/${imagePath}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const token = localStorage.getItem('token');
      
      tasks.forEach(async (task) => {
        if (task.upload && !imageUrls[task.id]) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/${task.upload}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
              }
            );
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls(prev => ({
              ...prev,
              [task.id]: imageUrl
            }));
          } catch (error) {
            console.error('Error loading image for task:', task.id);
            setImageUrls(prev => ({
              ...prev,
              [task.id]: 'error'
            }));
          }
        }
      });
    };

    loadImages();

    // Cleanup function
    return () => {
      Object.values(imageUrls).forEach(url => {
        if (url && url !== 'error') {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [tasks]);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setTask(prev => ({
      ...prev,
      scheduledDate: date
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setTask(prev => ({
        ...prev,
        upload: file
      }));
    }
  };

  const handleServiceSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      setSelectedServices([selectedValue]);
      setServiceInput('');
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    setSelectedServices(selectedServices.filter(service => service !== serviceToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one service is selected
    if (selectedServices.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select at least one service',
            icon: 'error'
        });
        return;
    }

    try {
        const formData = new FormData();

        // Append all selected services
        selectedServices.forEach(service => {
            formData.append('service', service);
        });

        // Append other task details
        formData.append('title', task.title.trim());
        formData.append('description', task.description.trim());
        formData.append('scheduledDate', task.scheduledDate.toISOString());
        formData.append('contactPerson', task.contactPerson.trim());
        formData.append('phone', task.phone.trim());
        formData.append('location', task.location.trim());

        // Append the file if it exists
        if (task.upload) {
            formData.append('upload', task.upload);
        }

        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/task/tasks`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status === 201) {
            await fetchTasks();
            Swal.fire({
                title: 'Success!',
                text: 'Task created successfully',
                icon: 'success',
                timer: 1500
            });

            // Reset form fields
            setTask({
                service: '',
                title: '',
                description: '',
                scheduledDate: new Date(),
                contactPerson: '',
                phone: '',
                location: '',
                upload: null,
                previewUrl: null
            });
            setSelectedServices([]);
            setSelectedFileName('');
            setShowForm(false);
        }
    } catch (error) {
        console.error('Task submission error:', error.response?.data || error);
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || 'Failed to create task',
            icon: 'error'
        });
    }
  };

  // Task Management Handlers
  const handleUpdate = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: 'Update Task',
        text: "Do you want to update this task?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        
        // Create FormData for the update
        const formData = new FormData();
        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('contactPerson', task.contactPerson);
        formData.append('phone', task.phone);
        formData.append('location', task.location);
        formData.append('scheduledDate', task.scheduledDate.toISOString().split('T')[0]);
        
        if (selectedServices.length > 0) {
          formData.append('service', selectedServices[0]);
        }

        // Send PATCH request to update the task
        const response = await axios.patch(  // Changed from PUT to PATCH
          `${import.meta.env.VITE_BASE_URL}/api/task/tasks/${taskId}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log('Update response:', response.data);

        if (response.status === 200) {
          // Refresh tasks list
          await fetchTasks();
          
          Swal.fire({
            title: 'Success!',
            text: 'Task updated successfully',
            icon: 'success',
            timer: 1500
          });

          // Reset states
          setIsEditMode(false);
          setShowForm(false);
          setSelectedServices([]);
        }
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update task',
        icon: 'error'
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/task/tasks/${taskId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        await fetchTasks();
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete task',
        icon: 'error'
      });
    }
  };

  // Add this function to handle image URLs
  const getImageUrl = (uploadPath) => {
    if (!uploadPath) return null;
    
    // If it's already a full URL, return it
    if (uploadPath.startsWith('http')) {
      return uploadPath;
    }
    
    // Otherwise, construct the URL
    return `${import.meta.env.VITE_BASE_URL}/api/uploads/${uploadPath.split('/').pop()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-2xl font-bold">Service Tasks</h2> */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={isEditMode ? handleUpdate : handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Selection */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={isEditMode ? editingTask.service : serviceInput}
                onChange={(e) => {
                  if (isEditMode) {
                    setEditingTask(prev => ({ ...prev, service: e.target.value }));
                  } else {
                    handleServiceSelect(e);
                  }
                }}
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={isEditMode ? editingTask.title : task.title}
                onChange={(e) => {
                  if (isEditMode) {
                    setEditingTask(prev => ({ ...prev, title: e.target.value }));
                  } else {
                    handleInputChange(e);
                  }
                }}
                name="title"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Description */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
                rows="3"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date
              </label>
              <DatePicker
                selected={task.scheduledDate}
                onChange={handleDateChange}
                className="w-full p-2 border rounded-md"
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                required
              />
            </div>

            {/* Contact Person */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={task.contactPerson}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={task.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={task.location}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* File Upload */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image (Optional)
              </label>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ 
                  backgroundColor: '#10B981',
                  '&:hover': {
                    backgroundColor: '#059669'
                  }
                }}
              >
                {selectedFileName || 'Choose Image'}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
              {selectedFileName && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {selectedFileName}
                </p>
              )}
              {task.upload && (
                <div className="mt-4">
                  <img 
                    src={URL.createObjectURL(task.upload)}
                    alt="Preview" 
                    className="max-w-xs rounded-md shadow-sm"
                    onLoad={() => URL.revokeObjectURL(task.upload)}
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end mt-6">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={isEditMode ? <SaveIcon /> : <AddIcon />}
              >
                {isEditMode ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className='mt-4'><h3 className='text-xl font-bold'>Previous Tasks</h3></div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card 
              key={task.id}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                {task.upload && (
                  <CardMedia
                    component="img"
                    image={getImageUrl(task.upload)}
                    alt={task.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      bgcolor: 'grey.100'
                    }}
                    onError={(e) => {
                      console.log('Failed to load image:', task.upload);
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                )}
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    {task.title}
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '16px',
                      bgcolor: task.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' :  // Softer yellow
                               task.status === 'completed' ? 'rgba(76, 175, 80, 0.1)' : // Softer green
                               'rgba(158, 158, 158, 0.1)',                              // Softer grey
                      color: task.status === 'pending' ? '#B7791F' :     // Warmer yellow
                             task.status === 'completed' ? '#2E7D32' :   // Warmer green
                             '#616161',                                  // Warmer grey
                      border: 1,
                      borderColor: task.status === 'pending' ? 'rgba(255, 193, 7, 0.2)' :
                                  task.status === 'completed' ? 'rgba(76, 175, 80, 0.2)' :
                                  'rgba(158, 158, 158, 0.2)',
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }}
                    >
                      {task.status}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>

                <Box sx={{ color: 'text.secondary', '& > *': { mb: 1 } }}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="medium">Due: </Box>
                    {new Date(task.scheduledDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="medium">Contact: </Box>
                    {task.contactPerson}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="medium">Location: </Box>
                    {task.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleUpdate(task.id)}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(25, 118, 210, 0.04)' 
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(task.id)}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(211, 47, 47, 0.04)' 
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
