import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../appStore/authUserSlice";
import type { AppDispatch } from "../appStore/store";

/**
 * Renders the Register component, handling new user registration.
 * Parameters: None.
 * The component manages input states for registration fields, validates input (required fields and password match), dispatches the Redux 'register' action on success, and navigates the user to the login page.
 */
const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    //save user with password
    const newUser = { name, email, password };
    dispatch(register(newUser));
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-between bg-zinc-900 p-8 w-1/2 rounded-tl-xl rounded-bl-xl">
        <h1 className="text-2xl font-semibold">E-commerce ./</h1>
        <p>“Join us and start your journey today!”</p>
      </div>

      {/* Right Side */}
      <div className="h-screen flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">Register</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-sm"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 bg-zinc-800 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-zinc-800 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-zinc-800 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 bg-zinc-800 rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-gray-500 py-3 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-400 pl-2hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
