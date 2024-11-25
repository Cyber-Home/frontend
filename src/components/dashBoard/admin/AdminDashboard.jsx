import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import { apiGetAllTasks } from '../../../api/getTask';

const AdminDashboard = () => {

  // New state for adding workers
  const [addWorkerDialogOpen, setAddWorkerDialogOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: [],
    availability: [{ day: '', startTime: '', endTime: '' }],
    document: null,
  });
  const [allTasks, setAllTasks] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [assistants, setAssistants] = useState([
    { id: 1, name: 'Kofi Atta', email: 'kofi@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Adwoa Papabi', email: 'adwoa@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Evans Kumson', email: 'kumson@example.com', phone: '987-654-3210' },
  ]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [editAssistant, setEditAssistant] = useState(null);
  const [addAssistantDialogOpen, setAddAssistantDialogOpen] = useState(false);
  const [editAssistantDialogOpen, setEditAssistantDialogOpen] = useState(false);
  const [newAssistant, setNewAssistant] = useState({ name: '', email: '', phone: '' });


  const handleAddWorker = async () => {
    try {
      const response = await apiAddWorker(newWorker);
      console.log('Worker added successfully:', response.data);
      setAddWorkerDialogOpen(false);
      setNewWorker({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        services: [],
        availability: [{ day: '', startTime: '', endTime: '' }],
        document: null,
      });
      Swal.fire('Success', 'Worker added successfully', 'success');
    } catch (error) {
      console.error('Error adding worker:', error);
      Swal.fire('Error', 'Failed to add worker', 'error');
    }
  };

  const fetchAllTasks = async () => {
    const response = await apiGetAllTasks();
    console.log(response.data);
    setAllTasks(response.data);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage('');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAssignTask = () => {
    if (selectedAssistant && selectedTask) {
      const taskToAssign = allTasks.find(task => task.title === selectedTask);

      if (taskToAssign) {
        Swal.fire({
          title: 'Confirm Assignment',
          text: `Are you sure you want to assign "${taskToAssign.title}" to ${selectedAssistant}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, assign it!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            setAssignedTasks(prev => [
              ...prev,
              { assistant: selectedAssistant, task: taskToAssign.title, dueDate: taskToAssign.scheduledDate, progress: 'Assigned' }
            ]);
            setAllTasks(prev => prev.filter(task => task.id !== taskToAssign.id));
            setSelectedAssistant('');
            setSelectedTask('');

            Swal.fire('Assigned!', `Task "${taskToAssign.title}" has been assigned to ${selectedAssistant}.`, 'success');
          }
        });
      } else {
        Swal.fire('Error', 'Selected task is not in the pending list', 'error');
      }
    } else {
      Swal.fire('Error', 'Please select both an Assistant and a Task', 'error');
    }
  };

  const handleAddAssistant = () => {
    setAssistants(prev => [
      ...prev,
      { id: assistants.length + 1, ...newAssistant }
    ]);
    setNewAssistant({ name: '', email: '', phone: '' });
    setAddAssistantDialogOpen(false);
    Swal.fire('Success', 'Assistant added successfully', 'success');
  };

  const handleEditAssistant = () => {
    setAssistants(prev => prev.map(assistant =>
      assistant.id === editAssistant.id ? editAssistant : assistant
    ));
    setEditAssistant(null);
    setEditAssistantDialogOpen(false);
    Swal.fire('Success', 'Assistant updated successfully', 'success');
  };

  const handleDeleteAssistant = (assistantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setAssistants(prev => prev.filter(assistant => assistant.id !== assistantId));
        Swal.fire('Deleted!', 'Assistant has been deleted.', 'success');
      }
    });
  };

  const handleToggleTaskStatus = (task) => {
    const newStatus = task.progress === 'Pending' ? 'In Progress' : task.progress === 'In Progress' ? 'Completed' : 'Pending';
    setAssignedTasks(prev =>
      prev.map(t => t.task === task.title ? { ...t, progress: newStatus } : t)
    );
    Swal.fire('Updated!', `Task "${task.title}" status changed to "${newStatus}".`, 'success');
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        
        //HandleLogout function 
        // Clear user authentication data
        localStorage.removeItem('userToken'); // Adjust based on your auth method
        // Redirect to login page
        window.location.href = '/admin/login'; 
        console.log('Logged out');
      }
    });
  };
      

  const renderContent = () => {
    switch (activeTab) {
      case 0: // All Assistants
        return (
          <Box>
            <Button variant="contained" sx={{ backgroundColor: '#02A715', mb: 2 }} onClick={() => setAddWorkerDialogOpen(true)}>
              Add New Assistant
            </Button>
            <TableContainer component={Paper}>
              <Table>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead> */}
                {/* Add Worker Dialog */}
                <Dialog open={addWorkerDialogOpen} onClose={() => setAddWorkerDialogOpen(false)}>
                  <DialogTitle>Add Assistant</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="First Name"
                      fullWidth
                      value={newWorker.firstName}
                      onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      value={newWorker.lastName}
                      onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      value={newWorker.email}
                      onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Phone"
                      fullWidth
                      value={newWorker.phone}
                      onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Services</InputLabel>
                      <Select
                        multiple
                        value={newWorker.services}
                        onChange={(e) => setNewWorker({ ...newWorker, services: e.target.value })}
                      >
                        {/* actual service options */}
                        <MenuItem value="shopping">Shopping</MenuItem>
                        <MenuItem value="laundry">Laundry</MenuItem>
                        <MenuItem value="medics">Medics</MenuItem>
                        <MenuItem value="car-wash">Car Wash</MenuItem>
                        <MenuItem value="school-drop-off/pichup">School Drop-off / Pichup</MenuItem>
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setAddWorkerDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#02A715', mb: 2 }} onClick={() => setAddWorkerDialogOpen(true)}>
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                <TableBody>
                  {assistants.map((assistant) => (
                    <TableRow key={assistant.id}>
                      <TableCell>{assistant.name}</TableCell>
                      <TableCell>{assistant.email}</TableCell>
                      <TableCell>{assistant.phone}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => { setEditAssistant(assistant); setEditAssistantDialogOpen(true); }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteAssistant(assistant.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>


                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      case 1: // Pending Tasks
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Task Description</TableCell>
                  {/* <TableCell>File</TableCell> */}
                  <TableCell>Client</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.location}</TableCell>
                    {/* <TableCell>
                      {task.upload ? (
                        <img
                          src={task.upload}
                          alt={task.title}
                          onClick={() => handleImageClick(task.upload)} // Open modal on click
                          style={{ width: '50px', cursor: 'pointer' }} // Adjust size and cursor
                        />
                      ) : (
                        'No file'
                      )}
                    </TableCell> */}
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.user ? `${task.user.firstName} ${task.user.lastName}` : 'No user'}</TableCell>
                    <TableCell>{task.phone}</TableCell>
                    <TableCell>{task.scheduledDate}</TableCell>
                    <TableCell><EditIcon /><DeleteIcon /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 2: // Assign Task
        return (
          <Box>
            <Typography variant="h6">Assign Task</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Assign Assistant</InputLabel>
                  <Select
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                  >
                    {assistants.map((assistant) => (
                      <MenuItem key={assistant.id} value={assistant.name}>
                        {assistant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Task</InputLabel>
                  <Select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                  >
                    {allTasks.map((task) => (
                      <MenuItem key={task.id} value={task.title}>
                        {task.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button variant="contained" color="success" onClick={handleAssignTask} backgroundColor="#02A715">
              Assign Task
            </Button>
          </Box>
        );
      case 3: // Assigned Tasks
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Assistant</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignedTasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.assistant}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.task.description}</TableCell>
                    <TableCell>{task.phone}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <FormControl variant="outlined" size="small">
                        <Select
                          value={task.progress}
                          onChange={() => handleToggleTaskStatus(task)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleToggleTaskStatus(task)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f4' }}>
      <AppBar position="static" sx={{ backgroundColor: '#02A715' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        sx={{ mt: 2 }}
      >
        <Tab label="All Assistants" icon={<PeopleIcon />} 
             sx={{ '&.Mui-selected': { backgroundColor: '#02A715', color: 'white' } }} />
        <Tab label="Pending Tasks" icon={<TaskIcon />} 
             sx={{ '&.Mui-selected': { backgroundColor: '#02A715', color: 'white' } }} />
        <Tab label="Assign Task" icon={<AssignmentIcon />} 
             sx={{ '&.Mui-selected': { backgroundColor: '#02A715', color: 'white' } }} />
        <Tab label="Assigned Tasks" icon={<TaskIcon />} 
             sx={{ '&.Mui-selected': { backgroundColor: '#02A715', color: 'white' } }} />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {renderContent()}
      </Box>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onClose={handleCloseImageModal}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Assistant Dialog */}
      <Dialog open={addAssistantDialogOpen} onClose={() => setAddAssistantDialogOpen(false)}>
        <DialogTitle>Add Assistant</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newAssistant.name}
            onChange={(e) => setNewAssistant({ ...newAssistant, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={newAssistant.email}
            onChange={(e) => setNewAssistant({ ...newAssistant, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            fullWidth
            value={newAssistant.phone}
            onChange={(e) => setNewAssistant({ ...newAssistant, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddAssistantDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddAssistant} variant="contained" color="success">
            Add Assistant
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Assistant Dialog */}
      <Dialog open={editAssistantDialogOpen} onClose={() => setEditAssistantDialogOpen(false)}>
        <DialogTitle>Edit Assistant</DialogTitle>
        <DialogContent>
          {editAssistant && (
            <>
              <TextField
                label="Name"
                fullWidth
                value={editAssistant.name}
                onChange={(e) => setEditAssistant({ ...editAssistant, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                fullWidth
                value={editAssistant.email}
                onChange={(e) => setEditAssistant({ ...editAssistant, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                fullWidth
                value={editAssistant.phone}
                onChange={(e) => setEditAssistant({ ...editAssistant, phone: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditAssistantDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditAssistant} variant="contained" color="success">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;