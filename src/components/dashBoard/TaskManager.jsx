import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', dueDate: new Date(), file: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceInput, setServiceInput] = useState('');

  // Example services list
  const services = [
    'Laundry',
    'Grocery Shopping',
    'Dog Walking',
    'House Cleaning',
    'Tutoring'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFileChange = (e) => {
    setTask({ ...task, file: e.target.files[0] });
  };

  const handleDateChange = (date) => {
    setTask({ ...task, dueDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, index) => (index === editingIndex ? task : t));
      setTasks(updatedTasks);
      Swal.fire({
        title: 'Task Updated!',
        text: `You have successfully updated "${task.title}".`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      setTasks([...tasks, task]);
      Swal.fire({
        title: 'Task Added!',
        text: `You have successfully added "${task.title}" to your tasks.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    // Reset form
    setTask({ title: '', description: '', dueDate: new Date(), file: null });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    });

    if (result.isConfirmed) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
    }
  };

  const handleAddService = () => {
    if (serviceInput && !selectedServices.includes(serviceInput)) {
      setSelectedServices([...selectedServices, serviceInput]);
      setServiceInput('');
    }
  };

  const removeSelectedService = (service) => {
    setSelectedServices(selectedServices.filter(s => s !== service));
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
        {showForm ? 'Cancel' : 'Add Task'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <div>
            <label className="mt-4 block text-gray-600 font-medium">Select Services:</label>
            <div className="flex items-center mt-2">
              <select
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                className="p-2 w-full border rounded-md focus:outline-none"
              >
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddService}
                className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {selectedServices.map((service) => (
                <div key={service} className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1">
                  <span>{service}</span>
                  <button
                    onClick={() => removeSelectedService(service)}
                    className="text-red-500 ml-2"
                  >
                    &times; {/* Close icon */}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label>Task Title:</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
              required
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label>Due Date:</label>
            <DatePicker
              selected={task.dueDate}
              onChange={handleDateChange}
              className="border rounded p-2 w-full mb-4"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div>
            <label>Upload File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            {editingIndex !== null ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      )}

      <h2 className="mt-6 text-lg font-bold">Selected Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedServices.map((service) => {
          const taskItem = tasks.find(t => t.title === service);
          return (
            taskItem && (
              <div key={taskItem.title} className="bg-gray-200 p-4 rounded shadow">
                <strong>{taskItem.title}</strong>
                <p>{taskItem.description}</p>
                <p>Due: {taskItem.dueDate.toLocaleDateString()}</p>
                {taskItem.file && (
                  <div>
                    <img src={URL.createObjectURL(taskItem.file)} alt="Task File" className="mt-2" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
                  </div>
                )}
                <button onClick={() => removeSelectedTask(taskItem.title)} className="text-red-500 mt-2">Remove</button>
                <button onClick={() => handleEdit(tasks.indexOf(taskItem))} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(tasks.indexOf(taskItem))} className="text-red-500">Delete</button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;
