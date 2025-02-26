import React from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-3 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Icon} alt="Company Logo" className="h-10 w-9 mr-2" />
          <Link to="/" className="text-2xl font-bold text-black">
            Enershas
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
