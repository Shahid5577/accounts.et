import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    profilePic: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    hobbies: "",
  });

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section !== undefined && index !== undefined) {
      setFormData((prevData) => {
        const updatedSection = [...prevData[section]];
        updatedSection[index][name] = value;
        return { ...prevData, [section]: updatedSection };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (section, newField) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newField],
    }));
  };

  const removeField = (section, index) => {
    setFormData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection.splice(index, 1);
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = async () => {
    const resume = document.getElementById("resume-preview");
    if (!resume) return;

    const canvas = await html2canvas(resume, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center mb-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">📝 Resume Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-8xl">
        {/* Left: Form Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Fill Your Details</h2>

          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 w-full file:border file:rounded-lg file:bg-blue-600 file:text-white file:py-2 file:px-4" />

          <div className="space-y-4">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
            <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief Summary" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            {["education", "experience", "projects", "certifications", "languages", "awards"].map((section) => (
              <div key={section} className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>

                {formData[section].map((item, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                    {Object.keys(item).map((key) => {
                      let placeholder = "";
                      switch (section) {
                        case "education":
                          placeholder = key === "name" ? "School/University Name" : key === "title" ? "Degree/Course" : "Year of Graduation";
                          break;
                        case "experience":
                          placeholder = key === "name" ? "Company Name" : key === "title" ? "Job Title" : "Years Worked";
                          break;
                        case "projects":
                          placeholder = key === "name" ? "Project Name" : key === "title" ? "Role" : "Completion Year";
                          break;
                        case "certifications":
                          placeholder = key === "name" ? "Certification Name" : key === "title" ? "Issuing Organization" : "Year Obtained";
                          break;
                        case "languages":
                          placeholder = key === "name" ? "Language Name" : key === "title" ? "Proficiency Level (e.g., Fluent, Intermediate)" : "Years of Experience";
                          break;
                        case "awards":
                          placeholder = key === "name" ? "Award Name" : key === "title" ? "Given By" : "Year Received";
                          break;
                        default:
                          placeholder = key;
                      }

                      return (
                        <input
                          key={key}
                          type="text"
                          name={key}
                          value={item[key]}
                          onChange={(e) => handleChange(e, section, index)}
                          placeholder={placeholder}
                          className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                      );
                    })}

                    {/* New Description Field */}
                    <textarea
                      name="desc"
                      value={item.desc || ""}
                      onChange={(e) => handleChange(e, section, index)}
                      placeholder="Description (Optional)"
                      className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />

                    <button 
                      onClick={() => removeField(section, index)} 
                      className="text-red-600 text-lg font-bold hover:text-red-800 mt-2"
                    >
                      ✖ Remove
                    </button>
                  </div>
                ))}

                <button 
                  onClick={() => addField(section, { name: "", title: "", year: "", desc: "" })} 
                  className="text-lg text-blue-600 hover:text-blue-800 mt-4"
                >
                  ➕ Add {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </div>
            ))}



            <h3 className="text-lg font-semibold text-gray-700 mt-4">Hobbies & Interests</h3>
            <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Hobbies" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Right: Resume Preview */}
        <div id="resume-preview" className="bg-white p-6 rounded-xl shadow-xl w-full">
          {formData.profilePic && <img src={formData.profilePic} alt="Profile" className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300" />}
          <h2 className="text-2xl font-bold text-center text-gray-800">{formData.fullName}</h2>
          <p className="text-center text-gray-600">{formData.email} | {formData.phone} | {formData.address}</p>
          <p className="text-center mt-2 text-gray-700">{formData.summary}</p>
          <hr className="my-4" />

          {["education", "experience", "projects", "certifications", "languages", "awards"].map((section) => (
            <div key={section} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              {formData[section].map((item, index) => (
                <p key={index} className="text-gray-600">{Object.values(item).join(" - ")}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-green-700">
        📥 Download PDF
      </button>
    </div>
  );
};

export default ResumeBuilder;
