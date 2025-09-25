import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Today from "./pages/Today";
import NewTask from "./pages/NewTask";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";


function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  

  const toggleSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);
  return (
    <>
      <BrowserRouter>
        <Navbar onMenuClick={toggleSidebar} />
        <Routes>
          {/* Public route: Auth page */}
          <Route path="/" element={<Auth />} />

          {/* Dashboard layout */}
          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard mobileSidebarOpen={mobileSidebarOpen} toggleSidebar={toggleSidebar} /> </PrivateRoute>}>
            <Route index element={<NewTask />} /> {/* default: /dashboard */}
            <Route path="new-task" element={<NewTask />} />
            <Route path="today" element={<Today />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
