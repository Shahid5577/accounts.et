import React from "react";

const ProjectTracker = () => {
  const steps = [
    "Project Assigned",
    "In Progress",
    "Code Review",
    "Testing",
    "Completed",
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-6">
      <h3 className="text-xl font-semibold">Project Tracker</h3>
      <ul className="mt-2">
        {steps.map((step, index) => (
          <li key={index} className="mb-2">
            <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTracker;
