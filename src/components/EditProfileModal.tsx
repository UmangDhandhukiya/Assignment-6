import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../appStore/authUserSlice";
import type { RootState, AppDispatch } from "../appStore/store";

interface Props {
  onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({ onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    if (name && email) {
      dispatch(editProfile({ name, email }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-zinc-800"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-zinc-800"
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
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
