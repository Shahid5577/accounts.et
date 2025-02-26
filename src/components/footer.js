import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-black flex justify-center items-center py-3 bg-zinc-100 shadow-lg">
      <div className="text-center">
        <p className="text-sm">© {new Date().getFullYear()} Enershas Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
