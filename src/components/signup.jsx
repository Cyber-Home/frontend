import React, { useState } from 'react';
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
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import siteLogo from '../assets/d-spot-logo.png';

const SignUp = ({ isOpen, onClose, showLoginModal }) => {
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
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" sx={{ zIndex: 1301 }}>
      <DialogTitle className="text-center"> 
        <img src={siteLogo} alt="The DailySpot" className="w-40 ml-80" />
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

            {/* Grid layout for side-by-side fields */}
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  required
                  variant="outlined"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ID Number"
                  name="nationalId"
                  fullWidth
                  required
                  variant="outlined"
                  value={formData.nationalId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  style={{ marginTop: '1rem' }}
                >
                  Upload ID
                  <input
                    type="file"
                    name="idUpload"
                    hidden
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                  />
                </Button>
                {formData.idUpload && (
                  <Typography variant="caption" display="block" align="center">
                    {formData.idUpload.name}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Area of Help with Chips */}
            <TextField
              label="Add Areas of Help. eg. Shopping"
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
            <Typography align="center">
              Have an Account Already?{' '}
              <Button color="primary" onClick={showLoginModal}>
                Login
              </Button>
            </Typography>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
