import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(""); // User input for stdin

  // Piston API Language Versions
  const languageVersions = {
    javascript: "18.15.0",
    python: "3.10.0",
    java: "17.0.1",
    cpp: "10.2.0",
    c: "10.2.0",
    php: "8.2.3",
    ruby: "3.2.0",
  };

  const executeCode = async () => {
    setLoading(true);
    setOutput("Running...");

    const apiUrl = "https://emkc.org/api/v2/piston/execute"; // Piston API URL

    const requestData = {
      language: language,
      version: languageVersions[language] || "latest",
      files: [{ content: code }],
      stdin: userInput, // Pass user input to code execution
    };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      setOutput(response.data.run.output || "No output returned.");
    } catch (error) {
      console.error("Execution Error:", error.response?.data || error.message);
      setOutput("Error executing code. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl">
        {/* Language Selector & Run Button */}
        <div className="mb-4 flex justify-between items-center">
          <select
            className="p-2 border rounded bg-gray-100"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={executeCode}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>

        {/* Code Editor */}
        <Editor
          height="300px"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-light"
        />

        {/* User Input Section */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter input for the program..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Output Section */}
        <div className="mt-4 p-3 border bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Output:</h2>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
