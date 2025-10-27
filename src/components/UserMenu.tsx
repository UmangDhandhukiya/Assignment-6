import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../appStore/authUserSlice";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import type { AppDispatch } from "../appStore/store";

interface Props {
  userName: string;
}

const UserMenu: React.FC<Props> = ({ userName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {userName} <ChevronDown size={16} />
      </button>

      {dropdownOpen && (
        <div className="absolute md:right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-700"
            onClick={() => {
              setShowProfileModal(true);
              setDropdownOpen(false);
            }}
          >
            Edit Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-700"
            onClick={() => {
              setShowPasswordModal(true);
              setDropdownOpen(false);
            }}
          >
            Change Password
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 text-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Popuop Form */}
      {showProfileModal && (
        <EditProfileModal onClose={() => setShowProfileModal(false)} />
      )}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
};

export default UserMenu;
