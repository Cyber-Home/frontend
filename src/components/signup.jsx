import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, 
  Button,
  TextField,
  IconButton,
  Typography,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    homeAddress: '',
    workAddress: '',
    phoneNumber: '',
    nationalId: '',
    occupation: '',
    ageRange: '',
    idUpload: null,
    normalDayDescription: '',
    helpAreas: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areaInput, setAreaInput] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddArea = () => {
    if (areaInput && !formData.helpAreas.includes(areaInput)) {
      setFormData((prevData) => ({
        ...prevData,
        helpAreas: [...prevData.helpAreas, areaInput],
      }));
      setAreaInput('');
    }
  };

  const handleRemoveArea = (area) => {
    setFormData((prevData) => ({
      ...prevData,
      helpAreas: prevData.helpAreas.filter((item) => item !== area),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" sx={{ zIndex: 1301 }}> {/* Increased z-index */}
      <DialogTitle>
        Register Here
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {isSubmitted ? (
          <Typography variant="h6" color="primary" align="center">
            Thank you! Your registration was successful.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
              This is the beginning of a simplified day...
            </Typography>

            {/* Form Fields */}
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Home Address"
              name="homeAddress"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.homeAddress}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            
            {/* Area of Help with Chips */}
            <TextField
              label="Add Area of Help"
              value={areaInput}
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setAreaInput(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddArea} style={{ marginBottom: '1rem' }}>
              Add Help Area
            </Button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {formData.helpAreas.map((area) => (
                <Chip
                  label={area}
                  onDelete={() => handleRemoveArea(area)}
                  color="primary"
                  key={area}
                />
              ))}
            </div>

            <DialogActions>
              <Button onClick={onClose} color="secondary">Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
