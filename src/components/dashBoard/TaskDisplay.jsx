// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const TaskDisplay = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/task/tasks`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
//       setTasks(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to fetch tasks',
//         icon: 'error'
//       });
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (taskId) => {
//     console.log('Edit task:', taskId);
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       });

//       if (result.isConfirmed) {
//         const token = localStorage.getItem('token');
//         await axios.delete(
//           `${import.meta.env.VITE_BASE_URL}/api/task/tasks/${taskId}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );

//         await fetchTasks();

//         Swal.fire(
//           'Deleted!',
//           'Your task has been deleted.',
//           'success'
//         );
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to delete task',
//         icon: 'error'
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
//       {tasks.length === 0 ? (
//         <div className="text-center text-gray-500">
//           No tasks found. Create a new task to get started!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tasks.map((task) => (
//             <div 
//               key={task._id} 
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               {task.upload && (
//                 <div className="h-48 overflow-hidden">
//                   <img 
//                     src={task.upload} 
//                     alt="Task" 
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       console.error('Image load error:', e);
//                       e.target.style.display = 'none';
//                     }}
//                   />
//                 </div>
//               )}
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
//                   <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                     task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     task.status === 'completed' ? 'bg-green-100 text-green-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {task.status}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
//                 <div className="text-sm text-gray-500 space-y-1">
//                   <p>
//                     <span className="font-medium">Due:</span>{' '}
//                     {new Date(task.scheduledDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <span className="font-medium">Contact:</span>{' '}
//                     {task.contactPerson}
//                   </p>
//                   <p>
//                     <span className="font-medium">Location:</span>{' '}
//                     {task.location}
//                   </p>
//                 </div>
                
//                 <div className="mt-4 flex justify-end space-x-2">
//                   <button
//                     onClick={() => handleEdit(task._id)}
//                     className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
//                   >
//                     <FaEdit className="mr-1" /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(task._id)}
//                     className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
//                   >
//                     <FaTrash className="mr-1" /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskDisplay; 