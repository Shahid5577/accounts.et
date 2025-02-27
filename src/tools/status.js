import React, { useState, useEffect } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const steps = [
  { id: 1, title: "Planning", description: "Defining project goals and scope." },
  { id: 2, title: "Analysis", description: "Researching and feasibility study." },
  { id: 3, title: "Design", description: "Creating wireframes and system architecture." },
  { id: 4, title: "Implementation", description: "Developing and coding the system." },
  { id: 5, title: "Testing", description: "Bug fixes, quality assurance, and review." },
  { id: 6, title: "Maintenance", description: "Ongoing updates and support." },
];

const Status = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailToUpdate, setEmailToUpdate] = useState("");

  useEffect(() => {
    const fetchUserData = () => {
      auth.onAuthStateChanged(async (loggedUser) => {
        if (loggedUser) {
          setUser(loggedUser);
          setIsAdmin(loggedUser.email === "enershas@gmail.com"); // Check admin role

          const userDocRef = doc(db, "Orders", loggedUser.email);

          // Real-time listener for user status
          const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              setCurrentStep(docSnap.data().status);
            }
          });

          return () => unsubscribe(); // Cleanup on unmount
        }
      });
    };

    fetchUserData();
  }, []);

  // Admin updates status for a specific user
  const updateStatusForUser = async () => {
    if (!isAdmin || !emailToUpdate.trim()) return;

    const userDocRef = doc(db, "Orders", emailToUpdate.trim());
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const nextStep = docSnap.data().status < steps.length ? docSnap.data().status + 1 : steps.length;
      await updateDoc(userDocRef, { status: nextStep });
      alert(`Status updated for ${emailToUpdate}`);
    } else {
      alert("No order found for this email.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Project Status</h2>

      {/* Progress Line with Step Names */}
      <div className="relative flex flex-col items-center mb-6">
        <div className="flex items-center w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                    index + 1 <= currentStep ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    index + 1 <= currentStep ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Line Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`h-2 flex-1 mx-2 ${
                    index + 1 < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Status Details */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{steps[currentStep - 1].title}</h3>
        <p className="text-gray-500">{steps[currentStep - 1].description}</p>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="mt-6 text-center">
          <input
            type="email"
            placeholder="Enter user email"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
            className="border p-2 rounded-md mr-2"
          />
          <button
            onClick={updateStatusForUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Status
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;
