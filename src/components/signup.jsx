import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { signUp } from '../api/userApi';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Grid,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import siteLogo from '../assets/d-spot-logo.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material';

// Styled component for the hidden input
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

const SignUp = ({ isOpen, onClose, showLoginModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    homeAddress: '',
    workAddress: '',
    occupation: '',
    password: '',
    phone: '',
    uploadId: null,
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'uploadId' && files[0]) {
      setSelectedFileName(files[0].name);
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!formData.email.includes('@')) errors.email = 'Please enter a valid email address';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters long';
    if (!formData.phone.match(/^\d{10}$/)) errors.phone = 'Please enter a valid 10-digit phone number';

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      const response = await signUp(submitData);
      if (response) {
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Thank you for registering!',
          icon: 'success',
          confirmButtonText: 'Proceed to Login',
          confirmButtonColor: '#10B981', // Green color
        }).then((result) => {
          if (result.isConfirmed) {
            // Close signup modal and open login modal
            onClose();
            showLoginModal();
          }
        });

        // Clear form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          homeAddress: '',
          workAddress: '',
          occupation: '',
          password: '',
          phone: '',
          uploadId: null
        });
        setSelectedFileName('');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Registration failed',
        icon: 'error'
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" sx={{ zIndex: 1301 }}>
      <DialogTitle className="text-center">
        <img src={siteLogo} alt="The DailySpot" className="w-40 ml-80" />
        Register Here
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            This is the beginning of a simplified day...
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                error={!!error?.firstName}
                helperText={error?.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                error={!!error?.lastName}
                helperText={error?.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                required
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!error?.email}
                helperText={error?.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Home Address"
                name="homeAddress"
                fullWidth
                required
                variant="outlined"
                value={formData.homeAddress}
                onChange={handleChange}
                error={!!error?.homeAddress}
                helperText={error?.homeAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Occupation"
                name="occupation"
                fullWidth
                required
                variant="outlined"
                value={formData.occupation}
                onChange={handleChange}
                error={!!error?.occupation}
                helperText={error?.occupation}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!error?.password}
                helperText={error?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Work Address"
                name="workAddress"
                fullWidth
                required
                variant="outlined"
                value={formData.workAddress}
                onChange={handleChange}
                error={!!error?.workAddress}
                helperText={error?.workAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                required
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                error={!!error?.phone}
                helperText={error?.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload a valid ID
                </label>
                <div className="mt-1">
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ 
                      backgroundColor: '#10B981', // Tailwind's green-500
                      '&:hover': {
                        backgroundColor: '#059669' // Tailwind'sgreen-600
                      }
                    }}
                  >
                    {selectedFileName || 'Click here to upload'}
                    <VisuallyHiddenInput
                      type="file"
                      name="uploadId"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </Button>
                  {selectedFileName && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected file: {selectedFileName}
                    </p>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>

          {error?.general && (
            <Typography color="error" align="center" style={{ marginTop: '1rem' }}>
              {error.general}
            </Typography>
          )}

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>

          <Typography align="center">
            Have an Account Already?{' '}
            <Button
              color="primary"
              onClick={() => {
                onClose();
                showLoginModal();
              }}
            >
              Login
            </Button>
          </Typography>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
