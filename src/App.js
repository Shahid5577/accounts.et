import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Header from './components/header';
import Footer from './components/footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const handleDevTools = (e) => {
    if (
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || 
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  };

  // Disable right-click
  const disableRightClick = (e) => e.preventDefault();

  document.addEventListener("keydown", handleDevTools);
  document.addEventListener("contextmenu", disableRightClick);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
