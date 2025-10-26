import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../appStore/authUserSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "User"}!</h1>
      <button
        onClick={() => dispatch(logout())}
        className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
