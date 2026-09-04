import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchTasks = async () => {
      const res = await api.get("/tasks", {
        headers: { "x-auth-token": token },
      });
      setTasks(res.data);
    };
    fetchTasks();
  }, [navigate]);

  const addTask = (task) => {
    // Mettre a jour la liste des taches locale pour afficher la nouvelle tache suite au success de la requette (dans TaskForm)
    setTasks([task, ...tasks]);
  };

  // Entrez en mode "Edit" pour la tache selectionnée
  const handleEditTask = (task) => {
    setEditMode(true);
    setEditingTask(task);
  }

  // Soumettre les modifications de la tache via l'API
  const handleEditSubmit = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/tasks/${task._id}`,
        {
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      const existingTaskIndex = tasks.findIndex((t) => t._id === task._id);
      if (existingTaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[existingTaskIndex] = { ...updatedTasks[existingTaskIndex], ...task };
        setTasks(updatedTasks);
      }
      setEditMode(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg); // Stocker l'erreur dans un etat pour l'afficher en dessous du formulaire.
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/tasks/${id}`, { headers: { "x-auth-token": token } });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg);
    }
  };

  return (
    <div className="container">
      <h1>Mes Tâches</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {editMode ? (
        <div className="form-group">
          <input
            type="text"
            placeholder={'Modifier le text de la tâche'}
            value={editingTask ? editingTask.title : ''}
            onChange={(e) => editingTask && setEditingTask({ ...editingTask, title: e.target.value })}
          />
          <button className="btn" style={{ marginTop: "10px" }} onClick={() => handleEditSubmit(editingTask)}>
            Modifier la tâche
          </button>
          <button className="btn" style={{ marginTop: "10px" }} onClick={() => setEditMode(false) }>
            Annuller
          </button>
        </div>
      ) : <TaskForm addTask={addTask} />}
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`task-item ${task.isCompleted ? "completed" : ""}`}
          >
            <span>{task.title}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEditTask(task)} style={{ backgroundColor: '#8eab35' }}>Modifier</button>
              <button onClick={() => deleteTask(task._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
