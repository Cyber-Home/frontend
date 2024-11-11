import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, FormControl, InputLabel, IconButton, Badge, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { green } from '@mui/material/colors';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';

const tasks = [
  'School Drop-Off',
  'Carwash',
  'Shopping',
  'Medics',
  'Laundry',
];

const AdminDashboard = () => {
  const [assistants, setAssistants] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', location: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', location: 'Los Angeles' },
  ]);
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([
    { task: 'School Drop-Off', user: 'Alice Johnson', dueDate: '2024-12-10', attachment: 'file.jpg', details: 'Task details here...' },
    { task: 'Shopping', user: 'Bob Williams', dueDate: '2024-11-20', attachment: '', details: 'Task details here...' },
  ]);
  const [selectedPendingTask, setSelectedPendingTask] = useState(null);
  const [pendingTaskModalOpen, setPendingTaskModalOpen] = useState(false);
  const [progress, setProgress] = useState('Pending');
  const [editingAssistant, setEditingAssistant] = useState(null);
  const [assistantProfileModalOpen, setAssistantProfileModalOpen] = useState(false);
  const [addAssistantModalOpen, setAddAssistantModalOpen] = useState(false);
  const [newAssistant, setNewAssistant] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleAssignTask = () => {
    if (selectedAssistant && selectedTask) {
      const pendingTask = pendingTasks.find(task => task.task === selectedTask);

      if (pendingTask) {
        const assignedTask = {
          assistant: selectedAssistant,
          task: selectedTask,
          progress: 'Pending',
          fee: 50,
          paymentStatus: 'Pending',
          dueDate: pendingTask.dueDate
        };

        setAssignedTasks(prevTasks => [...prevTasks, assignedTask]);

        setNotifications(prevNotifications => [
          ...prevNotifications,
          `New task assigned: ${selectedTask} to ${selectedAssistant}`
        ]);

        setPendingTasks(prevTasks => prevTasks.filter(task => task.task !== selectedTask));

        setSelectedAssistant('');
        setSelectedTask('');

        Swal.fire('Success', `Task "${selectedTask}" assigned to ${selectedAssistant}`, 'success');
      } else {
        Swal.fire('Error', 'Selected task is not in the pending list', 'error');
      }
    } else {
      Swal.fire('Error', 'Please select both an Assistant and a Task', 'error');
    }
  };

  const openPendingTaskModal = (task) => {
    setSelectedPendingTask(task);
    setPendingTaskModalOpen(true);
  };

  const closePendingTaskModal = () => {
    setPendingTaskModalOpen(false);
    setSelectedPendingTask(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
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
        window.location.href = '/admin/login';
      }
    });
  };

  const handleEdit = (assistant) => {
    setEditingAssistant(assistant);
    setAssistantProfileModalOpen(true);
  };

  const handleDelete = (assistant) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${assistant.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setAssistants((prevAssistants) => prevAssistants.filter((a) => a.id !== assistant.id));
        Swal.fire('Deleted!', `${assistant.name} has been deleted.`, 'success');
      }
    });
  };

  const handleSaveAssistantProfile = () => {
    setAssistantProfileModalOpen(false);
    Swal.fire('Success', `Assistant details updated`, 'success');
  };

  const handleAddAssistant = () => {
    if (newAssistant.name && newAssistant.email && newAssistant.phone && newAssistant.location) {
      setAssistants(prevAssistants => [
        ...prevAssistants,
        { ...newAssistant, id: assistants.length + 1 }
      ]);
      setAddAssistantModalOpen(false);
      setNewAssistant({
        name: '',
        email: '',
        phone: '',
        location: ''
      });
      Swal.fire('Success', 'New assistant added', 'success');
    } else {
      Swal.fire('Error', 'Please fill out all fields', 'error');
    }
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const handleTaskCompletion = () => {
    if (selectedPendingTask) {
      setPendingTasks(prevTasks => prevTasks.filter(task => task.task !== selectedPendingTask.task));
      Swal.fire('Task Completed!', `Task "${selectedPendingTask.task}" has been marked as completed.`, 'success');
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', color: green[900], overflowY: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#02A715', mb: 2 }}>Admin Dashboard</Typography>

      {/* Logout Button */}
      <IconButton onClick={handleLogout} sx={{ color: green[700], float: 'right' }}>
        <LogoutIcon />
      </IconButton>

      {/* Notifications */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton color="inherit">
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Button onClick={clearNotifications} sx={{ ml: 2, color: green[700] }}>
          Clear Notifications
        </Button>
      </Box>

      {/* Task Assignment Section */}
      <Typography variant="h5" sx={{ color: '#02A715', mb: 2 }}>Assign Task</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Assign Assistant</InputLabel>
          <Select
            value={selectedAssistant}
            onChange={(e) => setSelectedAssistant(e.target.value)}
            label="Assign Assistant"
          >
            {assistants.map((assistant) => (
              <MenuItem key={assistant.id} value={assistant.name}>
                {assistant.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Task</InputLabel>
          <Select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            label="Task"
          >
            {tasks.map((task, idx) => (
              <MenuItem key={idx} value={task}>
                {task}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleAssignTask}>
          Assign Task
        </Button>
      </Box>

      {/* All Assistants Section */}
      <Typography variant="h5" sx={{ color: '#02A715', mb: 2 }}>All Assistants</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assistants">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistants.map((assistant) => (
              <TableRow key={assistant.id}>
                <TableCell>{assistant.name}</TableCell>
                <TableCell>{assistant.email}</TableCell>
                <TableCell>{assistant.phone}</TableCell>
                <TableCell>{assistant.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(assistant)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(assistant)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pending Tasks Section */}
      <Typography variant="h5" sx={{ color: '#02A715', mb: 2 }}>Pending Tasks</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pending-tasks">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Attachment</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTasks.map((task, idx) => (
              <TableRow key={idx}>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.user}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.attachment}</TableCell>
                <TableCell>{task.details}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => openPendingTaskModal(task)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assigned Tasks Section */}
      <Typography variant="h5" sx={{ color: '#02A715', mb: 2 }}>Assigned Tasks</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assigned-tasks">
          <TableHead>
            <TableRow>
              <TableCell>Assistant</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedTasks.map((task, idx) => (
              <TableRow key={idx}>
                <TableCell>{task.assistant}</TableCell>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.progress}</TableCell>
                <TableCell>{task.fee}</TableCell>
                <TableCell>{task.paymentStatus}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pending Task Modal */}
      <Dialog open={pendingTaskModalOpen} onClose={closePendingTaskModal}>
        <DialogTitle>{selectedPendingTask?.task}</DialogTitle>
        <DialogContent>
          <TextField
            label="Progress"
            select
            fullWidth
            value={progress}
            onChange={handleProgressChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleTaskCompletion}>
              Complete Task
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
