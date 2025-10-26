import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../appStore/authUserSlice";
import type { AppDispatch } from "../appStore/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get registered user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("registeredUser") || "null");

    if (!savedUser) {
      setError("No registered user found. Please register first.");
      return;
    }

    if (email === savedUser.email && password) {
      dispatch(login(savedUser)); 
      navigate("/home");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-between bg-zinc-900 p-8 w-1/2 rounded-tl-xl rounded-bl-xl">
        <h1 className="text-2xl font-semibold">Umang./</h1>
        <p>“Welcome back! Continue your journey.”</p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-sm"
        >
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-zinc-800 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-zinc-800 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
