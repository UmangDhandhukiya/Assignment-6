import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../appStore/authUserSlice";
import type { AppDispatch } from "../appStore/store";

interface Props {
  onClose: () => void;
}

/**
 * Renders a modal window for users to change their account password.
 * Parameters: { onClose } (Function to be called when the modal should close).
 * The component handles input state for old and new passwords, dispatches a Redux action to process the change, and uses AppDispatch type for correct Redux typing.
 */
const ChangePasswordModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    dispatch(changePassword({ oldPassword, newPassword }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 rounded bg-zinc-800"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 rounded bg-zinc-800"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded bg-zinc-800"
            required
          />
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
