import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("taskList");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.title === updatedTask.title ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskTitle) => {
    setTasks(tasks.filter((task) => task.title !== taskTitle));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter) {
      return task.priority === filter || task.status === filter;
    }
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "Priority") {
      const priorities = { High: 3, Medium: 2, Low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    } else if (sort === "Date") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const trendData = tasks.reduce((acc, task) => {
    const date = task.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trendChartData = Object.entries(trendData).map(([date, count]) => ({
    date,
    tasksWorked: count,
  }));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="button-container">
        <button onClick={() => setCurrentView("taskList")}>
          View Task List
        </button>
        <button onClick={() => setCurrentView("taskForm")}>Add Task</button>
      </div>

      <div className="chart-container">
        <h3>Task Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tasksWorked" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="task-list-container">
        {currentView === "taskForm" && <TaskForm addTask={addTask} />}
        {currentView === "taskList" && (
          <>
            <div className="filter-sort-container">
              <label>Filter By:</label>
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <label>Sort By:</label>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="">None</option>
                <option value="Priority">Priority</option>
                <option value="Date">Date</option>
              </select>
            </div>

            <TaskList
              tasks={sortedTasks}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
