import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../appStore/authUserSlice";
import type { AppDispatch } from "../appStore/store";

/**
 * Renders the Login component, handling user authentication via local storage persistence.
 * Parameters: None.
 * The component manages form input states, validates credentials against users stored in local storage, dispatches the Redux login action on success, and redirects to the home page.
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      setError("No registered user found. Please register first.");
      return;
    }

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );
    // console.log(foundUser);

    if (foundUser) {
      // console.log("before")
      dispatch(login({ email: foundUser.email, password: foundUser.password }));
      localStorage.setItem(
        "user",
        JSON.stringify({ name: foundUser.name, email: foundUser.email })
      );
      setError("");
      navigate("/home");
      // console.log("after")
    } else {
      setError("Invalid credentials. Please check your email or password.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left side */}
      <div className="hidden md:flex flex-col justify-between bg-zinc-900 p-8 w-1/2 rounded-tl-xl rounded-bl-xl">
        <h1 className="text-2xl font-semibold">E-commerce./</h1>
        <p>“Welcome back! Continue your shopping.”</p>
      </div>

      {/* Right side */}
      <div className="h-screen flex flex-col justify-center items-center w-full md:w-1/2 p-8">
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
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-zinc-800 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-gray-500 py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-400">
          Dont have an account?
          <Link to="/register" className="text-gray-400 pl-2 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
