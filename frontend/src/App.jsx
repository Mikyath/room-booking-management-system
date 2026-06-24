import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      
       <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  
  
  <Route
    path="/admin-login"
    element={<AdminLogin />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

 <Route
  path="/rooms"
  element={
    <ProtectedRoute>
      <Rooms />
    </ProtectedRoute>
  }
/>

  <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <Bookings />
    </ProtectedRoute>
  }
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;