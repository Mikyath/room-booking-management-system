import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginAdmin = async () => {

    try {

      const res = await axios.post(
        "https://hotel-management-system-ebhf.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      if (res.data.user.role !== "admin") {

        alert("Admin Access Only");
        return;

      }

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/rooms");

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={loginAdmin}
          className="bg-red-600 text-white w-full p-3 rounded"
        >
          Login as Admin
        </button>

      </div>

    </div>

  );

}

export default AdminLogin;