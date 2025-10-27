import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../appStore/store";
import Filters from "./Filters";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-900 text-white px-4 py-3 md:px-6 md:py-4 shadow-md relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">E-Commerce</h1>
        
       {/* Mobile View Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:block">{user && <UserMenu userName={user.name} />}</div>
      </div>

      <div
        className={`transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <Filters />
        <div className="block md:hidden mt-3">{user && <UserMenu userName={user.name} />}</div>
      </div>
    </header>
  );
};

export default Header;
