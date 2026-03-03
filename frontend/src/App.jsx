import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit3, CheckCircle, Circle, X } from 'lucide-react';
import './App.css';

const API_BASE_URL = 'http://localhost:3000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${currentTask.id}`, {
          title: currentTask.title,
          description: currentTask.description,
          status: currentTask.status
        });
      } else {
        await axios.post(API_BASE_URL, currentTask);
      }
      setIsModalOpen(false);
      setCurrentTask({ title: '', description: '' });
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 1 ? 0 : 1;
      await axios.put(`${API_BASE_URL}/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <header className="header">
          <h1>Task Tracker</h1>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Add Task
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tasks found. Start by adding one!</div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task.id} className={`task-card ${task.status === 1 ? 'completed' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="task-title">{task.title}</h3>
                  <button className="icon-btn" onClick={() => handleToggleStatus(task)}>
                    {task.status === 1 ? <CheckCircle color="var(--success)" /> : <Circle />}
                  </button>
                </div>
                <p className="task-desc">{task.description}</p>
                <div className="task-actions">
                  <button className="icon-btn" onClick={() => openEditModal(task)}>
                    <Edit3 size={18} />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(task.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  placeholder="Task title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-input"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  placeholder="Task description"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
