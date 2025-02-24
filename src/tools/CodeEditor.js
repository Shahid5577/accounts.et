import React, { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-6">
      <h3 className="text-xl font-semibold">Code Editor</h3>
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="w-full h-40 p-2 border rounded-md mt-2"
      ></textarea>
    </div>
  );
};

export default CodeEditor;