import React, { useEffect, useState } from 'react';

const AdminTaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/tasks'); // Replace with actual API endpoint
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskStatus = async (taskId, newStatus) => {
        try {
            // Send updated status to the server
            await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            // Update local state
            setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleAssignTask = async (taskId, assignee) => {
        try {
            // Send assignment data to the server
            await fetch(`/api/tasks/${taskId}/assign`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignee })
            });
            // Update local state
            setTasks(tasks.map(task => (task.id === taskId ? { ...task, assignee } : task)));
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    const toggleTaskAcceptance = (taskId, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Accepted' : 'Pending';
        handleTaskStatus(taskId, newStatus);
    };

    return (
        <div>
            <h2>Admin Task Manager</h2>
            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <table className="w-full text-left mt-4">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Description</th>
                            <th>Assignee</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id} className="border-t">
                                <td>{task.id}</td>
                                <td>{task.description}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={task.assignee || ''}
                                        onChange={e => handleAssignTask(task.id, e.target.value)}
                                        placeholder="Assign to user"
                                        className="border p-1"
                                    />
                                </td>
                                <td>{task.status}</td>
                                <td>
                                    <button
                                        onClick={() => toggleTaskAcceptance(task.id, task.status)}
                                        className={`px-4 py-1 rounded ${task.status === 'Accepted' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                                    >
                                        {task.status === 'Accepted' ? 'Accepted' : 'Accept'}
                                    </button>
                                    <select
                                        value={task.status}
                                        onChange={e => handleTaskStatus(task.id, e.target.value)}
                                        className="ml-2 border p-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminTaskManager;
