import React, { useState } from "react";
import api from "../api";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setError(""); // Reset error state before making the API call
    try {
      const res = await api.post(
        "/tasks",
        { title },
        {
          headers: { "x-auth-token": token },
        }
      );
      addTask(res.data);
      setTitle("");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg); // Stocker l'erreur dans un etat pour l'afficher en dessous du formulaire.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input
        type="text"
        placeholder="Ajouter une tâche ..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p style={{ color: 'red', width: '100%', textAlign: 'center' }}>{error}</p>}
      <button type="submit" className="btn" style={{ marginTop: "10px" }}>
        Ajouter Tâche
      </button>
    </form>
  );
};

export default TaskForm;
