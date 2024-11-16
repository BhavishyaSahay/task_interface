import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={setIsAuthenticated} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Dashboard Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Task Form Route */}
          <Route
            path="/task-form"
            element={
              isAuthenticated ? <TaskForm /> : <Navigate to="/login" replace />
            }
          />

          {/* Task List Route */}
          <Route
            path="/task-list"
            element={
              isAuthenticated ? <TaskList /> : <Navigate to="/login" replace />
            }
          />

          {/* Default Route (Redirect to login) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
