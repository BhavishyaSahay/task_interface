import React, { useState } from "react";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEdit = (task) => {
    setIsEditing(task.title);
    setEditedTask(task);
  };

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(null);
  };

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {isEditing === task.title ? (
              <div>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  placeholder="Task Title"
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Task Description"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.title)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
