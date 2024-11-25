import { apiClient } from "./config";

// Get all tasks
export const apiGetAllTasks = async () => {
  return apiClient.get(`/api/admin/tasks`);
};

// Add a new worker/assistant
export const apiAddWorker = async (workerData) => {
  const formData = new FormData();

  // Append worker information
  formData.append('firstName', workerData.firstName);
  formData.append('lastName', workerData.lastName);
  formData.append('email', workerData.email);
  formData.append('phone', workerData.phone);

  // Append services if they exist
  if (workerData.services) {
    workerData.services.forEach((service, index) => {
      formData.append(`services[${index}]`, service);
    });
  }

  // Append availability if it exists
  if (workerData.availability) {
    workerData.availability.forEach((availability, index) => {
      formData.append(`availability[${index}][day]`, availability.day);
      formData.append(`availability[${index}][startTime]`, availability.startTime);
      formData.append(`availability[${index}][endTime]`, availability.endTime);
    });
  }

  // Append document if it exists
  if (workerData.document) {
    formData.append('document', workerData.document);
  }

  // Send POST request
  const response = await apiClient.post('/api/admin/workers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Ensure to handle errors
  if (!response.ok) {
    throw new Error('Failed to add worker');
  }

  return response.data;
};