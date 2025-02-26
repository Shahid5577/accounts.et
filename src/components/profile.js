import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import CodeEditor from '../tools/editor';
import ResumeBuilder from '../tools/resumebuilder';

function Dashboard({ userDetails, handleLogout }) {
  const [activeTab, setActiveTab] = useState("resume");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col bg-gray-200 shadow-md border-1 border-gray-300 h-screen pt-14">
      {/* Navbar */}
       <nav className="text-black p-4 flex justify-between items-center">
        <ul className="flex space-x-3 overflow-x-auto w-full justify-start md:justify-center">
          {['resume', 'editor', 'status', 'materials'].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer capitalize sm:px-4 sm:py-4 lg:px-4 lg:py-2 rounded-md ${activeTab === tab ? 'border-b-2 border-blue-900 text-green-700' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="relative">
          <img
            src={userDetails.photo}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="User Profile"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
              <p className="text-gray-700 font-semibold">{userDetails.firstName}</p>
              <p className="text-gray-500 text-sm">{userDetails.email}</p>
              <button
                className="mt-2 w-full bg-red-500 text-white py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-grow p-6">
        {activeTab === "resume" && <ResumeBuilder />}
        {activeTab === "editor" && <CodeEditor />}
        {activeTab === "status" && <p>Order Tracking</p>}
        {activeTab === "materials" && <p>Materials Section</p>}
      </div>
    </div>
  );
}

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <Dashboard userDetails={userDetails} handleLogout={handleLogout} />
      ) : (
        <p className="text-center p-6">Loading...</p>
      )}
    </div>
  );
}

export default Profile;
