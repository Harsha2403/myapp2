import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const token = localStorage.getItem('token'); // Get JWT token from local storage

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todo/list', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (error) {
            console.error("❌ Error fetching tasks:", error.response ? error.response.data : error.message);
        }
    };
    

    const addTask = async () => {
        if (!newTask) return;
        try {
            await axios.post('http://localhost:5000/api/todo/add', { task: newTask }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error("❌ Error adding task:", error.response ? error.response.data : error.message);
        }
    };
    const updateTask = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/todo/update/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.error("❌ Error updating task:", error.response ? error.response.data : error.message);
        }
    };
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.error("❌ Error deleting task:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <TextField 
                label="New Task" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
            />
            <Button onClick={addTask}>Add</Button>

            <List>
                {tasks.map(task => (
                    <ListItem key={task.id}>
                        <ListItemText primary={task.task} secondary={task.status} />
                        <IconButton onClick={() => updateTask(task.id, 'completed')}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteTask(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TodoList;
