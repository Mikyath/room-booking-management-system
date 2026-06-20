import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
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